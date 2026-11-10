import React, { useState } from 'react';
import { companyInfo } from '../data/projectData';
import { Building, MapPin, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    org: '',
    email: '',
    phone: '',
    track: 'Academic & Clinical Research Partner',
    message: ''
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
          org: formData.org,
          email: formData.email,
          phone: formData.phone,
          category: formData.track,
          message: formData.message,
          source: 'Website Partner Form'
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmissionResult(data);
        setFormSubmitted(true);
      } else {
        setErrorMessage(data.error || 'Failed to submit expression of interest. Please try again.');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setErrorMessage('Network connection error. Please verify your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormSubmitted(false);
    setSubmissionResult(null);
    setErrorMessage('');
    setFormData({
      name: '',
      org: '',
      email: '',
      phone: '',
      track: 'Academic & Clinical Research Partner',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-24 bg-clay text-white border-b border-clay-light">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Mission Call & Corporate Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="text-[13px] tracking-[0.14em] uppercase font-semibold text-[#F4E4C3] mb-3">
                Partnership &amp; Inquiries
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-white leading-tight mb-5">
                Build this with us
              </h2>
              <p className="text-base sm:text-lg text-[#FBEFE6] leading-relaxed mb-8 font-light">
                We warmly welcome conversations with academic and clinical partners, agricultural technology and equipment suppliers, commercial feed buyers, and organizations who share our commitment to justice for every living soul.
              </p>

              {/* Direct Company Directory (Private email routing kept on secure backend) */}
              <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3.5 text-base border-t border-white/20 pt-6">
                <dt className="text-[#F4E4C3] font-semibold">Entity Name</dt>
                <dd className="text-white font-medium">{companyInfo.name}</dd>

                <dt className="text-[#F4E4C3] font-semibold">Corporate CIN</dt>
                <dd className="text-white font-mono text-sm">{companyInfo.cin}</dd>

                <dt className="text-[#F4E4C3] font-semibold">Inquiries</dt>
                <dd className="text-[#FBEFE6] font-light text-sm">
                  Submissions processed via secure automated dispatch
                </dd>

                <dt className="text-[#F4E4C3] font-semibold">Registered Office</dt>
                <dd className="text-[#FBEFE6] font-light text-sm leading-relaxed">{companyInfo.registeredOffice}</dd>

                <dt className="text-[#F4E4C3] font-semibold">Campus Project Site</dt>
                <dd className="text-[#FBEFE6] font-light text-sm leading-relaxed">{companyInfo.projectSite}</dd>
              </dl>
            </div>
          </div>

          {/* Right Column: High-Contrast Pristine Paper Card */}
          <div className="lg:col-span-7 bg-[#FFFDF8] text-[#1F2420] rounded-3xl p-7 sm:p-10 border border-[#DCD4C3] shadow-2xl">
            {formSubmitted ? (
              <div className="py-10 text-center flex flex-col items-center justify-center animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-[#E7EEDF] flex items-center justify-center text-[#1E3A2B] mb-4">
                  <CheckCircle2 size={38} />
                </div>
                
                <h3 className="font-serif text-3xl font-semibold text-[#1E3A2B] mb-2">
                  Expression of Interest Acknowledged
                </h3>

                <div className="inline-block bg-[#F4E4C3]/40 border border-[#C08A2E]/40 px-3.5 py-1 rounded-full text-xs font-mono font-bold text-[#8B4A2B] mb-4">
                  Reference ID: {submissionResult?.inquiryId}
                </div>

                <p className="text-[#5B6359] max-w-lg mx-auto text-sm leading-relaxed mb-3 font-light">
                  Thank you, <strong>{formData.name}</strong>. Your expression of interest under the <strong>{formData.track}</strong> track has been securely recorded.
                </p>

                <p className="text-xs text-[#5B6359] max-w-md mx-auto leading-relaxed mb-6 bg-[#F6F1E7] p-3 rounded-xl border border-[#DCD4C3]">
                  An official acknowledgement has been dispatched to <strong>{formData.email}</strong>. Our project executive team will review your submission and contact you within two business days.
                </p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-7 py-2.5 rounded-full bg-[#1E3A2B] hover:bg-[#2C5238] text-white font-semibold text-sm transition-all shadow cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-[#DCD4C3] pb-4 mb-2">
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E3A2B]">
                    Partner With Us
                  </h3>
                  <p className="text-sm text-[#5B6359] mt-1 font-light">
                    Express interest in collaborating, supplying technology, buying products, or enrolling.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Partnership Track Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2420] mb-1.5">
                    Partnership Category
                  </label>
                  <select
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DCD4C3] text-[#1F2420] text-sm focus:outline-none focus:ring-2 focus:ring-[#C08A2E] font-medium"
                  >
                    <option>Academic &amp; Clinical Research Partner</option>
                    <option>Technology &amp; Equipment Supplier (Feed / Biogas / IoT)</option>
                    <option>Commercial Feed &amp; Agricultural Offtaker</option>
                    <option>Local Farmer Testing &amp; Technical Services</option>
                    <option>Prospective Veterinary Student (BVSc / MVSc / Skills)</option>
                    <option>Institutional Lender / Impact Investor</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1F2420] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. / Mr. / Ms. Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCD4C3] text-[#1F2420] text-sm focus:outline-none focus:ring-2 focus:ring-[#C08A2E] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1F2420] mb-1">
                      Organization / University
                    </label>
                    <input
                      type="text"
                      placeholder="Company, Institute or Farm"
                      value={formData.org}
                      onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCD4C3] text-[#1F2420] text-sm focus:outline-none focus:ring-2 focus:ring-[#C08A2E] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1F2420] mb-1">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCD4C3] text-[#1F2420] text-sm focus:outline-none focus:ring-2 focus:ring-[#C08A2E] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1F2420] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCD4C3] text-[#1F2420] text-sm focus:outline-none focus:ring-2 focus:ring-[#C08A2E] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F2420] mb-1">
                    Message / Expression of Interest *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your organization, proposed collaboration, or specific inquiries..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DCD4C3] text-[#1F2420] text-sm focus:outline-none focus:ring-2 focus:ring-[#C08A2E] focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-[#C08A2E] hover:bg-[#d69d38] disabled:opacity-60 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Submitting Expression of Interest...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Submit Expression of Interest</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
