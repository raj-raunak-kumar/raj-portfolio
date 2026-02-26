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
import Link from 'next/link';

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
  const [isOutfitFont, setIsOutfitFont] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);



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

  const isHero = mode.id === 'HUMAN';

  return (
    <div className={`${isHero ? 'h-screen overflow-hidden' : 'min-h-screen overflow-x-hidden'} bg-[#050505] text-gray-200 font-sans`}>
      <EnergyBackground activeColor={mode.color} />

      {showHeader ? (
        <div
          className="absolute top-0 left-0 w-full p-6 hidden md:flex justify-between items-center z-50 pointer-events-none"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center bg-black/50 backdrop-blur pointer-events-auto"
            >
              <CurrentIcon className="text-lg" style={{ color: mode.color }} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-500 tracking-widest pointer-events-auto">CURRENT PAGE</span>
              <span
                className="font-headline font-bold tracking-wider text-xl pointer-events-auto"
                style={{ color: mode.color }}
              >
                {mode.label}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="pointer-events-auto px-6 py-2 bg-black/50 backdrop-blur border border-[#39ff14]/50 text-[#39ff14] rounded hover:bg-[#39ff14]/20 transition-all font-bold tracking-widest uppercase text-sm hover:shadow-[0_0_15px_rgba(57,255,20,0.5)]"
            >
              RESEARCH
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="pointer-events-auto px-6 py-2 bg-black/50 backdrop-blur border border-white/20 text-white rounded hover:bg-black/70 hover:border-primary transition-all font-bold tracking-widest uppercase text-sm hover:shadow-[0_0_15px_rgba(57,255,20,0.5)]"
            >
              {isMenuOpen ? 'CLOSE KRYTHOS' : 'MAIN MENU'}
            </button>
          </div>
        </div>
      ) : (
        <div className="fixed top-0 left-0 w-full p-6 hidden md:flex justify-between items-center z-50 pointer-events-none">
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
            <div className="flex items-center gap-3">
              <Link
                href="/blog"
                className="pointer-events-auto px-6 py-2 bg-black/50 backdrop-blur border border-[#39ff14]/50 text-[#39ff14] rounded hover:bg-[#39ff14]/20 transition-all font-bold tracking-widest uppercase text-sm hover:shadow-[0_0_15px_rgba(57,255,20,0.5)] animate-fadeIn"
                style={{ animationDelay: '0.5s' }}
              >
                RESEARCH
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="pointer-events-auto px-6 py-2 bg-black/50 backdrop-blur border border-white/20 text-white rounded hover:bg-black/70 hover:border-primary transition-all font-bold tracking-widest uppercase text-sm hover:shadow-[0_0_15px_rgba(57,255,20,0.5)] animate-fadeIn"
                style={{ animationDelay: '0.5s' }}
              >
                MAIN MENU
              </button>
            </div>
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

      {/* Mobile-Only Research/Blog Link */}
      <div className="fixed top-6 right-6 z-40 md:hidden pointer-events-none">
        <Link
          href="/blog"
          className="pointer-events-auto px-4 py-1.5 bg-black/60 backdrop-blur border border-[#39ff14]/50 text-[#39ff14] rounded-full hover:bg-[#39ff14]/20 transition-all font-bold tracking-widest uppercase text-[10px] shadow-[0_0_10px_rgba(57,255,20,0.3)]"
        >
          RESEARCH
        </Link>
      </div>

      <main ref={mainRef} className={`relative block ${isHero ? 'h-full flex-col overflow-hidden pt-4 md:pt-32 pb-10' : 'min-h-screen pt-8 md:pt-32 pb-10'}`}>
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

      {/* Mobile Bottom Navigation Bar (Material Design Inspired) */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-black/95 backdrop-blur-md border-t border-white/10 flex items-center justify-around px-2 z-50 md:hidden pb-[env(safe-area-inset-bottom)]">
        {Object.values(ALIENS).map((alien) => {
          const NavIcon = alien.icon;
          const isActive = mode.id === alien.id;
          return (
            <button
              key={alien.id}
              onClick={() => handleModeChange(alien)}
              className="flex flex-col items-center justify-center w-16 h-full transition-all duration-300 relative group"
            >
              {/* Active Indicator Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-${alien.color}/20 to-transparent transition-opacity duration-300 rounded-t-lg ${isActive ? 'opacity-100' : 'opacity-0'}`}
                style={isActive ? { backgroundImage: `linear-gradient(to top, ${alien.color}33, transparent)` } : {}}
              />

              <div
                className={`relative z-10 p-1.5 rounded-full transition-all duration-300 ${isActive ? 'scale-110 -translate-y-1' : 'group-hover:bg-white/5'}`}
                style={isActive ? { backgroundColor: `${alien.color}22`, boxShadow: `0 0 10px ${alien.color}40`, color: alien.color } : { color: '#9CA3AF' }}
              >
                <NavIcon className="text-xl" />
              </div>
              <span
                className={`text-[9px] font-bold tracking-wider mt-1 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}
                style={isActive ? { color: alien.color } : { color: '#9CA3AF' }}
              >
                {alien.id === 'HUMAN' ? 'HOME' : alien.label.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      <ChatbotWidget />
    </div>
  );
}
