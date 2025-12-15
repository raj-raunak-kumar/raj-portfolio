import React from 'react';
import SectionWrapper from '@/components/section-wrapper';

const TimelineSection = () => {
    const modeColor = '#00ccff';

    const timelineItems = [
        { year: '2025', title: 'PhD Aspirant', desc: 'Aiming for top-tier research in System-Level AI.', side: 'left' },
        { year: '2024', title: 'UGC-NET JRF', desc: 'Qualified with 99.36 percentile.', side: 'right' },
        { year: '2023-2025', title: 'Masters at MIT Manipal', desc: 'Graduated from Manipal Institute of Technology with 9.03 gpa', side: 'left' },
        { year: '2020-2023', title: 'B.Sc. (Hons) Computer Science', desc: 'Graduated from Deen Dayal Upadhyaya College as College Topper (8.77 GPA).', side: 'right' },
        { year: '2019', title: 'Class 12th', desc: 'Kendriya Vidyalaya, Zonal Topper (92.8%).', side: 'left' },
        { year: '2017', title: 'Class 10th', desc: 'Kendriya Vidyalaya, Chakradharpur Topper (10 CGPA).', side: 'right' }
    ];

    return (
        <SectionWrapper title="Timeline" subtitle="Velocity & Timeline">
            <div className="relative py-10">
                <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-gradient-to-b from-[#00ccff] to-transparent"></div>
                
                {timelineItems.map((item, index) => (
                    <div key={index} className={`flex items-center w-full mb-12 flex-row scroll-animate ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`} style={{animationDelay: `${index * 150}ms`}}>
                        <div className="w-5/12"></div>
                        <div className="w-2/12 flex justify-center relative">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: modeColor, boxShadow: `0 0 15px ${modeColor}` }}></div>
                        </div>
                        <div className="w-5/12">
                            <div className={`p-6 bg-black/60 border rounded-xl hover:bg-opacity-10 transition-all duration-300 w-full transform hover:scale-105 hover:shadow-[0_0_20px_rgba(0,204,255,0.2)] ${item.side === 'left' ? 'md:text-right' : 'md:text-left'}`} style={{ borderColor: `${modeColor}4D`, background: `rgba(0, 204, 255, 0.05)` }}>
                                <h3 className="text-2xl font-bold font-mono" style={{ color: modeColor }}>{item.year}</h3>
                                <h4 className="text-white text-lg font-bold">{item.title}</h4>
                                <p className="text-gray-400 text-sm mt-2">{item.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
};

export default TimelineSection;
