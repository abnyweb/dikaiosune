import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { saveInquiry, getAllInquiries, updateInquiry, deleteInquiry, getInquiryById } from './server/storage.js';
import { dispatchInquiryEmails } from './server/emailService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, 'dist');
const OUTBOX_DIR = path.join(__dirname, 'data', 'outbox');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'dikaiosune2026';

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Logging middleware
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    console.log(`[API ${req.method}] ${req.path} - ${new Date().toISOString()}`);
  }
  next();
});

// ========================================================
// PUBLIC API ROUTES
// ========================================================

/**
 * Health Check Endpoint
 */
app.get('/api/health', (req, res) => {
  const inquiries = getAllInquiries();
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    inquiriesCount: inquiries.length,
    environment: process.env.NODE_ENV || 'production'
  });
});

/**
 * Public Inquiries Submission Endpoint
 * Receives expression of interest from website forms
 */
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, email, org, phone, category, track, role, message, note, source } = req.body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Full Name is required.'
      });
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'A valid email address is required.'
      });
    }

    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';

    // 1. Save entry to persistent JSON database
    const savedInquiry = saveInquiry({
      name,
      email,
      org,
      phone,
      category: category || track || role,
      message: message || note,
      source: source || 'Website Form',
      ip: clientIp
    });

    console.log(`[Inquiry] Saved new expression of interest: ${savedInquiry.id} (${savedInquiry.email})`);

    // 2. Dispatch emails (Admin Notification + Partner Acknowledgement)
    const emailResult = await dispatchInquiryEmails(savedInquiry);

    // 3. Update entry with email dispatch status
    updateInquiry(savedInquiry.id, {
      emailDispatched: true,
      smtpSent: emailResult.smtpSent,
      outboxSaved: emailResult.outboxSaved
    });

    // 4. Return secure response (Never exposes admin recipient emails)
    return res.status(201).json({
      success: true,
      message: 'Your expression of interest has been securely submitted. An acknowledgement has been sent to your email.',
      inquiryId: savedInquiry.id,
      submittedAt: savedInquiry.submittedAt
    });

  } catch (err) {
    console.error('[API Error /api/inquiries]:', err);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your request. Please try again later.'
    });
  }
});

// ========================================================
// ADMIN API ROUTES
// ========================================================

/**
 * Admin Authentication
 */
app.post('/api/admin/auth/login', (req, res) => {
  const { password } = req.body;
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({
      success: false,
      error: 'Invalid administrator credentials. Access denied.'
    });
  }

  return res.json({
    success: true,
    token: `dikaiosune-auth-${Date.now()}`,
    user: {
      email: 'admin@dikaiosune.in',
      name: 'Dikaiosune Executive Admin',
      role: 'SuperAdmin'
    }
  });
});

/**
 * Get All Inquiries (Admin)
 */
app.get('/api/admin/inquiries', (req, res) => {
  const inquiries = getAllInquiries();
  // Sort descending by submission date
  inquiries.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  res.json({
    success: true,
    total: inquiries.length,
    inquiries
  });
});

/**
 * Update Inquiry Status / Internal Notes (Admin)
 */
app.patch('/api/admin/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const { status, internalNotes } = req.body;

  const updates = {};
  if (status) updates.status = status;
  if (internalNotes !== undefined) updates.internalNotes = internalNotes;
  updates.lastReviewedAt = new Date().toISOString();

  const updated = updateInquiry(id, updates);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Inquiry not found.' });
  }

  res.json({ success: true, inquiry: updated });
});

/**
 * Delete Inquiry (Admin)
 */
app.delete('/api/admin/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const deleted = deleteInquiry(id);
  if (!deleted) {
    return res.status(404).json({ success: false, error: 'Inquiry not found or already deleted.' });
  }
  res.json({ success: true, message: 'Inquiry deleted successfully.' });
});

/**
 * Get Outbox Email Logs (Admin)
 */
app.get('/api/admin/outbox', (req, res) => {
  try {
    if (!fs.existsSync(OUTBOX_DIR)) {
      return res.json({ success: true, files: [] });
    }

    const files = fs.readdirSync(OUTBOX_DIR);
    const metaFiles = files.filter(f => f.endsWith('_meta.json'));
    
    const logs = metaFiles.map(metaFile => {
      try {
        const content = JSON.parse(fs.readFileSync(path.join(OUTBOX_DIR, metaFile), 'utf-8'));
        const baseId = content.id;
        return {
          ...content,
          adminHtmlFile: `${baseId}_admin_notification.html`,
          partnerHtmlFile: `${baseId}_partner_acknowledgement.html`,
          created: fs.statSync(path.join(OUTBOX_DIR, metaFile)).mtime
        };
      } catch {
        return null;
      }
    }).filter(Boolean);

    logs.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

    res.json({
      success: true,
      total: logs.length,
      outbox: logs
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * Preview Outbox Rendered HTML Email (Admin)
 */
app.get('/api/admin/outbox/preview/:filename', (req, res) => {
  const { filename } = req.params;
  // Security check: prevent directory traversal
  const safeFilename = path.basename(filename);
  const filePath = path.join(OUTBOX_DIR, safeFilename);

  if (!fs.existsSync(filePath) || !safeFilename.endsWith('.html')) {
    return res.status(404).send('Email preview not found.');
  }

  const html = fs.readFileSync(filePath, 'utf-8');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

/**
 * Comprehensive Admin Stats
 */
app.get('/api/admin/stats', (req, res) => {
  const inquiries = getAllInquiries();
  
  const statusCounts = {
    received: 0,
    in_review: 0,
    responded: 0,
    archived: 0
  };

  const categoryCounts = {};

  inquiries.forEach(inq => {
    const s = inq.status || 'received';
    statusCounts[s] = (statusCounts[s] || 0) + 1;
    const cat = inq.category || 'General';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  res.json({
    success: true,
    total: inquiries.length,
    statusCounts,
    categoryCounts,
    lastSubmission: inquiries.length > 0 ? inquiries[inquiries.length - 1].submittedAt : null,
    server: {
      uptime: process.uptime(),
      port: PORT,
      nodeVersion: process.version
    }
  });
});

// Legacy safe stats endpoint
app.get('/api/inquiries/stats', (req, res) => {
  const inquiries = getAllInquiries();
  const byCategory = inquiries.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  res.json({
    total: inquiries.length,
    byCategory,
    lastSubmission: inquiries.length > 0 ? inquiries[inquiries.length - 1].submittedAt : null
  });
});

// ========================================================
// STATIC FILES & SPA FALLBACK
// ========================================================

// Serve static assets from Vite build directory
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));

  // SPA fallback for non-API routes
  app.use((req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'Endpoint not found' });
    }
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
} else {
  app.use((req, res) => {
    res.status(503).send('Application bundle is compiling. Please run `npm run build`.');
  });
}

// Start Server locally (skip in serverless Vercel environment)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n================================================================`);
    console.log(`  Dikaiosune Mega Project Full-Stack Server Running`);
    console.log(`  Port: ${PORT}`);
    console.log(`  URL: http://localhost:${PORT}`);
    console.log(`  Public API: http://localhost:${PORT}/api/inquiries`);
    console.log(`  Admin API: http://localhost:${PORT}/api/admin/inquiries`);
    console.log(`  Admin Recipient Config: Private (Server-Side Only)`);
    console.log(`================================================================\n`);
  });
}

export default app;

