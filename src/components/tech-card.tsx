import React from 'react';
import { Server, Code, Globe } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type IconName = "Code" | "Globe" | "Server";

const icons: Record<IconName, LucideIcon> = {
    Code,
    Globe,
    Server,
};

type TechCardProps = {
    title: string;
    items: string[];
    iconName: IconName;
    description?: string; // Added description to props
};

const TechCard = ({ title, items, iconName, description }: TechCardProps) => { // Added description to destructuring
    const Icon = icons[iconName];
    return (
        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 aspect-square flex flex-col justify-center rounded-2xl hover:border-[#39ff14] transition-all group duration-300 hover:shadow-[0_0_20px_rgba(57,255,20,0.1)] transform hover:-translate-y-1 scroll-animate">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded bg-[#39ff14]/10 text-[#39ff14]">
                    <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-headline font-bold text-xl tracking-wider">{title}</h3>
            </div>
            {description && <p className="text-gray-400 text-sm mb-6 leading-relaxed bg-clip-text font-medium">{description}</p>}
            <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                    <span key={item} className="px-3 py-1 text-sm border border-white/20 rounded-full text-gray-300 hover:text-[#39ff14] hover:border-[#39ff14] transition-colors cursor-default">
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default TechCard;
