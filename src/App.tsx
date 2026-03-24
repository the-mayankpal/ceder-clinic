/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useMotionTemplate, useMotionValue } from 'motion/react';
import { Menu, X, ArrowRight, Star } from 'lucide-react';
import { Tooth, Sparkle, Stethoscope, GenderFemale } from '@phosphor-icons/react';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import BookingFlow from './components/BookingFlow';
import CustomCursor from './components/CustomCursor';
import BeforeAfterGallery from './components/BeforeAfterGallery';
import ReviewsSection from './components/ReviewsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const backgroundImages = [
  "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1974&auto=format&fit=crop"
];

const BRAND_LOGO_URL = "https://cedarclinic.co/wp-content/uploads/2021/12/sedrpnglogos-01-1536x744.png";

const clinicServices: {
  title: string;
  description: string;
  Icon: PhosphorIcon;
  image: string;
}[] = [
  {
    title: "Dentistry",
    description: "Comprehensive dental care at Clove Dental from routine check-ups to cosmetic treatments, your smile is our priority. Experience personalized care and the latest in dental technology.",
    Icon: Tooth,
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Aesthetic Dermatology",
    description: "Aesthetic dermatology involves non-surgical cosmetic procedures, such as fillers and laser treatments, to enhance skin appearance, addressing issues like wrinkles and pigmentation for a more youthful look.",
    Icon: Sparkle,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Internal Medicines",
    description: "Optimize your health at Clove Dental. Our internal medicine services offer comprehensive care for a range of conditions, providing personalized treatment plans and compassionate support.",
    Icon: Stethoscope,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Gynecology Services",
    description: "At Clove Dental, our gynecology services offer expert care tailored to your needs. From routine check-ups to specialized treatments, trust our experienced team for compassionate and comprehensive gynecological care.",
    Icon: GenderFemale,
    image: "/gynecology_service.png"
  }
];

