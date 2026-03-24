import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';

const FOOTER_LOGO_URL = "https://cedarclinic.co/wp-content/uploads/2024/03/sedrpnglogos-02-1-scaled-e1747738323953-1224x1536.png";

const XLogo = ({ size = 16, className = "" }: { size?: number, className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 3.827H5.078z" />
  </svg>
);

export default function Footer({ setCurrentView }: { setCurrentView?: (view: string) => void }) {
  return (
    <footer className="relative bg-brand-ink pt-16 pb-8 overflow-hidden border-t border-brand-ink/5">
      {/* Atmospheric Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-accent/10 rounded-[100%] blur-[120px] pointer-events-none opacity-50" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & CTA (Takes up more space) */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <img
              src={FOOTER_LOGO_URL}
              alt="Cedar Clinic logo"
              className="h-14 md:h-16 w-auto object-contain mb-6"
            />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-[1px] w-8 bg-brand-accent"></div>
              <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-brand-accent">
                Begin Your Journey
              </span>
            </motion.div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-light mb-8 leading-[1.1]"
            >
              Ready to <span className="italic text-white/70">transform</span><br /> your smile?
            </motion.h3>
            
            <motion.button 
              onClick={() => setCurrentView?.('booking')}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-fit bg-brand-accent text-white px-8 py-3.5 md:px-10 md:py-4 rounded-full text-[11px] md:text-[13px] font-medium tracking-[0.1em] uppercase hover:bg-brand-accent/90 transition-colors flex items-center justify-center gap-2 md:gap-3 group"
            >
              Book Appointment
              <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
            </motion.button>
          </div>

          {/* Column 2: Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 flex flex-col gap-6"
          >
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Explore</h4>
            {['Treatments', 'Our Clinic', 'The Team', 'Patient Stories', 'Journal', 'Contact'].map((link) => (
              <a key={link} href="#" className="text-white/70 hover:text-brand-accent transition-colors text-sm w-fit flex items-center gap-2 group">
                <span className="w-0 h-[1px] bg-brand-accent transition-all duration-300 group-hover:w-4"></span>
                {link}
              </a>
            ))}
          </motion.div>

          {/* Column 3: Contact & Social */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3 flex flex-col gap-6"
          >
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Connect</h4>
            
            <div className="flex flex-col gap-4">
              <a href="#" className="flex items-start gap-3 text-white/70 hover:text-brand-accent transition-colors group">
                <MapPin size={16} className="mt-0.5 opacity-50 group-hover:opacity-100" />
                <span className="text-sm leading-relaxed">Salim Al Mubarak St. Block 2<br/>The View Tower, 10th Floor, Salmiya, KW</span>
              </a>
              <a href="tel:+96599481111" className="flex items-center gap-3 text-white/70 hover:text-brand-accent transition-colors group">
                <Phone size={16} className="opacity-50 group-hover:opacity-100" />
                <span className="text-sm">+965 9948 1111</span>
              </a>
              <a href="tel:19704112" className="flex items-center gap-3 text-white/70 hover:text-brand-accent transition-colors group">
                <Phone size={16} className="opacity-50 group-hover:opacity-100" />
                <span className="text-sm">PACI: 19704112 20002</span>
              </a>
              <a href="mailto:info@clovedental.com" className="flex items-center gap-3 text-white/70 hover:text-brand-accent transition-colors group">
                <Mail size={16} className="opacity-50 group-hover:opacity-100" />
                <span className="text-sm">info@cedarclinic.co</span>
              </a>
            </div>
            
            <div className="flex gap-3 mt-6">
              {[Instagram, Facebook, XLogo].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all duration-300 hover:-translate-y-1">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Giant Typography Background Element */}
        <div className="w-full flex justify-center items-center overflow-hidden mb-8 relative">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-[14vw] leading-none tracking-tighter text-white/[0.03] select-none flex"
            style={{ 
              WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
            }}
          >
            {['C', 'E', 'D', 'A', 'R'].map((letter, i) => (
              <span key={i} className="hover:text-white/20 transition-colors duration-300 cursor-default">
                {letter}
              </span>
            ))}
          </motion.h1>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
          <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-widest text-center md:text-left">
            © {new Date().getFullYear()} Cedar Clinic. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white text-[10px] md:text-xs uppercase tracking-widest transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/40 hover:text-white text-[10px] md:text-xs uppercase tracking-widest transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
