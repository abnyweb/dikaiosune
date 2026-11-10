import React from 'react';
import { Shield } from 'lucide-react';

export default function Footer({ onOpenAdmin }) {
  return (
    <footer className="bg-[#16291F] text-[#9FB197] text-[13px] py-7 border-t border-forest-light/30">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <span>Dikaiosune Pvt Ltd · CIN U01111UP2022PTC174884</span>
          <span className="hidden sm:inline mx-2">·</span>
          <span className="block sm:inline text-xs text-sage/70">Project plans are indicative and subject to statutory approvals.</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 text-xs text-harvest hover:text-harvest-gold transition cursor-pointer font-medium"
          >
            <Shield size={13} />
            <span>Executive Admin Portal</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
