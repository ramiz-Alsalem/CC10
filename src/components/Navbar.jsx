import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiTerminal } from 'react-icons/fi';
import { SiGithub } from 'react-icons/si';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/team', label: 'Team' },
  { path: '/writeups', label: 'Writeups' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cyber-black/90 backdrop-blur-lg border-b border-cyber-accent/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 flex items-center justify-center">
            <div className="absolute inset-0 bg-cyber-accent/20 rounded border border-cyber-accent/40 group-hover:border-cyber-accent/80 transition-colors" />
            <FiTerminal className="text-cyber-accent relative z-10" size={18} />
          </div>
          <div>
            <span className="font-display text-xl font-bold text-white tracking-wider">
              CC10
            </span>
            <div className="text-[10px] font-mono text-cyber-accent/60 tracking-[0.3em] -mt-1">
              CTF TEAM
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative font-mono text-sm tracking-wider transition-colors duration-200 group ${
                location.pathname === link.path
                  ? 'text-cyber-accent'
                  : 'text-cyber-muted hover:text-white'
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-cyber-accent transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'w-full'
                    : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-cyber-muted hover:text-cyber-accent transition-colors"
          >
            <SiGithub size={20} />
          </a>
          <Link to="/writeups" className="btn-cyber">
            <span>Writeups</span>
          </Link>
        </div>

        {/* Mobile Menu Btn */}
        <button
          className="md:hidden text-cyber-muted hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cyber-dark/95 backdrop-blur-lg border-b border-cyber-accent/10"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-mono text-sm py-2 border-b border-white/5 ${
                    location.pathname === link.path
                      ? 'text-cyber-accent'
                      : 'text-cyber-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
