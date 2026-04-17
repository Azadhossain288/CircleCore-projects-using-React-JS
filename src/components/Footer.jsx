import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react'; 

export default function Footer() {
  return (
    <footer className="bg-[#1a3a32] text-white py-16 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Logo/Brand Name */}
        <h2 className="text-6xl font-bold mb-6 tracking-tight">KeenKeeper</h2>
        
        {/* Description */}
        <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        {/* Social Links Section */}
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4">Social Links</p>
          <div className="flex justify-center gap-4">
            
            <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#1a3a32] hover:bg-gray-200 transition-all">
              <Instagram size={24} />
            </a>
           
            <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#1a3a32] hover:bg-gray-200 transition-all">
              <Facebook size={24} />
            </a>
          
            <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#1a3a32] hover:bg-gray-200 transition-all">
              <Twitter size={24} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}