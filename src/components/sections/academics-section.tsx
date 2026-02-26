import React from 'react';
import SectionWrapper from '@/components/section-wrapper';
import { ALIENS } from '@/lib/constants';
import { BookOpen, ShieldHalf, Trophy, Brain } from 'lucide-react';

const AcademicsSection = () => {
    const modeColor = '#ffaa00';

    return (
        <SectionWrapper title="Academics" subtitle="Intellect & Analysis Protocol" color={ALIENS.ACADEMICS.color}>
            <div className="grid md:grid-cols-2 gap-8 pt-4">
                {/* Research & Achievements */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3 scroll-animate" style={{ animationDelay: '0.1s' }}>
                        <BookOpen style={{ color: modeColor }} /> Research Publications
                    </h3>
                    <div className="bg-black/50 border-l-4 p-6 rounded-sm hover:bg-white/5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,170,0,0.1)] scroll-animate" style={{ borderColor: modeColor, animationDelay: '0.2s' }}>
                        <h4 className="text-xl font-bold text-white mb-2">Sentiment Analysis of Drug Reviews</h4>
                        <p className="text-gray-400 text-sm mb-4">
                            Comparative study of transformer models (BERT, XLNet, BigBird) vs traditional ML on UCI Drug Review dataset.
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs font-mono" style={{ color: modeColor }}>
                            <span>TRANSFORMERS</span>
                            <span>NLP</span>
                            <span>PYTHON</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-500">
                            Presented at Int. Conf. on Innovations in Science & Technology (2024-2025)
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white flex items-center gap-3 mt-8 scroll-animate" style={{ animationDelay: '0.3s' }}>
                        <ShieldHalf style={{ color: modeColor }} /> Achievements
                    </h3>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-4 p-4 bg-black/50 border border-white/10 rounded-sm hover:bg-white/5 transition-all duration-300 transform hover:-translate-y-1 hover:border-amber-500/50 scroll-animate" style={{ animationDelay: '0.4s' }}>
                            <Trophy className="shrink-0 mt-1" style={{ color: modeColor }} />
                            <div>
                                <strong className="text-white block">UGC-NET JRF (Dec 2024)</strong>
                                <span className="text-gray-400 text-sm">99.36 Percentile. Qualified for Assistant Professor.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-4 p-4 bg-black/50 border border-white/10 rounded-sm hover:bg-white/5 transition-all duration-300 transform hover:-translate-y-1 hover:border-amber-500/50 scroll-animate" style={{ animationDelay: '0.5s' }}>
                            <Trophy className="shrink-0 mt-1" style={{ color: modeColor }} />
                            <div>
                                <strong className="text-white block">ACM Winter School 2024 Winner</strong>
                                <span className="text-gray-400 text-sm">Amrita University.</span>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Education */}
                <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3 scroll-animate" style={{ animationDelay: '0.1s' }}>
                        <Brain style={{ color: modeColor }} /> Academic Database
                    </h3>

                    <div className="flex flex-col gap-6">
                        <div className="p-8 rounded-2xl border transition-all duration-300 hover:border-amber-500/50 hover:shadow-[0_10px_20px_rgba(255,170,0,0.1)] transform hover:-translate-y-1 scroll-animate" style={{ backgroundColor: `${modeColor}1A`, borderColor: `${modeColor}33`, animationDelay: '0.15s' }}>
                            <h4 className="text-xl font-bold text-white">PhD in Computer Science And Engineering, IIT Patna</h4>
                            <p className="font-mono text-sm mb-2" style={{ color: modeColor }}>2025 - Present</p>
                            <p className="text-gray-400 mt-2 mb-3 leading-relaxed">Aiming for top-tier research in System-Level AI.</p>
                        </div>

                        <div className="p-8 rounded-2xl border transition-all duration-300 hover:border-amber-500/50 hover:shadow-[0_10px_20px_rgba(255,170,0,0.1)] transform hover:-translate-y-1 scroll-animate" style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderColor: `${modeColor}33`, animationDelay: '0.2s' }}>
                            <h4 className="text-xl font-bold text-white mb-2">Masters in Computer Science at MIT Manipal-IMSc Chennai</h4>
                            <p className="font-mono text-sm mb-2" style={{ color: modeColor }}>2023 - 2025</p>
                            <p className="text-gray-400 mt-2 mb-3 leading-relaxed">Joint Program. Graduated with 9.03 GPA.</p>
                        </div>

                        <div className="p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,255,255,0.05)] scroll-animate" style={{ animationDelay: '0.3s' }}>
                            <h4 className="text-xl font-bold text-white mb-2">B.Sc. (Hons) Computer Science</h4>
                            <p className="font-mono text-sm mb-2 text-gray-500">2020 - 2023</p>
                            <p className="text-gray-400 mt-2 mb-4 leading-relaxed">Deen Dayal Upadhyaya College</p>
                            <div className="inline-block self-start px-3 py-1 bg-gray-800 text-gray-300 rounded text-sm">
                                GPA: 9.28 / 10 (College Topper)
                            </div>
                        </div>

                        <div className="p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,255,255,0.05)] scroll-animate" style={{ animationDelay: '0.4s' }}>
                            <h4 className="text-xl font-bold text-white mb-2">Class 12th</h4>
                            <p className="font-mono text-sm mb-2 text-gray-500">2019</p>
                            <p className="text-gray-400 mt-2 mb-4 leading-relaxed">Kendriya Vidyalaya (Zonal Topper)</p>
                            <div className="inline-block self-start px-3 py-1 bg-gray-800 text-gray-300 rounded text-sm">
                                92.8%
                            </div>
                        </div>

                        <div className="p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,255,255,0.05)] scroll-animate" style={{ animationDelay: '0.5s' }}>
                            <h4 className="text-xl font-bold text-white mb-2">Class 10th</h4>
                            <p className="font-mono text-sm mb-2 text-gray-500">2017</p>
                            <p className="text-gray-400 mt-2 mb-4 leading-relaxed">Kendriya Vidyalaya, Chakradharpur (Topper)</p>
                            <div className="inline-block self-start px-3 py-1 bg-gray-800 text-gray-300 rounded text-sm">
                                10 CGPA
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-2xl bg-gradient-to-br border scroll-animate mt-6" style={{
                        backgroundColor: `${modeColor}1A`,
                        borderColor: `${modeColor}33`,
                        animationDelay: '0.6s'
                    }}>
                        <h4 className="font-bold mb-2 uppercase tracking-widest text-sm" style={{ color: modeColor }}>Research Interests</h4>
                        <div className="flex flex-wrap gap-2">
                            {['Theoretical CS', 'Machine Learning', 'Distributed Systems', 'Compilers'].map(tag => (
                                <span key={tag} className="px-2 py-1 bg-black/50 text-white text-xs rounded border" style={{ borderColor: `${modeColor}4D` }}>{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default AcademicsSection;
