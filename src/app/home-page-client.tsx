"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ALIENS, Alien } from '@/lib/constants';
import EnergyBackground from '@/components/energy-background';
import { ChatbotWidget } from '@/components/chatbot-widget';
import HeroSection from '@/components/sections/hero-section';
import AcademicsSection from '@/components/sections/academics-section';
import TechSection from '@/components/sections/tech-section';
import TimelineSection from '@/components/sections/timeline-section';
import ContactSection from '@/components/sections/contact-section';

const UptimeDisplay = () => {
    const [uptime, setUptime] = useState(0);

    useEffect(() => {
        const startTimestamp = Math.floor(Date.now() / 1000);
        const intervalId = setInterval(() => {
            setUptime(Math.floor(Date.now() / 1000) - startTimestamp);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    if (uptime === 0) {
        return <span>UPTIME: ...</span>;
    }
    
    return <span>UPTIME: {uptime}</span>;
}

export default function HomePageClient() {
  const [mode, setMode] = useState<Alien>(ALIENS.HUMAN);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animate-visible');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const elements = mainRef.current?.querySelectorAll('.scroll-animate');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, [mode]);

  const handleModeChange = (newMode: Alien) => {
    if (newMode.id === mode.id && newMode.id !== 'HUMAN') {
      setIsMenuOpen(false);
      return;
    }
    setIsMenuOpen(false);
    setMode(newMode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (mode.id) {
      case 'ACADEMICS':
        return <AcademicsSection />;
      case 'TECH_SKILLS':
        return <TechSection />;
      case 'TIMELINE':
        return <TimelineSection />;
      case 'CONTACT':
        return <ContactSection />;
      default:
        return <HeroSection onTransformClick={() => setIsMenuOpen(true)} />;
    }
  };
  
  const showHeader = mode.id !== 'HUMAN';
  const CurrentIcon = mode.icon;

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans overflow-x-hidden">
      <EnergyBackground activeColor={mode.color} />

      {showHeader ? (
        <div 
          className={`fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 transition-all duration-300 ${isScrolled ? 'bg-black/50 backdrop-blur-sm py-3' : ''}`}
        >
          <div className="flex items-center gap-3">
            <div 
              className={`w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center bg-black/50 backdrop-blur transition-all duration-300 ${isScrolled ? 'w-8 h-8' : ''}`}
            >
               <CurrentIcon className={`text-lg ${isScrolled ? 'text-base' : ''}`} style={{ color: mode.color }}/>
            </div>
            <div className="flex flex-col">
              <span className={`text-xs font-bold text-gray-500 tracking-widest transition-all duration-300 ${isScrolled ? 'hidden' : ''}`}>CURRENT PAGE</span>
              <span 
                className={`font-headline font-bold tracking-wider transition-all duration-300 ${isScrolled ? 'text-lg' : 'text-xl'}`} 
                style={{ color: mode.color }}
              >
                {mode.label}
              </span>
            </div>
          </div>

          <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="pointer-events-auto px-6 py-2 bg-black/50 backdrop-blur border border-white/20 text-white rounded hover:bg-black/70 hover:border-primary transition-all font-bold tracking-widest uppercase text-sm hover:shadow-[0_0_15px_rgba(57,255,20,0.5)]"
          >
              {isMenuOpen ? 'CLOSE OMNITRIX' : 'MAIN MENU'}
          </button>
        </div>
      ) : (
        <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto opacity-0">
            <div className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center bg-black/50 backdrop-blur">
               <CurrentIcon className="text-lg" style={{ color: mode.color }} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-500 tracking-widest">CURRENT PAGE</span>
              <span className="font-headline text-xl font-bold tracking-wider" style={{ color: mode.color }}>{mode.label}</span>
            </div>
          </div>

          {isMounted && mode.id === 'HUMAN' && (
             <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="pointer-events-auto px-6 py-2 bg-black/50 backdrop-blur border border-white/20 text-white rounded hover:bg-black/70 hover:border-primary transition-all font-bold tracking-widest uppercase text-sm hover:shadow-[0_0_15px_rgba(57,255,20,0.5)] animate-fadeIn"
                style={{ animationDelay: '0.5s' }}
            >
                MAIN MENU
            </button>
          )}
        </div>
      )}

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center animate-fadeIn">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto p-4">
             {Object.values(ALIENS).map((alien) => {
                const Icon = alien.icon;
                return (
                   <button
                     key={alien.id}
                     onClick={() => handleModeChange(alien)}
                     className="group flex flex-col items-center gap-4 p-6 rounded-xl border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all duration-300"
                   >
                     <div 
                       className="w-20 h-20 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300"
                       style={{ backgroundColor: alien.color, boxShadow: `0 0 20px ${alien.color}40` }}
                     >
                       <Icon className="text-black text-2xl" />
                     </div>
                     <span className="font-headline font-bold tracking-widest text-sm text-gray-400 group-hover:text-white">
                       {alien.label}
                     </span>
                   </button>
                );
             })}
          </div>
          <p className="mt-12 text-gray-500 font-mono text-sm">SELECT A DNA SAMPLE TO TRANSFORM</p>
        </div>
      )}

      <main ref={mainRef} className="relative pt-32 pb-20 min-h-screen flex flex-col">
         {isMounted && renderContent()}
      </main>

      <div className="fixed bottom-8 left-8 text-[10px] font-mono text-gray-600 hidden md:block z-0 pointer-events-none">
        <div className="flex flex-col gap-1">
          <span>SYS.VER: 2.0.5</span>
          {isMounted && <UptimeDisplay />}
          <span>MEM: OPTIMAL</span>
        </div>
      </div>
      <div className="fixed bottom-8 right-8 w-32 h-1 bg-gray-800 rounded overflow-hidden hidden md:block z-0 pointer-events-none">
         <div className="h-full bg-white/20 animate-pulse w-2/3"></div>
      </div>
      <ChatbotWidget />
    </div>
  );
}
