import React, { useState } from 'react';
import { X, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export default function PartnerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Academic & Clinical Research',
    note: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          category: formData.role,
          message: formData.note,
          source: 'Navbar Partner Modal'
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmissionResult(data);
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || 'Failed to submit expression of interest. Please try again.');
      }
    } catch (err) {
      console.error('Modal submission error:', err);
      setErrorMessage('Network connection error. Please verify your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmissionResult(null);
    setErrorMessage('');
    setFormData({
      name: '',
      email: '',
      role: 'Academic & Clinical Research',
      note: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FFFDF8] text-[#1F2420] rounded-3xl max-w-lg w-full p-7 sm:p-9 border border-[#DCD4C3] shadow-2xl relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#F6F1E7] text-[#5B6359] hover:text-[#1F2420] transition cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-[#E7EEDF] flex items-center justify-center text-[#1E3A2B] mb-3">
              <CheckCircle2 size={34} />
            </div>
            
            <h3 className="font-serif text-2xl font-bold text-[#1E3A2B] mb-1">
              Expression of Interest Received
            </h3>

            <div className="inline-block bg-[#F4E4C3]/40 border border-[#C08A2E]/40 px-3 py-0.5 rounded-full text-xs font-mono font-bold text-[#8B4A2B] mb-3">
              Reference ID: {submissionResult?.inquiryId}
            </div>

            <p className="text-sm text-[#5B6359] mb-3 leading-relaxed">
              Thank you for connecting with Dikaiosune. We have logged your submission under <strong>{formData.role}</strong>.
            </p>

            <p className="text-xs text-[#5B6359] leading-relaxed mb-6 bg-[#F6F1E7] p-3 rounded-xl border border-[#DCD4C3]">
              An official acknowledgement has been sent to <strong>{formData.email}</strong>. Our executive team will reach out within two business days.
            </p>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full bg-[#1E3A2B] text-white font-medium text-sm hover:bg-[#2C5238] transition cursor-pointer shadow"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6 pb-4 border-b border-[#DCD4C3]">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#C08A2E] block mb-1">
                The Dikaiosune Mega Project
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E3A2B]">
                Partner with us
              </h3>
              <p className="text-sm text-[#5B6359] mt-1.5 leading-normal">
                Direct engagement for universities, technology providers, feed buyers and researchers.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1F2420] mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCD4C3] text-[#1F2420] text-sm focus:outline-none focus:ring-2 focus:ring-[#C08A2E] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F2420] mb-1.5">
                  Official Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@organization.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCD4C3] text-[#1F2420] text-sm focus:outline-none focus:ring-2 focus:ring-[#C08A2E] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F2420] mb-1.5">
                  Engagement Track
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCD4C3] text-[#1F2420] text-sm focus:outline-none focus:ring-2 focus:ring-[#C08A2E] font-medium"
                >
                  <option>Academic &amp; Clinical Research</option>
                  <option>Equipment &amp; Automated Systems Supplier</option>
                  <option>Feed &amp; Food Commercial Buyer</option>
                  <option>Farmer Soil / Feed Testing Services</option>
                  <option>Prospective Student</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F2420] mb-1.5">
                  Brief Note *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="How would you like to collaborate?"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCD4C3] text-[#1F2420] text-sm focus:outline-none focus:ring-2 focus:ring-[#C08A2E] focus:border-transparent"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-full bg-[#C08A2E] hover:bg-[#d69d38] disabled:opacity-60 text-white font-semibold text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Submitting Expression of Interest...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Send Expression of Interest</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-center text-[#5B6359] pt-1">
                Submissions are securely routed to the Dikaiosune executive committee.
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
