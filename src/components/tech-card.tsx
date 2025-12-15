import React from 'react';
import { Code, Globe, Server, Icon as LucideIcon } from 'lucide-react';

type IconName = "Code" | "Globe" | "Server";

const icons: { [key in IconName]: LucideIcon } = {
    Code,
    Globe,
    Server,
};

type TechCardProps = {
    title: string;
    items: string[];
    iconName: IconName;
};

const TechCard = ({ title, items, iconName }: TechCardProps) => {
    const Icon = icons[iconName];
    return (
        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-[#39ff14] transition-all group duration-300 hover:shadow-[0_0_20px_rgba(57,255,20,0.1)] transform hover:-translate-y-1 scroll-animate">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded bg-[#39ff14]/10 text-[#39ff14]">
                    <Icon className="text-xl" />
                </div>
                <h3 className="text-xl font-bold text-white font-mono">{title}</h3>
            </div>
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
