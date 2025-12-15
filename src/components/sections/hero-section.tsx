import React from 'react';

type HeroSectionProps = {
    onTransformClick: () => void;
}

const OmnitrixIcon = () => (
    <div className="w-48 h-48 rounded-full border-4 border-gray-800 bg-black relative flex items-center justify-center shadow-[0_0_50px_rgba(57,255,20,0.3)] group-hover:shadow-[0_0_80px_rgba(57,255,20,0.6)] transition-all duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#003300_0%,#000000_70%)]"></div>
        
        {/* The Hourglass Shape */}
        <div className="relative z-10 w-24 h-36 bg-[#39ff14] opacity-90 blur-sm animate-pulse" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 50%, 100% 100%, 0 100%, 20% 50%)' }}></div>
        <div className="absolute z-10 w-24 h-36 border-4 border-[#39ff14]" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 50%, 100% 100%, 0 100%, 20% 50%)' }}></div>
        
        {/* Spinning Rings */}
        <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#39ff14]/30 animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute inset-6 rounded-full border border-[#39ff14]/20 animate-[spin_5s_linear_infinite_reverse]"></div>
    </div>
);

const HeroSection = ({ onTransformClick }: HeroSectionProps) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 relative z-10 animate-fadeIn">
      <div className="mb-6 relative group cursor-pointer flex flex-col items-center" onClick={onTransformClick}>
        <OmnitrixIcon />
        <div className="mt-6 text-[#39ff14] font-mono text-sm tracking-[0.5em] animate-pulse">CLICK TO TRANSFORM</div>
      </div>

      <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4 font-headline">
        RAJ RAUNAK KUMAR
      </h1>
      <p 
        className="text-xl md:text-2xl font-light max-w-2xl mx-auto"
        style={{
          color: '#39ff14',
          textShadow: '0 0 8px rgba(57, 255, 20, 0.7)',
        }}
      >
        PhD Scholar, School of Information Technology, IIT Delhi
      </p>
    </div>
  );
};

export default HeroSection;
