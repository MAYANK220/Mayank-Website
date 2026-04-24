'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EndingOverlay() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowOverlay(true);
          document.body.style.overflow = 'hidden';
        }
      },
      { 
        root: null,
        rootMargin: '0px',
        threshold: 1.0 
      }
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => {
      observer.disconnect();
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (showOverlay) {
      const timer = setTimeout(() => setShowButton(true), 2000);
      return () => clearTimeout(timer);
    } else {
      setShowButton(false);
    }
  }, [showOverlay]);

  const handleGoBack = () => {
    document.body.style.overflow = '';
    setShowOverlay(false);
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <div ref={triggerRef} className="w-full h-[1px] opacity-0" />

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          >
            {/* Animated Background */}
            <motion.div 
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] via-indigo-950/20 to-purple-950/20 bg-[length:200%_200%] opacity-80"
            />
            
            {/* Soft Glow Center */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                className="text-5xl md:text-7xl font-light tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] leading-relaxed py-2"
              >
                अंतः अस्ति प्रारंभः
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.5 }}
                className="text-sm md:text-base text-neutral-500 uppercase tracking-[0.4em] font-medium"
              >
                The end is the beginning.
              </motion.p>

              <AnimatePresence>
                {showButton && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    onClick={handleGoBack}
                    className="mt-16 px-10 py-3 text-xs md:text-sm tracking-[0.2em] uppercase text-neutral-300 border border-white/10 rounded-full bg-white/5 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(120,119,198,0.3)] hover:scale-105 backdrop-blur-sm"
                  >
                    Go Back
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
