"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { BlogPost } from '@/lib/types';
import { Calendar, ChevronRight, FileText, ArrowLeft } from 'lucide-react';

export default function BlogIndexPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const q = query(collection(db, "blogs"), orderBy("date", "desc"));

                // Set a 5-second timeout because Firebase hangs silently on strict rules/missing indices
                const timeoutPromise = new Promise((_, reject) => {
                    setTimeout(() => reject(new Error("Connection to the server timed out. Check permission rules or connection.")), 5000);
                });

                const querySnapshot = await Promise.race([
                    getDocs(q),
                    timeoutPromise
                ]) as any;

                const postsData = querySnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() } as BlogPost));
                setPosts(postsData);
            } catch (err: any) {
                console.error("Error fetching blogs:", err);
                setError(err.message || "Failed to load archives.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-black pt-32 pb-20 relative px-4">
            {/* Background Elements */}
            <div className="fixed inset-0 bg-[#39ff14]/5 cyber-grid pointer-events-none z-0" />
            <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[#39ff14]/5 to-transparent pointer-events-none z-0" />

            <div className="max-w-4xl mx-auto relative z-10">
                <header className="mb-16 border-b border-[#39ff14]/20 pb-8">
                    <Link href="/" className="inline-flex items-center text-[#39ff14] hover:text-white font-mono text-sm tracking-widest mb-8 transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-2 transition-transform" /> BACK TO HOME
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-headline font-black text-white tracking-tighter uppercase mb-4 flex items-center gap-4">
                        <FileText className="w-12 h-12 text-[#39ff14]" /> RESEARCH LOGS
                    </h1>
                    <p className="text-xl font-mono text-[#39ff14] opacity-80 pl-16">
                        // Personal notes, technical deep-dives, and academic archives.
                    </p>
                </header>

                {loading ? (
                    <div className="flex items-center justify-center p-20 text-[#39ff14] font-mono">
                        <div className="animate-spin w-8 h-8 flex border-2 border-t-[#39ff14] border-black rounded-full mr-3" />
                        DOWNLOADING ARCHIVES...
                    </div>
                ) : error ? (
                    <div className="text-center p-20 border border-dashed border-red-500/30 rounded-2xl bg-black/50 backdrop-blur">
                        <p className="font-mono text-red-500 tracking-widest uppercase mb-4">
                            [ ERROR: {error} ]
                        </p>
                        <p className="font-mono text-gray-500 text-sm">
                            Access Denied or Connection Timeout. Please verify Firebase Firestore Rules and Indices.
                        </p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center p-20 border border-dashed border-[#39ff14]/30 rounded-2xl bg-black/50 backdrop-blur">
                        <p className="font-mono text-gray-500 uppercase tracking-widest">
                            [ NO RECORDS FOUND IN ARCHIVE ]
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-8">
                        {posts.map((post) => (
                            <Link
                                href={`/blog/${post.id}`}
                                key={post.id}
                                className="group block bg-black/60 backdrop-blur border border-[#39ff14]/20 rounded-xl overflow-hidden hover:border-[#39ff14] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(57,255,20,0.1)]"
                            >
                                <div className="p-8">
                                    <div className="flex items-center gap-3 text-[#39ff14] font-mono text-xs mb-4 uppercase tracking-widest">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        {post.tags && (
                                            <>
                                                <span className="text-gray-600">|</span>
                                                <span className="text-gray-400">{post.tags}</span>
                                            </>
                                        )}
                                    </div>

                                    <h2 className="text-3xl font-bold font-headline text-white mb-4 group-hover:text-[#39ff14] transition-colors leading-tight">
                                        {post.title}
                                    </h2>

                                    <p className="text-gray-400 font-body text-lg leading-relaxed mb-6 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center text-[#39ff14] font-mono text-sm tracking-widest group-hover:underline">
                                        ACCESS LOG <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-2" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
