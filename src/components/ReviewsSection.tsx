import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const reviews = [
  { id: 1, name: "Eleanor V.", text: "An absolute masterclass in dental care. The porcelain veneers completely transformed my confidence. The clinic feels like a five-star hotel." },
  { id: 2, name: "James C.", text: "I've never experienced such meticulous attention to detail. Dr. Smith and the team are true artists. My full mouth rehab was painless and perfect." },
  { id: 3, name: "Sophia M.", text: "From the ambient lighting to the personalized care, every moment was exceptional. My Invisalign journey was seamless." },
  { id: 4, name: "William T.", text: "They redefined what a visit to the dentist means. No anxiety, just pure professionalism and stunning results." },
  { id: 5, name: "Olivia R.", text: "The transparency and care of the staff is unmatched. Truly a luxury experience from the moment you walk in." },
  { id: 6, name: "Benjamin K.", text: "I flew in from out of state just to have my restorative work done here. Worth every mile. The precision is world-class." },
  { id: 7, name: "Charlotte H.", text: "Clove Dental doesn't just fix teeth; they craft smiles. The aesthetic eye of the team is beyond anything I've seen." },
  { id: 8, name: "Henry L.", text: "State-of-the-art technology meets genuine empathy. I felt completely at ease during my implant procedure." },
  { id: 9, name: "Amelia D.", text: "The whitening treatment was quick, painless, and the results are dazzling. The clinic's atmosphere is incredibly soothing." },
  { id: 10, name: "Lucas P.", text: "I was always self-conscious about my smile until I visited Clove. The bespoke approach they take is truly remarkable." },
  { id: 11, name: "Mia S.", text: "Every detail is curated for patient comfort. The results of my contouring are subtle yet profoundly impactful." },
  { id: 12, name: "Alexander W.", text: "Professional, punctual, and perfectionists. The best dental investment I have ever made." },
  { id: 13, name: "Isabella G.", text: "They listened to exactly what I wanted and delivered beyond my expectations. My veneers look incredibly natural." },
  { id: 14, name: "Ethan B.", text: "A paradigm shift in dentistry. The environment is serene, and the clinical outcomes are flawless." },
  { id: 15, name: "Ava N.", text: "I actually look forward to my appointments now. The level of luxury and care is simply unprecedented." },
  { id: 16, name: "Noah J.", text: "The consultation alone was more thorough than any dental exam I've ever had. The execution was even better." },
  { id: 17, name: "Grace F.", text: "I cannot stop smiling. The team here gave me back my confidence with their incredible restorative work." },
  { id: 18, name: "Liam D.", text: "Impeccable service. The staff anticipates your needs before you even realize them. A truly premium clinic." },
  { id: 19, name: "Chloe T.", text: "My ceramic implants feel and look exactly like natural teeth. The surgical precision is awe-inspiring." },
  { id: 20, name: "Sebastian M.", text: "Clove Dental sets the gold standard. I wouldn't trust my smile to anyone else after experiencing their care." }
];

const row1 = reviews.slice(0, 10);
const row2 = reviews.slice(10, 20);

const ReviewCard: React.FC<{ review: typeof reviews[0] }> = ({ review }) => (
  <div className="w-[85vw] max-w-[320px] md:max-w-none md:w-[420px] flex flex-col flex-shrink-0 p-5 md:p-8 rounded-2xl bg-white border border-brand-ink/10 hover:bg-white hover:border-brand-ink/20 hover:shadow-lg transition-all duration-500 group">
    <div className="flex gap-1 mb-3 md:mb-6">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className="fill-brand-accent text-brand-accent opacity-80 group-hover:opacity-100 transition-opacity" />
      ))}
    </div>
    <p className="font-serif text-sm md:text-xl text-brand-ink/80 leading-relaxed mb-4 md:mb-8 group-hover:text-brand-ink transition-colors flex-grow">
      "{review.text}"
    </p>
    <div className="flex items-center gap-3 md:gap-4 mt-auto">
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-brand-accent/20 to-transparent border border-brand-accent/30 flex items-center justify-center flex-shrink-0">
        <span className="font-serif text-brand-accent text-xs md:text-sm">{review.name.charAt(0)}</span>
      </div>
      <div className="flex flex-col justify-center">
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-brand-ink/70 leading-none mb-1">{review.name}</span>
        <span className="text-[8px] md:text-[10px] text-brand-ink/40 uppercase tracking-wider leading-none">Verified Patient</span>
      </div>
    </div>
  </div>
);

export default function ReviewsSection() {
  return (
    <section className="relative w-full bg-brand-ink py-32 overflow-hidden">
      {/* Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-brand-accent/10 rounded-[100%] blur-[120px] pointer-events-none opacity-50" />
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-20 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-[1px] w-8 bg-brand-accent"></div>
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-brand-accent">
              Words of Affirmation
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
            Stories of <span className="italic text-white/90">transformation.</span>
          </motion.h2>
        </div>
      </div>

      {/* Marquee Container with Fade Edges */}
      <div 
        className="relative w-full flex flex-col gap-4 md:gap-8 z-10" 
        style={{ 
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', 
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' 
        }}
      >
        
        <style>{`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scroll-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-scroll-left {
            animation: scroll-left 60s linear infinite;
          }
          .animate-scroll-right {
            animation: scroll-right 60s linear infinite;
          }
          .marquee-container:hover .animate-scroll-left,
          .marquee-container:hover .animate-scroll-right {
            animation-play-state: paused;
          }
        `}</style>

        {/* Row 1: Scrolls Left */}
        <div className="marquee-container flex overflow-hidden">
          <div className="flex w-max animate-scroll-left">
            <div className="flex gap-4 md:gap-8 pr-4 md:pr-8">
              {row1.map(review => <ReviewCard key={review.id} review={review} />)}
            </div>
            <div className="flex gap-4 md:gap-8 pr-4 md:pr-8" aria-hidden="true">
              {row1.map(review => <ReviewCard key={`${review.id}-dup`} review={review} />)}
            </div>
          </div>
        </div>

        {/* Row 2: Scrolls Right */}
        <div className="marquee-container flex overflow-hidden">
          <div className="flex w-max animate-scroll-right">
            <div className="flex gap-4 md:gap-8 pr-4 md:pr-8">
              {row2.map(review => <ReviewCard key={review.id} review={review} />)}
            </div>
            <div className="flex gap-4 md:gap-8 pr-4 md:pr-8" aria-hidden="true">
              {row2.map(review => <ReviewCard key={`${review.id}-dup`} review={review} />)}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
