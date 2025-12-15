import React from 'react';
import { THEME } from '@/lib/constants';

type SectionWrapperProps = {
  children: React.ReactNode;
  title: string;
  subtitle: string;
};

const SectionWrapper = ({ children, title, subtitle }: SectionWrapperProps) => (
  <div className="max-w-6xl mx-auto px-4 py-8 relative z-10 animate-fadeIn">
    <div className="mb-12 border-b border-opacity-20 border-white pb-4 scroll-animate">
      <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-2 font-headline">
        {title}
      </h2>
      <p className="text-lg md:text-xl font-mono opacity-80" style={{ color: THEME.green }}>
        // {subtitle}
      </p>
    </div>
    {children}
  </div>
);

export default SectionWrapper;
