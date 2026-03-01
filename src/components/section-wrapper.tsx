import React from 'react';
import { THEME } from '@/lib/constants';

type SectionWrapperProps = {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  color?: string;
};

const SectionWrapper = ({ children, title, subtitle, color = THEME.green }: SectionWrapperProps) => (
  <div className="max-w-6xl mx-auto px-4 py-8 relative z-10 animate-fadeIn">
    <div className="mb-12 border-b border-opacity-20 border-white pb-6">
      <h2 className="flex flex-col gap-2 md:gap-4">
        <span className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase font-headline">
          {title}
        </span>
        <span className="text-2xl md:text-3xl font-mono md:opacity-80 transition-all font-bold" style={{ color }}>
          // {subtitle}
        </span>
      </h2>
    </div>
    {children}
  </div>
);

export default SectionWrapper;