function PremiumServiceCard({ service, index, setCurrentView }: any) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
      className="group relative flex flex-col justify-between h-[380px] w-full overflow-hidden bg-white border border-brand-ink/10 px-6 py-8 md:p-8 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setCurrentView('booking')}
    >
      {/* Hover Spotlight Background */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(56, 75, 248, 0.12),
              transparent 80%
            )
          `,
        }}
      />

      {/* Image Reveal */}
      <div className="absolute inset-0 z-0 opacity-100 transition-opacity duration-700 ease-in-out">
        <img src={service.image} alt={service.title} className="w-full h-full object-cover scale-100 transition-transform duration-1000 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col h-full justify-between">
        {/* Icon */}
        <div className="w-14 h-14 rounded-full border border-white/20 bg-white/10 flex items-center justify-center backdrop-blur-md group-hover:border-white/50 group-hover:bg-white/20 transition-colors duration-500 text-white">
          <service.Icon
            size={28}
            weight={isHovered ? "fill" : "duotone"}
            className="shrink-0 transition-[transform] duration-300 group-hover:scale-105"
            aria-hidden
          />
        </div>

        {/* Text Bottom */}
        <div className="flex flex-col">
          <h3 className="font-serif text-2xl md:text-3xl text-white mb-3 group-hover:text-white/90 transition-colors duration-500">
            {service.title}
          </h3>
          <p className="text-white/80 text-sm font-light leading-relaxed mb-6 line-clamp-2 group-hover:text-white transition-colors duration-500">
            {service.description}
          </p>
          
          {/* Animated Button */}
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-white/60 group-hover:text-white font-medium transition-colors duration-500">
            <span>Explore Treatment</span>
            <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ServicesGridSection({ setCurrentView }: any) {
  return (
    <section className="relative w-full bg-brand-ink flex flex-col justify-center py-24 md:py-32 overflow-hidden border-t border-brand-ink/5">
      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-4 md:px-8 flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-[1px] w-8 bg-brand-accent"></div>
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-brand-accent">
              Clinical Excellence
            </span>
            <div className="h-[1px] w-8 bg-brand-accent"></div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-light tracking-tight text-white max-w-2xl"
          >
            Mastery in <span className="italic text-white/90">every discipline.</span>
          </motion.h2>
        </div>

        {/* Grid: 1 column on mobile, 2 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 max-w-6xl mx-auto w-full">
          {clinicServices.map((service, index) => (
            <PremiumServiceCard key={index} service={service} index={index} setCurrentView={setCurrentView} />
          ))}
        </div>

      </div>
    </section>
  );
}

const teamMembers = [
  {
    name: "Dr. Walid Abdulbaki",
    role: "Specialist in Orthodontics & Cosmetic",
    credentials: "DDS, MSc • 15+ Years Experience",
    quote: "Specialist in orthodontics and cosmetic. Master’s degree in orthodontics from a university in France with more than 15 years of experience.",
    image: "https://cedarclinic.co/wp-content/uploads/2024/02/IMG_6354.jpg"
  },
  {
    name: "Dr. Mona Hashem",
    role: "Specialist in Dermatology & Cosmetic",
    credentials: "MSc, Consultant • 15+ Years Experience",
    quote: "Specialist in Dermatology and cosmetic. Master’s degree in dermatoloy consultant with more than 15 years of experience.",
    image: "https://cedarclinic.co/wp-content/uploads/2024/02/IMG_6353.jpg"
  },
  {
    name: "Dr. Nada Sfeir",
    role: "Specialist in Obstetrics & Gynecology",
    credentials: "25+ Years Experience • Brussels",
    quote: "Specialist in obstetrics and gynecology from a university in Brussels with more than 25 years of experience.",
    image: "https://cedarclinic.co/wp-content/uploads/2024/03/PSX_20240321_020222-scaled.jpg"
  },
  {
    name: "Dr. Tarek Al Rasheedi",
    role: "Internal Medicine / Diabetes",
    credentials: "30+ Years Experience • Scotland",
    quote: "Specialized postgraduate studies in diabetes from a university in Scotland with more than 30 years of experience.",
    image: "https://cedarclinic.co/wp-content/uploads/2024/02/IMG_6355.jpg"
  }
];

function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full bg-white py-24 md:py-32 border-t border-brand-ink/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[1px] w-8 bg-brand-accent"></div>
              <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-brand-accent">
                Our Team
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-light tracking-tight text-brand-ink"
            >
              Meet the <span className="italic text-brand-ink/90">visionaries.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-brand-ink/60 font-light max-w-sm text-sm md:text-base"
          >
            A curated collective of the world's most distinguished dental specialists, united by a singular obsession with perfection.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          {/* Left: Roster */}
          <div className="w-full lg:w-1/2 flex flex-col group/list">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group relative py-6 md:py-8 border-b border-brand-ink/10 cursor-pointer transition-opacity duration-500 hover:!opacity-100 lg:group-hover/list:opacity-30"
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 md:gap-12">
                      <span className="font-mono text-xs md:text-sm text-brand-ink/30 group-hover:text-brand-accent transition-colors duration-500">
                        0{index + 1}
                      </span>
                      <h3 className={`font-serif text-2xl md:text-4xl lg:text-5xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4 md:group-hover:translate-x-8 ${activeIndex === index ? 'text-brand-ink' : 'text-brand-ink/50 group-hover:text-brand-ink'}`}>
                        {member.name}
                      </h3>
                    </div>
                    {/* Directional arrow for mobile to signal expandability */}
                    <div className={`lg:hidden transition-transform duration-500 ${activeIndex === index ? 'rotate-90' : 'rotate-0'}`}>
                       <ArrowRight size={18} className="text-brand-ink/30" />
                    </div>
                  </div>
                  
                  {/* Mobile Image Reveal (Triggered by activeIndex) */}
                  <motion.div 
                    initial={false}
                    animate={{ 
                      height: activeIndex === index ? 'auto' : 0,
                      opacity: activeIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:hidden w-full overflow-hidden"
                  >
                    <div className="w-full h-[400px] mt-2 mb-4 rounded-2xl overflow-hidden relative shadow-lg">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                         <div className="w-12 h-[1px] bg-brand-accent mb-6"></div>
                         <p className="font-serif italic text-2xl text-white leading-relaxed">"{member.quote}"</p>
                      </div>
                    </div>
                  </motion.div>

                  <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-500 md:pl-[4.5rem] lg:pl-[5.5rem] mt-2 md:mt-4 ${
                    activeIndex === index 
                      ? 'h-auto opacity-100 visible pointer-events-auto' 
                      : 'lg:h-0 lg:overflow-hidden lg:opacity-0 lg:invisible lg:pointer-events-none h-0 opacity-0 overflow-hidden invisible pointer-events-none'
                  }`}>
                    <div>
                      <p className="text-brand-accent text-xs md:text-sm uppercase tracking-[0.2em] mb-1 font-medium">{member.role}</p>
                      <p className="text-brand-ink/60 text-xs md:text-sm font-light tracking-wide">{member.credentials}</p>
                    </div>
                    <div className="hidden lg:flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-brand-ink/40 group-hover:text-brand-ink transition-colors duration-500">
                      <span>View Profile</span>
                      <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Sticky Image Reveal (Desktop) */}
          <div className="hidden lg:flex w-1/2 sticky top-32 justify-end lg:pr-8">
            <div className="relative w-full max-w-[420px] aspect-[3/4] overflow-hidden rounded-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}
                  animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                  exit={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-0 w-full h-full bg-white"
                >
                  <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={teamMembers[activeIndex].image}
                    alt={teamMembers[activeIndex].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="absolute bottom-10 left-10 right-10"
                  >
                    <div className="w-12 h-[1px] bg-brand-accent mb-6"></div>
                    <p className="font-serif italic text-2xl text-white leading-relaxed">
                      "{teamMembers[activeIndex].quote}"
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'booking'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (currentView === 'booking') {
    return (
      <>
        <CustomCursor />
        <BookingFlow onBack={() => setCurrentView('home')} />
      </>
    );
  }

  return (
    <div className="min-h-screen w-full font-sans selection:bg-brand-accent selection:text-white relative bg-white overflow-x-hidden">
      <CustomCursor />
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-accent z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Hero Section Wrapper */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Full-screen Background Image Slideshow */}
        <div className="absolute inset-0 z-0 bg-white">
          <AnimatePresence mode="sync">
            <motion.img
              key={currentBgIndex}
              src={backgroundImages[currentBgIndex]}
              alt="Premium Dental Clinic Interior"
              className="absolute inset-0 w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
              initial={{ opacity: 0, scale: 1.05, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            />
          </AnimatePresence>
          {/* Light Luxury Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10 pointer-events-none md:w-3/4 lg:w-2/3"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Navbar */}
        <nav 
          id="main-nav"
          className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-[85%] max-w-[1200px] z-50 flex items-center justify-between px-6 md:px-8 py-3 md:py-4 rounded-full backdrop-blur-xl transition-all duration-500 bg-brand-ink/70 border border-white/10">
          <a href="#" className="flex items-center cursor-pointer">
            <img 
              src={BRAND_LOGO_URL}
              alt="Clinic Logo" 
              className="h-8 md:h-9 w-auto hover:opacity-80 transition-opacity object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10 text-[11px] uppercase tracking-[0.15em] font-medium transition-colors duration-500 text-white/90">
            <motion.a href="#" whileHover={{ y: -2, color: "#384BF8" }} transition={{ duration: 0.2 }} className="hover:text-brand-accent transition-colors">Home</motion.a>
            <motion.a href="#" whileHover={{ y: -2, color: "#384BF8" }} transition={{ duration: 0.2 }} className="hover:text-brand-accent transition-colors">Clinic</motion.a>
            <motion.a href="#" whileHover={{ y: -2, color: "#384BF8" }} transition={{ duration: 0.2 }} className="hover:text-brand-accent transition-colors">Services</motion.a>
            <motion.a href="#" whileHover={{ y: -2, color: "#384BF8" }} transition={{ duration: 0.2 }} className="hover:text-brand-accent transition-colors">Contact</motion.a>
          </div>

          <div className="hidden lg:block">
            <motion.button 
              onClick={() => setCurrentView('booking')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-accent text-white px-6 py-2.5 md:px-8 md:py-3 rounded-full text-[10px] md:text-[11px] font-medium tracking-[0.1em] uppercase hover:bg-brand-accent/90 transition-colors flex items-center justify-center gap-2 group whitespace-nowrap"
            >
              Book Appointment
              <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden transition-colors duration-500 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 lg:hidden">
            <a href="#" className="font-serif text-3xl text-brand-ink hover:text-brand-accent transition-colors">Home</a>
            <a href="#" className="font-serif text-3xl text-brand-ink hover:text-brand-accent transition-colors">Clinic</a>
            <a href="#" className="font-serif text-3xl text-brand-ink hover:text-brand-accent transition-colors">Services</a>
            <a href="#" className="font-serif text-3xl text-brand-ink hover:text-brand-accent transition-colors">Contact</a>
            <motion.button 
              onClick={() => {
                setIsMenuOpen(false);
                setCurrentView('booking');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 bg-brand-accent text-white px-8 py-3.5 md:px-10 md:py-4 rounded-full text-[11px] md:text-[13px] font-medium tracking-[0.1em] uppercase hover:bg-brand-accent/90 transition-colors flex items-center justify-center gap-2 md:gap-3 group"
            >
              Book Appointment
              <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
            </motion.button>
          </div>
        )}

        {/* Hero Section */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 max-w-[1400px] mx-auto w-full pt-20">
          
          {/* Text Content */}
          <div className="w-full lg:w-3/5 flex flex-col items-start">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.3
                  }
                }
              }}
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="h-[1px] w-12 bg-brand-accent"></div>
                <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-brand-accent">
                  Elevating Dental Care
                </span>
              </motion.div>
              
              <motion.h1 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="font-serif text-6xl md:text-8xl lg:text-[7.5rem] leading-[0.9] font-light tracking-tight mb-8 text-white"
              >
                Artistry in <br />
                <span className="italic text-white/90">every smile.</span>
              </motion.h1>
              
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="text-white/80 text-base md:text-lg font-light max-w-md mb-12 leading-relaxed"
              >
                Experience a new standard of dentistry where advanced technology meets unparalleled comfort and aesthetic precision.
              </motion.p>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
              >
                <motion.button 
                  onClick={() => setCurrentView('booking')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-brand-accent text-white px-8 py-3.5 md:px-10 md:py-4 rounded-full text-[11px] md:text-[13px] font-medium tracking-[0.1em] uppercase hover:bg-brand-accent/90 transition-colors flex items-center justify-center gap-2 md:gap-3 group"
                >
                  Book Appointment
                  <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-3.5 md:px-10 md:py-4 rounded-full text-[11px] md:text-[13px] font-medium tracking-[0.1em] uppercase text-white border border-white hover:bg-white/10 transition-colors flex items-center justify-center"
                >
                  Our Services
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Unboxed Editorial Review Element */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="absolute bottom-12 right-6 lg:right-16 hidden lg:flex items-center gap-6"
          >
            {/* Avatar Group */}
            <div className="flex items-center">
              {[
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
              ].map((src, i) => (
                <img 
                  key={i}
                  src={src}
                  alt="Patient review"
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full border-2 border-white object-cover -ml-4 first:ml-0 hover:-translate-y-2 hover:scale-110 transition-all duration-300 relative hover:z-10 shadow-lg cursor-pointer"
                  style={{ zIndex: 10 - i }}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-brand-accent ml-2">
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
            </div>
            
            {/* Elegant vertical divider */}
            <div className="w-[1px] h-10 bg-white/20 mx-2"></div>
            
            <div className="flex flex-col">
              <p className="text-[11px] uppercase tracking-[0.25em] font-medium text-white">
                5.0 Rated Clinic
              </p>
              <p className="font-serif text-[15px] text-white/60 italic mt-0.5">
                Based on 200+ reviews
              </p>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* Trust Marquee Section */}
      <section className="w-full bg-white py-5 border-y border-black/10 overflow-hidden flex items-center relative z-20">
        <div className="flex w-max animate-marquee">
          {/* We duplicate the items to create a seamless infinite loop */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              
              <div className="flex items-center gap-4 px-12">
                <span className="text-brand-ink/80 text-sm md:text-base uppercase tracking-[0.2em] font-medium whitespace-nowrap">
                  1000+ Patients Treated
                </span>
                <Star className="text-brand-accent w-4 h-4" />
              </div>

              <div className="flex items-center gap-4 px-12">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                <span className="text-brand-ink/80 text-sm md:text-base uppercase tracking-[0.2em] font-medium whitespace-nowrap">
                  4.8+ Star Reviews
                </span>
                <Star className="text-brand-accent w-4 h-4" />
              </div>

              <div className="flex items-center gap-4 px-12">
                <span className="text-brand-ink/80 text-sm md:text-base uppercase tracking-[0.2em] font-medium whitespace-nowrap">
                  Experienced Team
                </span>
                <Star className="text-brand-accent w-4 h-4" />
              </div>

              <div className="flex items-center gap-4 px-12">
                <span className="text-brand-ink/80 text-sm md:text-base uppercase tracking-[0.2em] font-medium whitespace-nowrap">
                  Smiling Patients · 20&nbsp;000&nbsp;+
                </span>
                <Star className="text-brand-accent w-4 h-4" />
              </div>

              <div className="flex items-center gap-4 px-12">
                <span className="text-brand-ink/80 text-sm md:text-base uppercase tracking-[0.2em] font-medium whitespace-nowrap">
                  Cosmetic Procedures · 19&nbsp;000&nbsp;+
                </span>
                <Star className="text-brand-accent w-4 h-4" />
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="w-full bg-brand-section py-24 md:py-32 relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
              className="flex flex-col items-start"
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="h-[1px] w-12 bg-brand-accent"></div>
                <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-brand-accent bg-brand-ink text-white px-4 py-1.5 rounded-sm">
                  FROM 2015
                </span>
              </motion.div>
              
              <motion.h2 
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] font-light tracking-tight mb-8 text-brand-ink"
              >
                Clove Dental
              </motion.h2>
              
              <motion.p 
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="text-brand-ink/70 text-base md:text-lg font-light mb-10 leading-relaxed"
              >
                Expert Care, Threefold. Pioneering in Dental, Dermatology, and Internal Medicine. About Us, About Your Health. Your trusted partner in comprehensive healthcare, offering personalized services to meet your individual needs. Experience our commitment to excellence and compassion in every aspect of your health journey.
              </motion.p>

              <motion.button 
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                whileHover={{ x: 5 }}
                className="text-[13px] font-medium tracking-[0.1em] uppercase text-brand-ink border-b border-brand-accent pb-1 hover:text-brand-accent transition-colors flex items-center gap-2 group"
              >
                Discover Our Philosophy
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </motion.button>
            </motion.div>

            {/* Image Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md mx-auto lg:ml-auto"
            >
              {/* Image Wrapper */}
              <div className="aspect-[4/5] w-full relative overflow-hidden rounded-sm">
                <motion.img 
                  src="https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=1000&auto=format&fit=crop" 
                  alt="Clinic Interior" 
                  className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover"
                  style={{ y: imageY }}
                  referrerPolicy="no-referrer"
                />
                {/* Decorative border */}
                <div className="absolute inset-0 border border-brand-ink/10 z-10 pointer-events-none"></div>
              </div>
                
              {/* Floating stat card */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="absolute -left-4 md:-left-12 bottom-8 md:bottom-12 bg-white p-6 md:p-8 shadow-2xl z-20 rounded-sm"
              >
                <p className="font-serif text-4xl md:text-5xl text-brand-ink mb-2">15+</p>
                <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-brand-ink/60">Years of<br/>Excellence</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Hover Reveal Services Section */}
      <ServicesGridSection setCurrentView={setCurrentView} />

      {/* Before & After Gallery */}
      <BeforeAfterGallery />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Meet the Team Section */}
      <TeamSection />

      {/* Contact & Map Section */}
      <ContactSection />

      {/* Footer */}
      <Footer setCurrentView={setCurrentView} />
    </div>
  );
}
