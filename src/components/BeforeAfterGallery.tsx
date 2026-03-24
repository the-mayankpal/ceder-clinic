import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeftRight } from 'lucide-react';

const cases = [
  {
    id: 1,
    title: "Severe Decay Restoration",
    description: "Complete rehabilitation of severe tooth decay, rot, and discoloration into a pristine, bright white smile.",
    beforeImage: "https://res.cloudinary.com/dkxe8h4cs/image/upload/v1774341476/ChatGPT_Image_Mar_24_2026_01_36_11_AM_ru0fbr.png",
    afterImage: "https://res.cloudinary.com/dkxe8h4cs/image/upload/v1774341476/ChatGPT_Image_Mar_24_2026_01_35_59_AM_fpyy58.png",
    simulateBefore: false 
  },
  {
    id: 2,
    title: "Advanced Whitening & Repair",
    description: "Transformation of heavily stained, damaged, and worn teeth into a radiant, perfectly aligned white smile.",
    beforeImage: "https://res.cloudinary.com/dkxe8h4cs/image/upload/v1774341476/ChatGPT_Image_Mar_24_2026_01_36_25_AM_vd39xu.png",
    afterImage: "https://res.cloudinary.com/dkxe8h4cs/image/upload/v1774341480/ChatGPT_Image_Mar_24_2026_01_36_33_AM_lwmroq.png",
    simulateBefore: false
  },
  {
    id: 3,
    title: "Full Mouth Rehabilitation",
    description: "Comprehensive restoration involving dental implants and zirconia crowns to rebuild both flawless function and aesthetics.",
    beforeImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2000&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2000&auto=format&fit=crop",
    simulateBefore: true
  }
];

function BeforeAfterCard({ item }: { item: typeof cases[0] }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="relative w-full aspect-[4/3] md:aspect-[16/10] cursor-ew-resize select-none group"
           ref={containerRef}
           onPointerMove={handlePointerMove}
           onPointerDown={handlePointerDown}
           onPointerUp={handlePointerUp}
           onPointerLeave={handlePointerUp}>
        
        {/* Image Container with Overflow Hidden */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden border border-brand-ink/10">
          <div className="absolute inset-0 w-full h-full">
            {/* After Image (Bottom) */}
            <img 
              src={item.afterImage} 
              alt="After treatment" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              draggable={false}
              referrerPolicy="no-referrer"
            />
            
            {/* Before Image (Top, Clipped) */}
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img 
                src={item.beforeImage} 
                alt="Before treatment" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={item.simulateBefore ? { filter: 'sepia(80%) hue-rotate(-25deg) saturate(300%) brightness(55%) contrast(130%)' } : {}}
                draggable={false}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium text-white/90 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          Before
        </div>
        <div className="absolute top-4 right-4 md:top-6 md:right-6 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium text-white/90 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          After
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] pointer-events-none z-30"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center text-white shadow-2xl transition-transform duration-300 group-hover:scale-110">
            <ArrowLeftRight size={16} className="opacity-90" />
          </div>
        </div>
      </div>
      <div className="text-center px-4">
        <h3 className="font-serif text-xl md:text-2xl text-brand-ink mb-2">{item.title}</h3>
        <p className="text-brand-ink/70 text-xs md:text-sm font-light leading-relaxed max-w-md mx-auto">{item.description}</p>
      </div>
    </div>
  );
}

export default function BeforeAfterGallery() {
  return (
    <section className="relative w-full bg-white py-24 md:py-32 border-t border-brand-ink/5 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Centered Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-[1px] w-8 bg-brand-accent"></div>
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-brand-accent">
              Transformations
            </span>
            <div className="h-[1px] w-8 bg-brand-accent"></div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-light tracking-tight text-brand-ink max-w-2xl"
          >
            Witness the <span className="italic text-brand-ink/90">art of restoration.</span>
          </motion.h2>
        </div>

        {/* Two Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 max-w-6xl mx-auto">
          {cases.slice(0, 2).map((c) => (
            <BeforeAfterCard key={c.id} item={c} />
          ))}
        </div>
        
        <p className="text-center text-brand-ink/30 text-xs mt-16 font-light tracking-wide uppercase">
          Drag horizontally to compare results
        </p>
      </div>
    </section>
  );
}
