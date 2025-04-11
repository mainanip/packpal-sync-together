
import React from 'react';

export const Logo = ({ className = "", size = 35 }: { className?: string; size?: number }) => {
  return (
    <div className={`flex items-center font-bold text-2xl ${className}`}>
      <svg width={size} height={size} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="50" height="50" rx="10" fill="#9b87f5" />
        <path d="M15 15H35V35C35 38.3137 32.3137 41 29 41H21C17.6863 41 15 38.3137 15 35V15Z" fill="white" />
        <path d="M18 10H32C33.1046 10 34 10.8954 34 12V15H16V12C16 10.8954 16.8954 10 18 10Z" fill="#7E69AB" />
        <path d="M22 23H28M22 29H28" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="ml-2">PackPal</span>
    </div>
  );
};
