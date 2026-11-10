import React from 'react';

export default function BrandSeal({ size = 48, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      role="img" 
      aria-label="Dikaiosune seal: a sprout rising from the land inside a ring"
      className={className}
    >
      {/* Outer ring */}
      <circle cx="50" cy="50" r="46" fill="none" stroke="#C08A2E" strokeWidth="2.8" />
      {/* Inner dotted ring */}
      <circle cx="50" cy="50" r="39" fill="none" stroke="#C08A2E" strokeWidth="1" strokeDasharray="2 3.5" />
      {/* Curved ground furrow */}
      <path d="M22 68 Q50 58 78 68" fill="none" stroke="#F6F1E7" strokeWidth="3.2" strokeLinecap="round" />
      {/* Stem */}
      <path d="M50 64 L50 34" stroke="#F6F1E7" strokeWidth="3.2" strokeLinecap="round" />
      {/* Left Leaf (Sage - Farm) */}
      <path d="M50 46 C38 46 31 38 30 28 C41 28 49 35 50 46Z" fill="#A9BFA0" />
      {/* Right Leaf (Harvest Gold - University) */}
      <path d="M50 40 C61 40 69 32 70 22 C59 22 51 29 50 40Z" fill="#E2C27D" />
    </svg>
  );
}
