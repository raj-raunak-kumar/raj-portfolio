import { HeartPulse, Brain, Cpu, Zap, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const THEME = {
    green: '#39ff14',
    darkGreen: '#006400',
    black: '#050505',
    glass: 'rgba(57, 255, 20, 0.05)',
    glassBorder: 'rgba(57, 255, 20, 0.2)',
    text: '#e0e0e0'
};

export interface Alien {
    id: string;
    label: string;
    color: string;
    icon: LucideIcon;
}

export const ALIENS: { [key: string]: Alien } = {
    HUMAN: { id: 'HUMAN', label: 'HOME', color: '#ffffff', icon: HeartPulse },
    ACADEMICS: { id: 'ACADEMICS', label: 'ACADEMICS', color: '#ffaa00', icon: Brain },
    TECH_SKILLS: { id: 'TECH_SKILLS', label: 'TECH SKILLS', color: '#39ff14', icon: Cpu },
    TIMELINE: { id: 'TIMELINE', label: 'TIMELINE', color: '#00ccff', icon: Zap },
    CONTACT: { id: 'CONTACT', label: 'CONTACT', color: '#ff3300', icon: Mail }
};
