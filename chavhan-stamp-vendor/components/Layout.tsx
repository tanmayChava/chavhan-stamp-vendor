import React from 'react';
import { Scale, Menu, X, MapPin, Phone, Mail } from 'lucide-react';
import { APP_NAME } from '../constants';
import { ChatWidget } from './ChatWidget';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  navigate: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, navigate }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleNavClick = (page: string, id?: string) => {
    setIsMenuOpen(false);
    navigate(page);
    if (id) {
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const NavLink = ({ page, label, id }: { page: string; label: string; id?: string }) => (
    <button
      onClick={() => handleNavClick(page, id)}
      className="px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Main Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div className="flex items-center cursor-pointer group" onClick={() => navigate('home')}>
              <div className="bg-indigo-600 p-2 rounded-lg mr-3 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Scale className="h-6 w-6 text-white" strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-slate-900 leading-none">CHAVHAN</span>
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mt-0.5">STAMP VENDOR</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLink page="home" label="Home" />
              <NavLink page="home" label="Services" id="services" />
              <NavLink page="home" label="About Us" id="about" />
              <NavLink page="home" label="Contact Us" id="contact" />
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none"
              >
                {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 animate-fade-in-up">
            <div className="px-4 pt-4 pb-6 space-y-2 flex flex-col">
              <button onClick={() => handleNavClick('home')} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-lg">Home</button>
              <button onClick={() => handleNavClick('home', 'services')} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-lg">Services</button>
              <button onClick={() => handleNavClick('home', 'about')} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-lg">About Us</button>
              <button onClick={() => handleNavClick('home', 'contact')} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-lg">Contact Us</button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow relative">
        {children}
      </main>

      {/* Chat Widget */}
      <ChatWidget />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2 space-y-4">
              <div className="flex items-center text-white">
                <Scale className="h-6 w-6 mr-2 text-indigo-400" />
                <span className="text-xl font-bold">CHAVHAN STAMP VENDOR</span>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-sm">
                Authorized Govt. Stamp Vendor and Legal Consultant. Serving Bhusawal and surrounding areas.
              </p>
              <div className="inline-block px-3 py-1 bg-slate-800 rounded text-xs font-mono text-indigo-300 border border-slate-700 mt-2">
                  Licence No: 4892/MH/STAMP
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-bold tracking-wider uppercase text-white mb-4">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => handleNavClick('home', 'services')} className="hover:text-indigo-400 transition-colors">Services</button></li>
                <li><button onClick={() => handleNavClick('home', 'about')} className="hover:text-indigo-400 transition-colors">About Us</button></li>
                <li><button onClick={() => handleNavClick('home', 'contact')} className="hover:text-indigo-400 transition-colors">Contact</button></li>
                <li><button onClick={() => navigate('help')} className="hover:text-indigo-400 transition-colors">FAQ & Support</button></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold tracking-wider uppercase text-white mb-4">Contact</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-indigo-400 flex-shrink-0" />
                  <span>Kulkarni Plot, VAKIL GALLI, Bhusawal</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-indigo-400" />
                  <span>9422280256</span>
                </li>
                <li className="flex items-center">
                   <Mail className="h-4 w-4 mr-2 text-indigo-400" />
                   <span>chavhanstamp@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <div>&copy; {new Date().getFullYear()} CHAVHAN STAMP VENDOR. All rights reserved.</div>
            <div className="mt-4 md:mt-0 space-x-6">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};