import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// On Vercel / serverless runtimes, use the writable /tmp directory
const isVercel = Boolean(process.env.VERCEL || process.env.NOW_REGION || process.env.AWS_LAMBDA_FUNCTION_NAME);
const BUNDLED_DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_DIR = isVercel ? path.join(os.tmpdir(), 'dikaiosune-data') : BUNDLED_DATA_DIR;
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

// Ensure data directory exists
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Ensure inquiries.json exists, seed with bundled data if available
  if (!fs.existsSync(INQUIRIES_FILE)) {
    const bundledFile = path.join(BUNDLED_DATA_DIR, 'inquiries.json');
    if (fs.existsSync(bundledFile)) {
      fs.copyFileSync(bundledFile, INQUIRIES_FILE);
    } else {
      fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  }
} catch (err) {
  console.warn('[Storage] Warning initializing data directory:', err.message);
}

// In-memory fallback if filesystem is completely restricted
let inMemoryInquiries = [];

/**
 * Get all inquiries
 * @returns {Array} List of inquiries
 */
export function getAllInquiries() {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('[Storage] Falling back to in-memory inquiry list:', err.message);
  }
  return inMemoryInquiries;
}

/**
 * Save a new inquiry
 * @param {Object} data - Form data
 * @returns {Object} Created inquiry with generated ID and timestamp
 */
export function saveInquiry(data) {
  const inquiries = getAllInquiries();
  
  const timestamp = new Date();
  const dateStr = timestamp.toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  const id = `DIK-${dateStr}-${randomSuffix}`;

  const newEntry = {
    id,
    submittedAt: timestamp.toISOString(),
    name: data.name?.trim() || '',
    email: data.email?.trim() || '',
    org: data.org?.trim() || '',
    phone: data.phone?.trim() || '',
    category: data.category?.trim() || data.track?.trim() || data.role?.trim() || 'General Partnership',
    message: data.message?.trim() || data.note?.trim() || '',
    source: data.source || 'Website Form',
    ip: data.ip || 'Unknown',
    status: 'received',
    emailDispatched: false
  };

  inquiries.push(newEntry);
  inMemoryInquiries = inquiries;

  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[Storage] Could not write to disk, saved in-memory:', err.message);
  }

  return newEntry;
}

  inquiries.push(newEntry);
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');

  return newEntry;
}

/**
 * Update inquiry status
 * @param {string} id - Inquiry ID
 * @param {Object} updates - Fields to update
 */
export function updateInquiry(id, updates) {
  const inquiries = getAllInquiries();
  const index = inquiries.findIndex(item => item.id === id);
  if (index !== -1) {
    inquiries[index] = { ...inquiries[index], ...updates };
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
    return inquiries[index];
  }
  return null;
}

/**
 * Delete an inquiry
 * @param {string} id - Inquiry ID
 * @returns {boolean} True if deleted, false otherwise
 */
export function deleteInquiry(id) {
  const inquiries = getAllInquiries();
  const initialLength = inquiries.length;
  const filtered = inquiries.filter(item => item.id !== id);
  
  if (filtered.length !== initialLength) {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
    return true;
  }
  return false;
}

/**
 * Get inquiry by ID
 * @param {string} id - Inquiry ID
 * @returns {Object|null} Inquiry or null
 */
export function getInquiryById(id) {
  const inquiries = getAllInquiries();
  return inquiries.find(item => item.id === id) || null;
}

