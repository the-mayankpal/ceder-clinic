import { motion } from 'motion/react';

interface IconProps {
  isHovered: boolean;
  className?: string;
}

// Mathematically perfect, symmetrical geometric tooth path
const TOOTH_PATH = "M 8 3 C 5 3 3 5 3 8 C 3 11 5 14 6 16 L 8 21 C 8.5 22 9.5 22 10 21 L 11 17 C 11.5 16 12.5 16 13 17 L 14 21 C 14.5 22 15.5 22 16 21 L 18 16 C 19 14 21 11 21 8 C 21 5 19 3 16 3 C 14 3 12.5 4 12 5 C 11.5 4 10 3 8 3 Z";

// Ultra-smooth, premium easing curve (Apple-style)
const EASE = [0.16, 1, 0.3, 1];
const DUR = 1.2;

// 1. Aesthetic Dentistry (Veneer/Sparkle)
export const AestheticIcon = ({ isHovered, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={TOOTH_PATH} className="opacity-30" />
    
    {/* Animated outline draw */}
    <motion.path
      d={TOOTH_PATH}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
      transition={{ duration: DUR, ease: EASE }}
    />
    
    {/* Precision Sparkle */}
    <motion.path
      d="M 16 3 L 16.5 5.5 L 19 6 L 16.5 6.5 L 16 9 L 15.5 6.5 L 13 6 L 15.5 5.5 Z"
      initial={{ pathLength: 0, scale: 0.5, rotate: -45, opacity: 0 }}
      animate={{ pathLength: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5, rotate: isHovered ? 0 : -45, opacity: isHovered ? 1 : 0 }}
      transition={{ duration: DUR, ease: EASE }}
    />
  </svg>
);

// 2. Implantology (Implant)
export const ImplantIcon = ({ isHovered, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <defs>
      <clipPath id="implant-crown">
        <rect x="0" y="0" width="24" height="14" />
      </clipPath>
    </defs>
    
    {/* Crown */}
    <motion.g
      initial={{ y: -2 }}
      animate={{ y: isHovered ? 0 : -2 }}
      transition={{ duration: DUR, ease: EASE }}
    >
      <path d={TOOTH_PATH} clipPath="url(#implant-crown)" />
      <line x1="6" y1="14" x2="18" y2="14" />
    </motion.g>
    
    {/* Precision Titanium Screw */}
    <motion.g
      initial={{ y: 4, opacity: 0 }}
      animate={{ y: isHovered ? 0 : 4, opacity: isHovered ? 1 : 0 }}
      transition={{ duration: DUR, ease: EASE }}
      className="opacity-70"
    >
      <line x1="12" y1="14" x2="12" y2="22" />
      <line x1="9" y1="16" x2="15" y2="16" />
      <line x1="9.5" y1="18" x2="14.5" y2="18" />
      <line x1="10" y1="20" x2="14" y2="20" />
    </motion.g>
  </svg>
);

// 3. Orthodontics (Braces)
export const OrthoIcon = ({ isHovered, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={TOOTH_PATH} className="opacity-30" />
    
    {/* Archwire */}
    <motion.path
      d="M 2 10 C 8 12 16 12 22 10"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
      transition={{ duration: DUR, ease: EASE }}
    />
    
    {/* Brackets */}
    <motion.rect x="5" y="9.5" width="2" height="2" rx="0.5" initial={{ scale: 0 }} animate={{ scale: isHovered ? 1 : 0 }} transition={{ duration: 0.5, delay: 0.1, ease: EASE }} />
    <motion.rect x="11" y="10.5" width="2" height="2" rx="0.5" initial={{ scale: 0 }} animate={{ scale: isHovered ? 1 : 0 }} transition={{ duration: 0.5, delay: 0.2, ease: EASE }} />
    <motion.rect x="17" y="9.5" width="2" height="2" rx="0.5" initial={{ scale: 0 }} animate={{ scale: isHovered ? 1 : 0 }} transition={{ duration: 0.5, delay: 0.3, ease: EASE }} />
  </svg>
);

// 4. Periodontal Wellness (Gums)
export const PerioIcon = ({ isHovered, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={TOOTH_PATH} className="opacity-30" />
    
    {/* Gum line contour */}
    <motion.path
      d="M 2 13 C 6 10 10 15 12 15 C 14 15 18 10 22 13"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
      transition={{ duration: DUR, ease: EASE }}
    />
    
    {/* Tissue fill */}
    <motion.path
      d="M 2 13 C 6 10 10 15 12 15 C 14 15 18 10 22 13 L 22 24 L 2 24 Z"
      fill="currentColor"
      stroke="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isHovered ? 0.1 : 0 }}
      transition={{ duration: DUR, ease: EASE }}
    />
  </svg>
);

// 5. Restorative Care (Crown/Filling)
export const RestorativeIcon = ({ isHovered, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <defs>
      <clipPath id="top-half">
        <rect x="0" y="0" width="24" height="12.5" />
      </clipPath>
      <clipPath id="bottom-half">
        <rect x="0" y="12.5" width="24" height="12" />
      </clipPath>
    </defs>
    
    {/* Top Crown */}
    <motion.g
      initial={{ y: -2 }}
      animate={{ y: isHovered ? 0 : -2 }}
      transition={{ duration: DUR, ease: EASE }}
    >
      <path d={TOOTH_PATH} clipPath="url(#top-half)" />
    </motion.g>
    
    {/* Bottom Roots */}
    <motion.g
      initial={{ y: 2, opacity: 0.5 }}
      animate={{ y: isHovered ? 0 : 2, opacity: isHovered ? 1 : 0.5 }}
      transition={{ duration: DUR, ease: EASE }}
    >
      <path d={TOOTH_PATH} clipPath="url(#bottom-half)" />
    </motion.g>
    
    {/* Alignment Guide */}
    <motion.line 
      x1="4" y1="12.5" x2="20" y2="12.5" 
      strokeDasharray="2 2" 
      className="opacity-30"
      initial={{ opacity: 1 }}
      animate={{ opacity: isHovered ? 0 : 1 }}
      transition={{ duration: 0.3 }}
    />
  </svg>
);

// 6. Endodontics (Root Canal)
export const EndoIcon = ({ isHovered, className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={TOOTH_PATH} className="opacity-30" />
    
    {/* Left Canal */}
    <motion.path
      d="M 10 8 L 10 15 L 8.5 19.5"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
      transition={{ duration: DUR, ease: EASE }}
    />
    
    {/* Right Canal */}
    <motion.path
      d="M 14 8 L 14 15 L 15.5 19.5"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
      transition={{ duration: DUR, delay: 0.1, ease: EASE }}
    />
    
    {/* Pulp Chamber */}
    <motion.path
      d="M 10 8 C 10 6 14 6 14 8 Z"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
      transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
    />
  </svg>
);
