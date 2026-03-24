import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

interface BookingFlowProps {
  onBack: () => void;
}

const services = [
  { id: 'dentistry', title: 'Dentistry', desc: 'Comprehensive dental care', image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=800&auto=format&fit=crop' },
  { id: 'dermatology', title: 'Aesthetic Dermatology', desc: 'Skin care and laser treatments', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800' },
  { id: 'internal', title: 'Internal Medicines', desc: 'Comprehensive healthcare', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800' },
  { id: 'gynecology', title: 'Gynecology Services', desc: "Women's healthcare specialist", image: '/gynecology_service.png' }
];

const timeSlots = {
  Morning: ['09:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM'],
  Afternoon: ['12:00 PM - 01:00 PM', '01:00 PM - 02:00 PM', '02:00 PM - 03:00 PM', '03:00 PM - 04:00 PM'],
  Evening: ['04:00 PM - 05:00 PM', '05:00 PM - 06:00 PM']
};

export default function BookingFlow({ onBack }: BookingFlowProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  // Date & Time State
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timeFilter, setTimeFilter] = useState<'Morning' | 'Afternoon' | 'Evening'>('Morning');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Patient Details State
  const [patientType, setPatientType] = useState<'new' | 'returning'>('new');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  // Calendar Logic
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  const isPastDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    date.setHours(23, 59, 59, 999);
    return date < today;
  };

  const isSelectedDate = (day: number) => {
    if (!selectedDate) return false;
    return selectedDate.getDate() === day && selectedDate.getMonth() === currentMonth && selectedDate.getFullYear() === currentYear;
  };

  const isStepValid = () => {
    if (step === 1) return selectedService !== null;
    if (step === 2) return selectedDate !== null && selectedTime !== null;
    if (step === 3) return formData.name.trim() !== '' && formData.email.trim() !== '' && formData.phone.trim() !== '';
    return true;
  };

  return (
    <div className="min-h-screen w-full bg-white text-brand-ink font-sans selection:bg-brand-accent selection:text-white relative overflow-x-hidden pb-32">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-brand-ink/10 z-[60]">
        <motion.div 
          className="h-full bg-brand-accent origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: step / 4 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Navbar */}
      <nav className="absolute top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-[85%] max-w-[1200px] z-50 flex items-center justify-between px-6 md:px-8 py-3 md:py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
        <a onClick={onBack} className="flex items-center cursor-pointer">
          <img 
            src="https://api.iconify.design/ph:tooth-light.svg?color=ffffff" 
            alt="Clinic Logo" 
            className="h-8 md:h-9 w-auto hover:opacity-80 transition-opacity"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10 text-[11px] uppercase tracking-[0.15em] font-medium text-white/90">
          <motion.a onClick={onBack} whileHover={{ y: -2, color: "#384BF8" }} transition={{ duration: 0.2 }} className="hover:text-brand-accent transition-colors cursor-pointer">Home</motion.a>
          <motion.a onClick={onBack} whileHover={{ y: -2, color: "#384BF8" }} transition={{ duration: 0.2 }} className="hover:text-brand-accent transition-colors cursor-pointer">Clinic</motion.a>
          <motion.a onClick={onBack} whileHover={{ y: -2, color: "#384BF8" }} transition={{ duration: 0.2 }} className="hover:text-brand-accent transition-colors cursor-pointer">Services</motion.a>
          <motion.a onClick={onBack} whileHover={{ y: -2, color: "#384BF8" }} transition={{ duration: 0.2 }} className="hover:text-brand-accent transition-colors cursor-pointer">Contact</motion.a>
        </div>

        <div className="hidden lg:block">
          <motion.button 
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 md:px-8 md:py-3 rounded-full text-[10px] md:text-[11px] font-medium tracking-[0.1em] uppercase text-white border border-white/30 hover:border-white transition-colors duration-300 whitespace-nowrap"
          >
            Cancel Booking
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 lg:hidden">
          <a onClick={onBack} className="font-serif text-3xl text-brand-ink hover:text-brand-accent transition-colors cursor-pointer">Home</a>
          <a onClick={onBack} className="font-serif text-3xl text-brand-ink hover:text-brand-accent transition-colors cursor-pointer">Clinic</a>
          <a onClick={onBack} className="font-serif text-3xl text-brand-ink hover:text-brand-accent transition-colors cursor-pointer">Services</a>
          <a onClick={onBack} className="font-serif text-3xl text-brand-ink hover:text-brand-accent transition-colors cursor-pointer">Contact</a>
          <motion.button 
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-3.5 md:px-10 md:py-4 rounded-full text-[11px] md:text-[13px] font-medium tracking-[0.1em] uppercase text-brand-ink border border-brand-ink/30 hover:border-brand-ink transition-colors"
          >
            Cancel Booking
          </motion.button>
        </div>
      )}

      {/* Hero Section / Slab */}
      <div className="relative w-full h-[40vh] min-h-[350px] mb-16 md:mb-24">
        <img 
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1974&auto=format&fit=crop" 
          alt="Booking Header" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-brand-accent"></div>
              <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-brand-accent">
                Reservations
              </span>
              <div className="h-[1px] w-8 bg-brand-accent"></div>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white">
              Book <span className="italic text-white/90">Appointment</span>
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <button 
            onClick={step === 1 || step === 4 ? onBack : prevStep}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-medium text-brand-ink/60 hover:text-brand-ink transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            {step === 1 || step === 4 ? 'Return to Home' : 'Back'}
          </button>
          {step < 4 && (
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-brand-accent">
              Step {step} of 3
            </span>
          )}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4 text-brand-ink">
                What brings you in <span className="italic text-brand-ink/90">today?</span>
              </h2>
              <p className="text-brand-ink/60 text-base mb-12 max-w-xl">
                Select a service to help us prepare for your visit. If you're unsure, General Consultation is a great place to start.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                {services.map(s => (
                  <motion.div 
                    key={s.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedService(s.id)}
                    className={`relative rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 group aspect-square md:aspect-[16/9] ${
                      selectedService === s.id ? 'border-brand-accent ring-1 ring-brand-accent' : 'border-brand-ink/10 hover:border-brand-ink/30'
                    }`}
                  >
                    <img src={s.image} alt={s.title} className={`w-full h-full object-cover transition-opacity duration-500 ${selectedService === s.id ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 md:p-8 flex flex-col justify-end">
                      <div className="flex items-end md:items-center justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="text-base sm:text-lg md:text-2xl font-serif text-white mb-1 md:mb-2 leading-tight">{s.title}</h3>
                          <p className="text-white/70 text-[10px] sm:text-xs md:text-sm hidden sm:block">{s.desc}</p>
                        </div>
                        <div className={`shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full border flex items-center justify-center transition-colors ${selectedService === s.id ? 'border-brand-accent bg-brand-accent text-white' : 'border-white/30 text-transparent'}`}>
                          <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={3} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4 text-brand-ink">
                Select a <span className="italic text-brand-ink/90">date and time.</span>
              </h2>
              <p className="text-brand-ink/60 text-base mb-12 max-w-xl">
                Choose a convenient slot for your appointment. All times are displayed in your local timezone.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Calendar */}
                <div className="bg-brand-ink/5 border border-brand-ink/10 rounded-2xl p-6 md:p-8 h-fit">
                  <div className="flex justify-between items-center mb-8 text-brand-ink">
                    <button onClick={handlePrevMonth} className="p-2 hover:bg-brand-ink/10 rounded-full transition-colors"><ChevronLeft size={20} /></button>
                    <span className="font-serif text-xl tracking-wide">{monthNames[currentMonth]} {currentYear}</span>
                    <button onClick={handleNextMonth} className="p-2 hover:bg-brand-ink/10 rounded-full transition-colors"><ChevronRight size={20} /></button>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2 text-center mb-4">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                      <div key={d} className="text-[10px] uppercase tracking-[0.2em] font-medium text-brand-ink/40">{d}</div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2">
                    {blanks.map(b => <div key={`blank-${b}`} />)}
                    {days.map(d => {
                      const past = isPastDate(d);
                      const selected = isSelectedDate(d);
                      return (
                        <button
                          key={d}
                          onClick={() => setSelectedDate(new Date(currentYear, currentMonth, d))}
                          disabled={past}
                          className={`aspect-square rounded-full flex items-center justify-center text-sm transition-all ${
                            selected ? 'bg-brand-accent text-white font-medium' :
                            past ? 'text-brand-ink/20 cursor-not-allowed' :
                            'text-brand-ink/80 hover:bg-brand-ink/10 hover:text-brand-ink'
                          }`}
                        >
                          {d}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="flex flex-col">
                  <div className="flex gap-6 border-b border-brand-ink/10 mb-8">
                    {(['Morning', 'Afternoon', 'Evening'] as const).map(f => (
                      <button
                        key={f}
                        onClick={() => setTimeFilter(f)}
                        className={`pb-4 text-[11px] tracking-[0.2em] uppercase font-medium transition-colors relative ${timeFilter === f ? 'text-brand-accent' : 'text-brand-ink/50 hover:text-brand-ink'}`}
                      >
                        {f}
                        {timeFilter === f && (
                          <motion.div layoutId="activeTimeFilter" className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-accent" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {timeSlots[timeFilter].map(slot => (
                      <motion.button
                        key={slot}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-4 px-6 rounded-xl border transition-all text-sm tracking-wide flex items-center justify-center ${
                          selectedTime === slot 
                            ? 'border-brand-accent bg-brand-accent/10 text-brand-accent' 
                            : 'border-brand-ink/10 text-brand-ink/70 hover:border-brand-ink/30 hover:text-brand-ink'
                        }`}
                      >
                        {slot}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4 text-brand-ink">
                Your <span className="italic text-brand-ink/90">details.</span>
              </h2>
              <p className="text-brand-ink/60 text-base mb-12 max-w-xl">
                Please provide your contact information so we can confirm your appointment and send you reminders.
              </p>

              <div className="max-w-2xl">
                <div className="flex p-1 bg-brand-ink/10 rounded-full w-full sm:w-fit mb-10 border border-brand-ink/20 relative">
                  {(['new', 'returning'] as const).map((type) => (
                    <button 
                      key={type}
                      onClick={() => setPatientType(type)} 
                      className={`relative flex-1 sm:flex-none whitespace-nowrap px-2 sm:px-8 py-3 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.05em] sm:tracking-[0.15em] font-medium transition-colors duration-500 outline-none focus:outline-none ${patientType === type ? 'text-white' : 'text-brand-ink/90 hover:text-brand-ink'}`}
                    >
                      {patientType === type && (
                        <motion.div
                          layoutId="patientTypePill"
                          className="absolute inset-0 bg-brand-accent rounded-full shadow-sm"
                          transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        />
                      )}
                      <span className="relative z-10">{type === 'new' ? 'New Patient' : 'Returning Patient'}</span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  <div className="relative group md:col-span-2">
                    <input 
                      type="text" 
                      id="name"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="block px-6 py-5 w-full text-lg text-brand-ink bg-brand-ink/5 rounded-2xl border border-brand-ink/10 appearance-none focus:outline-none focus:ring-0 focus:border-brand-accent focus:bg-white transition-all duration-300 shadow-sm hover:border-brand-ink/20 placeholder:text-brand-ink/60 focus:placeholder-transparent" 
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="relative group">
                    <input 
                      type="email" 
                      id="email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="block px-6 py-5 w-full text-lg text-brand-ink bg-brand-ink/5 rounded-2xl border border-brand-ink/10 appearance-none focus:outline-none focus:ring-0 focus:border-brand-accent focus:bg-white transition-all duration-300 shadow-sm hover:border-brand-ink/20 placeholder:text-brand-ink/60 focus:placeholder-transparent" 
                      placeholder="Email Address"
                    />
                  </div>
                  <div className="relative group">
                    <input 
                      type="tel" 
                      id="phone"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="block px-6 py-5 w-full text-lg text-brand-ink bg-brand-ink/5 rounded-2xl border border-brand-ink/10 appearance-none focus:outline-none focus:ring-0 focus:border-brand-accent focus:bg-white transition-all duration-300 shadow-sm hover:border-brand-ink/20 placeholder:text-brand-ink/60 focus:placeholder-transparent" 
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="relative group md:col-span-2">
                    <textarea 
                      id="notes"
                      value={formData.notes}
                      onChange={e => setFormData({...formData, notes: e.target.value})}
                      rows={3} 
                      className="block px-6 py-5 w-full text-lg text-brand-ink bg-brand-ink/5 rounded-2xl border border-brand-ink/10 appearance-none focus:outline-none focus:ring-0 focus:border-brand-accent focus:bg-white transition-all duration-300 shadow-sm hover:border-brand-ink/20 resize-none placeholder:text-brand-ink/60 focus:placeholder-transparent" 
                      placeholder="Quick note (anything we should know before your visit?)"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center text-center py-20"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center mb-8 relative"
              >
                <img 
                  src="https://api.iconify.design/ph:tooth-light.svg?color=%23384BF8" 
                  alt="Tooth Icon" 
                  className="w-12 h-12"
                />
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="absolute -bottom-1 -right-1 bg-white rounded-full p-1"
                >
                  <div className="bg-brand-accent text-white rounded-full p-1">
                    <Check size={16} strokeWidth={3} className="text-white" />
                  </div>
                </motion.div>
              </motion.div>
              
              <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight mb-6 text-brand-ink">
                Appointment <span className="italic text-brand-accent">Confirmed.</span>
              </h2>
              
              <p className="text-brand-ink/70 text-lg max-w-md mb-12 leading-relaxed">
                Thank you, {formData.name || 'guest'}. We've sent a confirmation email with your appointment details. We look forward to seeing you.
              </p>

              <div className="bg-brand-ink/5 border border-brand-ink/10 rounded-2xl p-8 w-full max-w-md text-left mb-12">
                <div className="flex justify-between border-b border-brand-ink/10 pb-4 mb-4">
                  <span className="text-brand-ink/50 text-sm">Service</span>
                  <span className="text-brand-ink font-medium text-sm">{services.find(s => s.id === selectedService)?.title}</span>
                </div>
                <div className="flex justify-between border-b border-brand-ink/10 pb-4 mb-4">
                  <span className="text-brand-ink/50 text-sm">Date</span>
                  <span className="text-brand-ink font-medium text-sm">{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-ink/50 text-sm">Time</span>
                  <span className="text-brand-ink font-medium text-sm">{selectedTime}</span>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="bg-brand-accent text-white px-8 py-3.5 md:px-10 md:py-4 rounded-full text-[11px] md:text-[13px] font-medium tracking-[0.1em] uppercase hover:bg-brand-accent/90 transition-colors"
              >
                Return to Home
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Actions */}
        {step < 4 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 flex justify-end"
          >
            <button 
              onClick={nextStep}
              disabled={!isStepValid()}
              className={`px-8 py-3.5 md:px-10 md:py-4 rounded-full text-[11px] md:text-[13px] font-medium tracking-[0.1em] uppercase flex items-center gap-2 md:gap-3 transition-all ${
                isStepValid() 
                  ? 'bg-brand-accent text-white hover:bg-brand-accent/90 cursor-pointer shadow-md hover:scale-105 active:scale-95' 
                  : 'bg-brand-ink/10 text-brand-ink/50 cursor-not-allowed'
              }`}
            >
              {step === 3 ? 'Confirm Booking' : 'Continue'}
              <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={1.5} />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
