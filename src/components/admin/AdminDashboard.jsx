import React, { useState, useEffect } from 'react';
import BrandSeal from '../BrandSeal';
import {
  LayoutDashboard,
  Inbox,
  Mail,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Trash2,
  ExternalLink,
  RefreshCw,
  Search,
  Filter,
  Download,
  LogOut,
  Shield,
  Eye,
  Settings,
  Layers,
  Activity,
  Building2,
  ChevronRight,
  X,
  Send,
  User,
  Sparkles,
  Phone,
  Calendar,
  Lock,
  ArrowUpRight
} from 'lucide-react';

export default function AdminDashboard({ onExit }) {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('dikaiosune_admin_token') !== null;
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Active view tab: 'overview' | 'inquiries' | 'outbox' | 'operations' | 'settings'
  const [activeTab, setActiveTab] = useState('overview');

  // Data states
  const [inquiries, setInquiries] = useState([]);
  const [outbox, setOutbox] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Selected Inquiry for Modal View & Notes
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [internalNoteText, setInternalNoteText] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Email Preview Modal
  const [previewHtmlUrl, setPreviewHtmlUrl] = useState(null);
  const [previewTitle, setPreviewTitle] = useState('');

  // Toast feedback message
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        sessionStorage.setItem('dikaiosune_admin_token', data.token);
        setIsAuthenticated(true);
        setPasswordInput('');
        fetchDashboardData();
      } else {
        setAuthError(data.error || 'Invalid administrator password.');
      }
    } catch {
      setAuthError('Unable to connect to authentication service.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('dikaiosune_admin_token');
    setIsAuthenticated(false);
  };

  // Fetch all dashboard data
  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [inqRes, outboxRes, statsRes] = await Promise.all([
        fetch('/api/admin/inquiries'),
        fetch('/api/admin/outbox'),
        fetch('/api/admin/stats')
      ]);

      if (inqRes.ok) {
        const inqData = await inqRes.json();
        setInquiries(inqData.inquiries || []);
      }

      if (outboxRes.ok) {
        const outboxData = await outboxRes.json();
        setOutbox(outboxData.outbox || []);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      setLastRefreshed(new Date());
    } catch (err) {
      console.error('Failed to load admin data:', err);
      showToast('Error syncing with backend.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  // Update inquiry status
  const handleUpdateStatus = async (id, newStatus) => {
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
        }
        showToast(`Status updated to "${newStatus.replace('_', ' ').toUpperCase()}".`);
      }
    } catch {
      showToast('Failed to update inquiry status.');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Save internal notes on an inquiry
  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${selectedInquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ internalNotes: internalNoteText })
      });

      if (res.ok) {
        setInquiries(prev => prev.map(inq => inq.id === selectedInquiry.id ? { ...inq, internalNotes: internalNoteText } : inq));
        setSelectedInquiry(prev => ({ ...prev, internalNotes: internalNoteText }));
        showToast('Internal notes saved.');
      }
    } catch {
      showToast('Failed to save notes.');
    }
  };

  // Delete inquiry
  const handleDeleteInquiry = async (id) => {
    if (!window.confirm(`Are you sure you want to permanently delete inquiry ${id}?`)) return;

    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries(prev => prev.filter(inq => inq.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
        showToast(`Inquiry ${id} deleted.`);
      }
    } catch {
      showToast('Error deleting inquiry.');
    }
  };

  // Export filtered inquiries to CSV
  const handleExportCSV = () => {
    if (filteredInquiries.length === 0) {
      showToast('No records to export.');
      return;
    }

    const headers = ['Inquiry ID', 'Date', 'Full Name', 'Email', 'Organization', 'Phone', 'Category', 'Status', 'Message'];
    const rows = filteredInquiries.map(inq => [
      `"${inq.id}"`,
      `"${new Date(inq.submittedAt).toISOString()}"`,
      `"${(inq.name || '').replace(/"/g, '""')}"`,
      `"${inq.email || ''}"`,
      `"${(inq.org || '').replace(/"/g, '""')}"`,
      `"${inq.phone || ''}"`,
      `"${(inq.category || '').replace(/"/g, '""')}"`,
      `"${inq.status || 'received'}"`,
      `"${(inq.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Dikaiosune_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported CSV successfully.');
  };

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch =
      (inq.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.org || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.message || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'ALL' || inq.category === categoryFilter;
    const matchesStatus = statusFilter === 'ALL' || (inq.status || 'received') === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Unique categories for filtering
  const allCategories = Array.from(new Set(inquiries.map(i => i.category).filter(Boolean)));

  // Status pill badge helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'in_review':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">● In Review</span>;
      case 'responded':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">✓ Responded</span>;
      case 'archived':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-300">Archive</span>;
      case 'received':
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300">★ New</span>;
    }
  };

  // ==========================================================
  // RENDER: LOGIN GATE IF NOT AUTHENTICATED
  // ==========================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-forest-dark via-[#193223] to-[#122219] flex items-center justify-center p-4">
        <div className="bg-[#FFFDF8] text-[#1F2420] w-full max-w-md rounded-3xl p-8 sm:p-10 border border-[#DCD4C3] shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-forest text-cream mb-4 shadow-lg border border-harvest-gold/40">
              <BrandSeal size={42} />
            </div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-harvest mb-1">
              Dikaiosune Private Limited
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest leading-tight">
              Executive Admin Portal
            </h2>
            <p className="text-xs text-[#5B6359] mt-2">
              Confidential administration console for campus partnerships, inquiry workflows, and email outbox audit.
            </p>
          </div>

          {authError && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2420] mb-1.5">
                Administrator Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Enter administrator passcode"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#DCD4C3] text-sm text-[#1F2420] focus:outline-none focus:ring-2 focus:ring-harvest font-medium"
                />
                <Lock size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full py-3 rounded-xl bg-forest hover:bg-forest-light text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Shield size={16} />
              <span>{isAuthenticating ? 'Verifying Credentials...' : 'Authenticate & Enter'}</span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#DCD4C3] text-center">
            <button
              onClick={onExit}
              className="text-xs text-[#5B6359] hover:text-[#1F2420] font-medium transition"
            >
              &larr; Return to Public Website
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ==========================================================
  // RENDER: FULL ADMIN DASHBOARD CONSOLE
  // ==========================================================
  return (
    <div className="min-h-screen bg-[#F6F1E7] text-[#1F2420] flex flex-col lg:flex-row font-sans">
      
      {/* Toast Feedback Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-forest text-cream px-4 py-2.5 rounded-xl shadow-2xl border border-harvest-gold/40 flex items-center gap-2.5 text-xs font-semibold animate-fadeIn">
          <Sparkles size={16} className="text-harvest-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* SIDEBAR NAVIGATION                                       */}
      {/* ======================================================== */}
      <aside className="w-full lg:w-72 bg-forest-dark text-cream border-r border-forest-light/30 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-forest-light/40 flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-forest flex items-center justify-center border border-harvest-gold/50 shadow">
              <BrandSeal size={32} />
            </div>
            <div>
              <h1 className="font-serif font-bold text-lg text-white leading-tight">
                DIKAIOSUNE
              </h1>
              <div className="text-[10px] uppercase tracking-widest text-harvest-gold font-semibold">
                Executive Portal
              </div>
            </div>
          </div>

          {/* Nav Item Links */}
          <nav className="p-4 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-harvest text-forest-dark shadow font-bold'
                  : 'text-sage hover:text-white hover:bg-forest/60'
              }`}
            >
              <LayoutDashboard size={17} />
              <span>Executive Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'inquiries'
                  ? 'bg-harvest text-forest-dark shadow font-bold'
                  : 'text-sage hover:text-white hover:bg-forest/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox size={17} />
                <span>Partner Inquiries</span>
              </div>
              <span className="bg-forest-light px-2 py-0.5 rounded-full text-[10px] text-white font-mono">
                {inquiries.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('outbox')}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'outbox'
                  ? 'bg-harvest text-forest-dark shadow font-bold'
                  : 'text-sage hover:text-white hover:bg-forest/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail size={17} />
                <span>Email Outbox &amp; Audit</span>
              </div>
              <span className="bg-forest-light px-2 py-0.5 rounded-full text-[10px] text-white font-mono">
                {outbox.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('operations')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'operations'
                  ? 'bg-harvest text-forest-dark shadow font-bold'
                  : 'text-sage hover:text-white hover:bg-forest/60'
              }`}
            >
              <Layers size={17} />
              <span>Campus Operations (112 Ac)</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'settings'
                  ? 'bg-harvest text-forest-dark shadow font-bold'
                  : 'text-sage hover:text-white hover:bg-forest/60'
              }`}
            >
              <Settings size={17} />
              <span>System &amp; SMTP Config</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-forest-light/40 space-y-2">
          <div className="flex items-center gap-2.5 px-3 py-2 bg-forest/40 rounded-xl border border-forest-light/30">
            <User size={15} className="text-harvest-gold" />
            <div className="truncate text-left">
              <div className="text-[11px] font-bold text-white truncate">admin@dikaiosune.in</div>
              <div className="text-[9px] text-sage">Super Administrator</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={onExit}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-forest/80 hover:bg-forest text-cream text-[11px] font-semibold transition border border-forest-light/50"
            >
              <ArrowUpRight size={13} />
              <span>Public Site</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-red-900/40 hover:bg-red-900/70 text-red-200 text-[11px] font-semibold transition border border-red-800/40"
            >
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* MAIN CONTENT AREA                                        */}
      {/* ======================================================== */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">
        
        {/* Top Operational Bar */}
        <header className="bg-[#FFFDF8] border-b border-[#DCD4C3] px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase font-bold tracking-wider text-harvest">
              Dashboard /
            </span>
            <span className="font-serif font-bold text-lg text-forest capitalize">
              {activeTab === 'overview' && 'Executive Summary & Key Indicators'}
              {activeTab === 'inquiries' && 'Partner Inquiries Management'}
              {activeTab === 'outbox' && 'Dispatched Email Audit & Previews'}
              {activeTab === 'operations' && '~112-Acre Masterplan & Closed-Loop'}
              {activeTab === 'settings' && 'System Configuration & SMTP Routing'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-semibold text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Express Server · Port 3000</span>
            </div>

            <button
              onClick={fetchDashboardData}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EDE6D6] hover:bg-[#DCD4C3] text-xs font-semibold text-[#1F2420] transition cursor-pointer"
              title="Refresh live data"
            >
              <RefreshCw size={13} className={isLoading ? 'animate-spin' : ''} />
              <span>Sync</span>
            </button>
          </div>
        </header>

        {/* Dynamic Body Content */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">

          {/* ==================================================== */}
          {/* TAB 1: EXECUTIVE OVERVIEW                            */}
          {/* ==================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* 4 Core KPI Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-[#FFFDF8] p-5 rounded-2xl border border-[#DCD4C3] shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase font-bold text-harvest tracking-wider">Total Inquiries</span>
                    <Inbox size={20} className="text-forest" />
                  </div>
                  <div className="font-serif text-3xl font-bold text-forest">
                    {inquiries.length}
                  </div>
                  <div className="text-[11px] text-[#5B6359] mt-1 flex items-center gap-1">
                    <span className="text-emerald-700 font-bold">100% recorded</span> in persistent storage
                  </div>
                </div>

                <div className="bg-[#FFFDF8] p-5 rounded-2xl border border-[#DCD4C3] shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase font-bold text-amber-700 tracking-wider">New / Pending</span>
                    <Clock size={20} className="text-amber-600" />
                  </div>
                  <div className="font-serif text-3xl font-bold text-amber-800">
                    {inquiries.filter(i => (i.status || 'received') === 'received').length}
                  </div>
                  <div className="text-[11px] text-[#5B6359] mt-1">
                    Awaiting executive or academic review
                  </div>
                </div>

                <div className="bg-[#FFFDF8] p-5 rounded-2xl border border-[#DCD4C3] shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase font-bold text-emerald-700 tracking-wider">Responded</span>
                    <CheckCircle2 size={20} className="text-emerald-600" />
                  </div>
                  <div className="font-serif text-3xl font-bold text-emerald-800">
                    {inquiries.filter(i => i.status === 'responded').length}
                  </div>
                  <div className="text-[11px] text-[#5B6359] mt-1">
                    Completed follow-ups
                  </div>
                </div>

                <div className="bg-[#FFFDF8] p-5 rounded-2xl border border-[#DCD4C3] shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase font-bold text-harvest tracking-wider">Emails Dispatched</span>
                    <Mail size={20} className="text-harvest" />
                  </div>
                  <div className="font-serif text-3xl font-bold text-forest">
                    {outbox.length * 2}
                  </div>
                  <div className="text-[11px] text-[#5B6359] mt-1">
                    Admin alerts + Partner acknowledgements
                  </div>
                </div>
              </div>

              {/* Two Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left: Recent Inquiries Stream */}
                <div className="lg:col-span-7 bg-[#FFFDF8] p-6 rounded-3xl border border-[#DCD4C3] shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#DCD4C3]">
                      <h3 className="font-serif text-xl font-bold text-forest">
                        Recent Partner Inquiries
                      </h3>
                      <button
                        onClick={() => setActiveTab('inquiries')}
                        className="text-xs text-harvest hover:underline font-semibold"
                      >
                        View all &rarr;
                      </button>
                    </div>

                    {inquiries.length === 0 ? (
                      <div className="py-12 text-center text-[#5B6359] text-sm">
                        No partner inquiries received yet.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {inquiries.slice(0, 4).map((inq) => (
                          <div
                            key={inq.id}
                            onClick={() => { setSelectedInquiry(inq); setInternalNoteText(inq.internalNotes || ''); }}
                            className="p-4 rounded-2xl bg-[#F6F1E7]/70 hover:bg-[#F6F1E7] border border-[#DCD4C3] transition cursor-pointer flex items-start justify-between gap-4 group"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-forest group-hover:text-harvest transition">
                                  {inq.name}
                                </span>
                                {inq.org && (
                                  <span className="text-xs text-[#5B6359]">· {inq.org}</span>
                                )}
                              </div>
                              <div className="text-xs text-harvest-dark font-medium">
                                {inq.category}
                              </div>
                              <div className="text-xs text-[#5B6359] line-clamp-1 font-light">
                                {inq.message || 'No additional note.'}
                              </div>
                            </div>

                            <div className="flex flex-col items-end gap-1.5 shrink-0">
                              {getStatusBadge(inq.status)}
                              <span className="text-[10px] text-gray-400 font-mono">
                                {new Date(inq.submittedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#DCD4C3] flex items-center justify-between text-xs text-[#5B6359]">
                    <span>Automated acknowledgment sent to all partner emails</span>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="font-bold text-forest hover:text-harvest"
                    >
                      Manage {inquiries.length} Inquiries &rarr;
                    </button>
                  </div>
                </div>

                {/* Right: Category Distribution & Campus Telemetry */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Category Progress Bars */}
                  <div className="bg-[#FFFDF8] p-6 rounded-3xl border border-[#DCD4C3] shadow-sm">
                    <h3 className="font-serif text-lg font-bold text-forest mb-4 pb-2 border-b border-[#DCD4C3]">
                      Inquiries by Track
                    </h3>
                    
                    {allCategories.length === 0 ? (
                      <div className="py-6 text-center text-xs text-gray-500">No category data yet.</div>
                    ) : (
                      <div className="space-y-3.5">
                        {allCategories.map((cat) => {
                          const count = inquiries.filter(i => i.category === cat).length;
                          const pct = Math.round((count / (inquiries.length || 1)) * 100);
                          return (
                            <div key={cat} className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="font-medium text-[#1F2420] truncate max-w-[200px]" title={cat}>{cat}</span>
                                <span className="font-bold text-forest">{count} ({pct}%)</span>
                              </div>
                              <div className="w-full bg-[#EDE6D6] h-2 rounded-full overflow-hidden">
                                <div
                                  className="bg-harvest h-full rounded-full transition-all duration-500"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Campus Key Facts Block */}
                  <div className="bg-forest text-cream p-6 rounded-3xl border border-forest-light shadow-md">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-harvest-gold mb-1">
                      Campus Project Overview
                    </div>
                    <h4 className="font-serif text-lg font-bold text-white mb-3">
                      ~112 Acres Contiguous Campus
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-forest-light/60 p-2.5 rounded-xl border border-forest-light">
                        <div className="text-harvest-gold font-bold text-base">30 TPH</div>
                        <div className="text-sage text-[11px]">Feed Mill Capacity</div>
                      </div>
                      <div className="bg-forest-light/60 p-2.5 rounded-xl border border-forest-light">
                        <div className="text-harvest-gold font-bold text-base">1,430</div>
                        <div className="text-sage text-[11px]">Sows Breeding Unit</div>
                      </div>
                      <div className="bg-forest-light/60 p-2.5 rounded-xl border border-forest-light">
                        <div className="text-harvest-gold font-bold text-base">4.8 TPD</div>
                        <div className="text-sage text-[11px]">Compressed Biogas</div>
                      </div>
                      <div className="bg-forest-light/60 p-2.5 rounded-xl border border-forest-light">
                        <div className="text-harvest-gold font-bold text-base">10 Labs</div>
                        <div className="text-sage text-[11px]">Vet Science &amp; Diagnostics</div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 2: PARTNER INQUIRIES FULL TABLE                  */}
          {/* ==================================================== */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Filter Controls Bar */}
              <div className="bg-[#FFFDF8] p-5 rounded-2xl border border-[#DCD4C3] shadow-sm flex flex-wrap items-center justify-between gap-4">
                
                {/* Search Input */}
                <div className="relative flex-1 min-w-[240px]">
                  <input
                    type="text"
                    placeholder="Search by name, email, organization, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#DCD4C3] text-xs text-[#1F2420] focus:outline-none focus:ring-2 focus:ring-harvest"
                  />
                  <Search size={15} className="absolute left-3 top-2.5 text-gray-400" />
                </div>

                {/* Category Dropdown */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white border border-[#DCD4C3] text-xs text-[#1F2420] font-medium focus:outline-none focus:ring-2 focus:ring-harvest"
                >
                  <option value="ALL">All Categories ({inquiries.length})</option>
                  {allCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white border border-[#DCD4C3] text-xs text-[#1F2420] font-medium focus:outline-none focus:ring-2 focus:ring-harvest"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="received">New / Received</option>
                  <option value="in_review">In Review</option>
                  <option value="responded">Responded</option>
                  <option value="archived">Archived</option>
                </select>

                {/* Export Button */}
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-semibold transition cursor-pointer shadow-sm"
                >
                  <Download size={14} />
                  <span>Export CSV</span>
                </button>
              </div>

              {/* Data Table */}
              <div className="bg-[#FFFDF8] rounded-3xl border border-[#DCD4C3] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#F8F5EE] border-b border-[#DCD4C3] text-forest font-semibold uppercase tracking-wider text-[11px]">
                        <th className="py-3.5 px-5">Ref ID</th>
                        <th className="py-3.5 px-5">Inquirer &amp; Org</th>
                        <th className="py-3.5 px-5">Partnership Track</th>
                        <th className="py-3.5 px-5">Message Snippet</th>
                        <th className="py-3.5 px-5">Status</th>
                        <th className="py-3.5 px-5">Submitted</th>
                        <th className="py-3.5 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EDE6D6]">
                      {filteredInquiries.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="py-12 text-center text-gray-500 text-sm">
                            No inquiries match the current search or filters.
                          </td>
                        </tr>
                      ) : (
                        filteredInquiries.map((inq) => (
                          <tr
                            key={inq.id}
                            className="hover:bg-[#FDF9F1] transition cursor-pointer group"
                            onClick={() => { setSelectedInquiry(inq); setInternalNoteText(inq.internalNotes || ''); }}
                          >
                            <td className="py-4 px-5 font-mono font-bold text-forest">
                              {inq.id}
                            </td>
                            <td className="py-4 px-5">
                              <div className="font-bold text-[#1F2420] text-sm">{inq.name}</div>
                              <div className="text-gray-500 text-[11px] flex items-center gap-2">
                                <span>{inq.email}</span>
                                {inq.phone && <span>· {inq.phone}</span>}
                              </div>
                              {inq.org && (
                                <div className="text-xs text-harvest-dark font-medium">{inq.org}</div>
                              )}
                            </td>
                            <td className="py-4 px-5">
                              <span className="bg-[#F6F1E7] border border-[#DCD4C3] px-2.5 py-1 rounded-lg text-xs font-medium text-forest block max-w-[200px] truncate" title={inq.category}>
                                {inq.category}
                              </span>
                            </td>
                            <td className="py-4 px-5 text-[#5B6359] max-w-xs truncate font-light" title={inq.message}>
                              {inq.message || '—'}
                            </td>
                            <td className="py-4 px-5">
                              {getStatusBadge(inq.status)}
                            </td>
                            <td className="py-4 px-5 text-gray-500 whitespace-nowrap">
                              {new Date(inq.submittedAt).toLocaleDateString()}
                              <span className="block text-[10px] text-gray-400">
                                {new Date(inq.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </td>
                            <td className="py-4 px-5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-1.5">
                                <a
                                  href={`mailto:${inq.email}?subject=Re: Expression of Interest in The Dikaiosune Mega Project [${inq.id}]`}
                                  className="p-1.5 rounded-lg bg-[#EDE6D6] hover:bg-harvest hover:text-white text-forest transition"
                                  title={`Direct reply to ${inq.email}`}
                                >
                                  <Send size={13} />
                                </a>
                                <button
                                  onClick={() => { setSelectedInquiry(inq); setInternalNoteText(inq.internalNotes || ''); }}
                                  className="p-1.5 rounded-lg bg-[#EDE6D6] hover:bg-forest hover:text-white text-forest transition"
                                  title="View Details"
                                >
                                  <Eye size={13} />
                                </button>
                                <button
                                  onClick={() => handleDeleteInquiry(inq.id)}
                                  className="p-1.5 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-700 transition"
                                  title="Delete Inquiry"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-[#F8F5EE] border-t border-[#DCD4C3] flex items-center justify-between text-xs text-[#5B6359]">
                  <span>Showing {filteredInquiries.length} of {inquiries.length} entries</span>
                  <span>Reference: DIK-YYYYMMDD-XXXX</span>
                </div>
              </div>

            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 3: EMAIL OUTBOX & AUDIT INSPECTOR                */}
          {/* ==================================================== */}
          {activeTab === 'outbox' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="bg-[#FFFDF8] p-6 rounded-3xl border border-[#DCD4C3] shadow-sm">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#DCD4C3]">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-forest">
                      Dispatched Email Audit Trail
                    </h3>
                    <p className="text-xs text-[#5B6359] mt-0.5">
                      Every form submission triggers 2 emails: an internal notification to leadership and a formal acknowledgment to the partner.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-forest bg-[#EDE6D6] px-3 py-1 rounded-full">
                    {outbox.length} Batches Dispatched
                  </span>
                </div>

                {outbox.length === 0 ? (
                  <div className="py-12 text-center text-gray-500 text-sm">
                    No emails logged in outbox yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {outbox.map((item) => (
                      <div
                        key={item.id}
                        className="p-5 rounded-2xl bg-[#F8F5EE] border border-[#DCD4C3] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-forest">{item.id}</span>
                            <span className="text-[10px] text-gray-400">· {new Date(item.submittedAt).toLocaleString()}</span>
                          </div>
                          <div className="font-bold text-sm text-[#1F2420]">
                            {item.adminSubject}
                          </div>
                          <div className="text-xs text-[#5B6359] flex flex-wrap gap-x-4 gap-y-1 pt-1">
                            <span><strong>Partner Recipient:</strong> {item.partnerRecipient}</span>
                            <span><strong>Admin Recipients:</strong> {item.adminRecipients?.join(', ')}</span>
                          </div>
                        </div>

                        {/* Preview Buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => {
                              setPreviewHtmlUrl(`/api/admin/outbox/preview/${item.partnerHtmlFile}`);
                              setPreviewTitle(`Partner Acknowledgment Letterhead (${item.partnerRecipient})`);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-sm"
                          >
                            <Eye size={13} />
                            <span>Partner Letter</span>
                          </button>

                          <button
                            onClick={() => {
                              setPreviewHtmlUrl(`/api/admin/outbox/preview/${item.adminHtmlFile}`);
                              setPreviewTitle(`Admin Notification Email (${item.id})`);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-[#EDE6D6] hover:bg-harvest hover:text-white text-forest text-xs font-semibold transition flex items-center gap-1.5"
                          >
                            <Eye size={13} />
                            <span>Admin Alert</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 4: CAMPUS OPERATIONS (112 ACRES)                 */}
          {/* ==================================================== */}
          {activeTab === 'operations' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Header Box */}
              <div className="bg-forest text-cream p-7 rounded-3xl border border-forest-light shadow-md flex flex-wrap items-center justify-between gap-6">
                <div>
                  <div className="text-xs uppercase font-bold tracking-widest text-harvest-gold mb-1">
                    Master Plan Layout · Barabanki, UP
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                    ~112-Acre Integrated Farm &amp; University
                  </h3>
                  <p className="text-xs sm:text-sm text-sage-light mt-2 max-w-2xl leading-relaxed">
                    Closed-loop agricultural, livestock, renewable energy, and veterinary research campus with 8 distinct operational zones.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-forest-light p-3 rounded-2xl text-center border border-forest-light/60">
                    <div className="font-serif text-2xl font-bold text-harvest-gold">10</div>
                    <div className="text-[10px] text-sage">Specialised Labs</div>
                  </div>
                  <div className="bg-forest-light p-3 rounded-2xl text-center border border-forest-light/60">
                    <div className="font-serif text-2xl font-bold text-harvest-gold">1 Loop</div>
                    <div className="text-[10px] text-sage">Zero Waste</div>
                  </div>
                </div>
              </div>

              {/* 8 Zoning Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { zone: 'Zone A', name: 'Commercial Feed Mill & Grain Silos', desc: '30 TPH automated line, raw ingredient silos & quality testing lab.', color: 'bg-harvest/15 border-harvest/40 text-harvest-dark' },
                  { zone: 'Zone B', name: 'High-Health Swine Breeding Unit', desc: '1,430 sows, climate-controlled farrowing & bio-secure perimeter.', color: 'bg-clay/15 border-clay/40 text-clay' },
                  { zone: 'Zone C', name: 'Poultry Layer Complex', desc: 'Automated egg collection, grading, and direct climate telemetry.', color: 'bg-amber-500/15 border-amber-500/40 text-amber-800' },
                  { zone: 'Zone D', name: 'Gir Cattle Dairy & Pasture', desc: 'Free-range paddocks, A2 milking parlour, and indigenous breeding.', color: 'bg-forest/15 border-forest/40 text-forest' },
                  { zone: 'Zone E', name: 'High-Rate Anaerobic Biogas Plant', desc: '4.8 TPD compressed biogas (CBG) & organic digestate processing.', color: 'bg-emerald-600/15 border-emerald-600/40 text-emerald-800' },
                  { zone: 'Zone F', name: 'Veterinary University Campus', desc: 'Academic block, BVSc & MVSc lecture halls, library & 10 labs.', color: 'bg-blue-600/15 border-blue-600/40 text-blue-800' },
                  { zone: 'Zone G', name: 'Veterinary Clinical Hospital', desc: 'Large & small animal emergency surgery, diagnostics, and imaging.', color: 'bg-indigo-600/15 border-indigo-600/40 text-indigo-800' },
                  { zone: 'Zone H', name: 'Organic Fodder & Crop Fields', desc: 'Digestate-fertilised high-yield silage maize, clover & bee flora.', color: 'bg-leaf/15 border-leaf/40 text-leaf' }
                ].map((z, i) => (
                  <div key={i} className={`p-5 rounded-2xl border ${z.color} bg-[#FFFDF8] shadow-sm flex flex-col justify-between`}>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-75">{z.zone}</div>
                      <h4 className="font-serif font-bold text-sm text-[#1F2420] mb-1.5">{z.name}</h4>
                      <p className="text-[11px] text-[#5B6359] leading-relaxed">{z.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 5: SETTINGS & SYSTEM CONFIG                      */}
          {/* ==================================================== */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fadeIn max-w-3xl">
              
              <div className="bg-[#FFFDF8] p-6 sm:p-8 rounded-3xl border border-[#DCD4C3] shadow-sm space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-forest">
                    System &amp; Email Dispatch Configuration
                  </h3>
                  <p className="text-xs text-[#5B6359] mt-1">
                    Environment variables and mail transport settings loaded on the server.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-2xl bg-[#F8F5EE] border border-[#DCD4C3] space-y-3">
                    <div className="font-bold text-forest text-sm flex items-center gap-2">
                      <Shield size={16} className="text-harvest" />
                      <span>Private Email Routing (Server-Side Only)</span>
                    </div>
                    <p className="text-gray-600 text-[11px] leading-relaxed">
                      As configured, these email addresses are stored strictly on the server backend in <code>.env</code> and are <strong>never</strong> bundled or sent to the client browser:
                    </p>
                    <div className="space-y-1 font-mono text-xs text-forest-dark bg-white p-3 rounded-xl border border-[#DCD4C3]">
                      <div><strong>Admin Notification Recipients:</strong> dikaiosunepvtltd@gmail.com, admin@dikaiosune.in</div>
                      <div><strong>From Letterhead:</strong> "Dikaiosune Mega Project" &lt;admin@dikaiosune.in&gt;</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F8F5EE] border border-[#DCD4C3] space-y-2">
                    <div className="font-bold text-forest text-sm">Server Telemetry</div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>Node Environment: <strong>production</strong></div>
                      <div>Active Port: <strong>3000</strong></div>
                      <div>Storage Driver: <strong>JSON Persistent DB (/data/inquiries.json)</strong></div>
                      <div>Audit Outbox: <strong>Active (/data/outbox/)</strong></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      {/* ======================================================== */}
      {/* INQUIRY DETAIL & STATUS MODAL                            */}
      {/* ======================================================== */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FFFDF8] text-[#1F2420] rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#DCD4C3] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {/* Close button */}
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#F6F1E7] text-[#5B6359] hover:text-[#1F2420] transition"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="mb-6 pb-4 border-b border-[#DCD4C3]">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-harvest bg-harvest/10 px-2.5 py-0.5 rounded-full">
                  {selectedInquiry.id}
                </span>
                {getStatusBadge(selectedInquiry.status)}
              </div>
              <h3 className="font-serif text-2xl font-bold text-forest">
                {selectedInquiry.name}
              </h3>
              <div className="text-xs text-[#5B6359]">
                Submitted on {new Date(selectedInquiry.submittedAt).toLocaleString()} · via {selectedInquiry.source}
              </div>
            </div>

            {/* Inquirer Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6">
              <div className="p-3 bg-[#F8F5EE] rounded-xl border border-[#E5DCCB]">
                <div className="text-gray-500 text-[10px] uppercase font-bold">Official Email</div>
                <a href={`mailto:${selectedInquiry.email}`} className="font-semibold text-forest hover:underline text-sm">
                  {selectedInquiry.email}
                </a>
              </div>

              <div className="p-3 bg-[#F8F5EE] rounded-xl border border-[#E5DCCB]">
                <div className="text-gray-500 text-[10px] uppercase font-bold">Phone Number</div>
                <div className="font-semibold text-forest text-sm">
                  {selectedInquiry.phone || 'Not provided'}
                </div>
              </div>

              <div className="p-3 bg-[#F8F5EE] rounded-xl border border-[#E5DCCB]">
                <div className="text-gray-500 text-[10px] uppercase font-bold">Organization / Univ</div>
                <div className="font-semibold text-forest text-sm">
                  {selectedInquiry.org || 'Individual / Self'}
                </div>
              </div>

              <div className="p-3 bg-[#F8F5EE] rounded-xl border border-[#E5DCCB]">
                <div className="text-gray-500 text-[10px] uppercase font-bold">Partnership Track</div>
                <div className="font-bold text-harvest-dark text-sm">
                  {selectedInquiry.category}
                </div>
              </div>
            </div>

            {/* Message Box */}
            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-forest mb-1.5">
                Expression of Interest Message
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#DCD4C3] text-xs text-[#1F2420] leading-relaxed whitespace-pre-wrap font-light">
                {selectedInquiry.message || 'No specific note provided.'}
              </div>
            </div>

            {/* Status Workflow Action Buttons */}
            <div className="mb-6 p-4 rounded-2xl bg-[#F8F5EE] border border-[#DCD4C3]">
              <div className="text-xs font-bold uppercase tracking-wider text-forest mb-2">
                Workflow Status Action
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleUpdateStatus(selectedInquiry.id, 'received')}
                  disabled={isUpdatingStatus}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    (selectedInquiry.status || 'received') === 'received'
                      ? 'bg-blue-600 text-white shadow'
                      : 'bg-white border border-[#DCD4C3] text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  ★ Mark as New
                </button>

                <button
                  onClick={() => handleUpdateStatus(selectedInquiry.id, 'in_review')}
                  disabled={isUpdatingStatus}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    selectedInquiry.status === 'in_review'
                      ? 'bg-amber-600 text-white shadow'
                      : 'bg-white border border-[#DCD4C3] text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  ● Mark as In Review
                </button>

                <button
                  onClick={() => handleUpdateStatus(selectedInquiry.id, 'responded')}
                  disabled={isUpdatingStatus}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    selectedInquiry.status === 'responded'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-white border border-[#DCD4C3] text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  ✓ Mark as Responded
                </button>

                <button
                  onClick={() => handleUpdateStatus(selectedInquiry.id, 'archived')}
                  disabled={isUpdatingStatus}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    selectedInquiry.status === 'archived'
                      ? 'bg-gray-700 text-white shadow'
                      : 'bg-white border border-[#DCD4C3] text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Archive
                </button>
              </div>
            </div>

            {/* Internal Notes Editor */}
            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-forest mb-1.5 flex justify-between items-center">
                <span>Internal Review Notes (Admin Only)</span>
                {selectedInquiry.lastReviewedAt && (
                  <span className="text-[10px] text-gray-400 font-normal">
                    Last updated: {new Date(selectedInquiry.lastReviewedAt).toLocaleTimeString()}
                  </span>
                )}
              </div>
              <textarea
                rows={3}
                placeholder="Add confidential notes on follow-up discussions, meeting dates, or next action items..."
                value={internalNoteText}
                onChange={(e) => setInternalNoteText(e.target.value)}
                className="w-full p-3 rounded-xl bg-white border border-[#DCD4C3] text-xs text-[#1F2420] focus:outline-none focus:ring-2 focus:ring-harvest"
              />
              <div className="mt-2 flex justify-end">
                <button
                  onClick={handleSaveNotes}
                  className="px-4 py-1.5 rounded-full bg-forest hover:bg-forest-light text-white text-xs font-semibold transition cursor-pointer"
                >
                  Save Internal Notes
                </button>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-[#DCD4C3] flex items-center justify-between">
              <a
                href={`mailto:${selectedInquiry.email}?subject=Re: Expression of Interest in The Dikaiosune Mega Project [${selectedInquiry.id}]`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-harvest hover:bg-harvest-dark text-white text-xs font-semibold shadow"
              >
                <Send size={13} />
                <span>Direct Reply to {selectedInquiry.name}</span>
              </a>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-5 py-2 rounded-full bg-[#EDE6D6] hover:bg-[#DCD4C3] text-[#1F2420] text-xs font-semibold transition cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* EMAIL PREVIEW MODAL (LIVE IFRAME LETTERHEAD)             */}
      {/* ======================================================== */}
      {previewHtmlUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#FFFDF8] rounded-3xl max-w-3xl w-full h-[85vh] flex flex-col border border-[#DCD4C3] shadow-2xl overflow-hidden">
            
            <div className="p-4 px-6 bg-forest text-cream border-b border-forest-light flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-harvest-gold">
                  Outbox Rendered Email Preview
                </div>
                <h4 className="font-serif font-bold text-sm text-white truncate max-w-lg">
                  {previewTitle}
                </h4>
              </div>
              <button
                onClick={() => setPreviewHtmlUrl(null)}
                className="p-1.5 rounded-full hover:bg-forest-light text-sage hover:text-white transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 bg-gray-100 p-2">
              <iframe
                src={previewHtmlUrl}
                title="Dispatched Email Preview"
                className="w-full h-full rounded-2xl border border-gray-300 bg-white"
              />
            </div>

            <div className="p-3 px-6 bg-[#F8F5EE] border-t border-[#DCD4C3] flex items-center justify-between text-xs text-[#5B6359]">
              <span>Exact HTML template delivered via Nodemailer transport</span>
              <button
                onClick={() => setPreviewHtmlUrl(null)}
                className="px-4 py-1.5 rounded-full bg-forest text-white font-semibold text-xs"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
