import React from 'react';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="relative w-full bg-white py-24 md:py-32 overflow-hidden border-t border-brand-ink/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Form Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-brand-accent"></div>
              <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-brand-accent">
                Contact Us
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-ink font-light mb-8">
              Send us a <span className="italic text-brand-ink/70">message.</span>
            </h2>
            
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-brand-ink/50 pl-1">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-brand-section border border-brand-ink/10 rounded-xl px-4 py-3.5 text-brand-ink placeholder:text-brand-ink/30 focus:outline-none focus:border-brand-accent/50 focus:bg-white transition-all" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-brand-ink/50 pl-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-brand-section border border-brand-ink/10 rounded-xl px-4 py-3.5 text-brand-ink placeholder:text-brand-ink/30 focus:outline-none focus:border-brand-accent/50 focus:bg-white transition-all" 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-ink/50 pl-1">Message</label>
                <textarea 
                  rows={3} 
                  className="w-full bg-brand-section border border-brand-ink/10 rounded-xl px-4 py-3.5 text-brand-ink placeholder:text-brand-ink/30 focus:outline-none focus:border-brand-accent/50 focus:bg-white transition-all resize-none" 
                  placeholder="How can we help you achieve your perfect smile?"
                ></textarea>
              </div>
              <button className="w-fit bg-brand-accent text-white px-8 py-3.5 md:px-10 md:py-4 rounded-full text-[11px] md:text-[13px] font-medium tracking-[0.1em] uppercase hover:bg-brand-accent/90 transition-colors flex items-center justify-center gap-2 md:gap-3 group mt-2">
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={1.5} />
              </button>
            </form>
          </motion.div>

          {/* Map Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-brand-ink/10 group bg-brand-section"
          >
            {/* Map iframe with light mode filter */}
            <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1739.0436979269555!2d48.0772!3d29.3392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9d2e4e242baf%3A0xe840e3fee575e57b!2sThe%20View%20Tower!5e0!3m2!1sen!2skw!4v1711234567890!5m2!1sen!2skw" 
               width="100%" 
               height="100%" 
               style={{ border: 0, filter: 'grayscale(100%) contrast(85%) opacity(80%)' }} 
               allowFullScreen={false} 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
             ></iframe>
            
            {/* Overlay Card */}
            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-auto md:w-80 p-6 rounded-xl bg-white/90 backdrop-blur-xl border border-brand-ink/10 shadow-2xl">
              <h3 className="font-serif text-xl text-brand-ink mb-2">Clove Dental</h3>
              <p className="text-brand-ink/60 text-sm font-light leading-relaxed mb-4">
                Salim Al Mubarak St. Block 2<br />
                The View Tower, 10th floor<br />
                PACI No. 19704112 20002, Salmiya, Kuwait
              </p>
              <div className="flex items-center gap-2 text-brand-accent text-xs uppercase tracking-widest font-medium">
                <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
                Open until 7:00 PM
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
