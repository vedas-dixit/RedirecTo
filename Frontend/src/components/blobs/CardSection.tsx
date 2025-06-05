"use client"
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const CardSection = () => {
    const [show404, setShow404] = useState(false);
    const [hoverTimer, setHoverTimer] = useState(null);
    const [countryIndex, setCountryIndex] = useState(0);
    
    const countries = ['🇺🇸', '🇬🇧', '🇫🇷', '🇩🇪', '🇯🇵', '🇦🇺', '🇨🇦', '🇮🇳'];
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCountryIndex((prev) => (prev + 1) % countries.length);
        }, 1500);
        
        return () => clearInterval(interval);
    }, []);
    
    const handleExpiringHover = () => {
        const timer = setTimeout(() => {
            setShow404(true);
        }, 300);
        setHoverTimer(timer);
    };
    
    const handleExpiringLeave = () => {
        if (hoverTimer) {
            clearTimeout(hoverTimer);
            setHoverTimer(null);
        }
        setShow404(false);
    };

    return (
        <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Card - Instant Link Shortening */}
            <div className="lg:col-span-2 bg-[#171717] rounded-3xl p-10 border border-orange-900/60 relative overflow-hidden group transition-all duration-500 hover:border-orange-700/80 hover:shadow-2xl hover:shadow-orange-900/20 hover:-translate-y-2">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-500">
                    <div className="w-full h-full bg-gradient-to-br from-orange-600/20 to-transparent" />
                </div>
                
                {/* Animated Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Content */}
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-orange-800/30 rounded-xl flex items-center justify-center group-hover:bg-orange-700/40 group-hover:scale-110 transition-all duration-300">
                            <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform duration-300">
                                <path d="M22.1625 14.675C22.1625 11.5671 17.3625 1 9.56249 1C10.3903 2.7152 10.8983 4.66704 11.2 6.59433M11.2 6.59433C11.9916 11.6516 11.3625 16.5398 11.3625 16.5398M11.2 6.59433C9.56249 10.3239 6.4 15.2966 3.56249 17.783M4.6 21.5126L2.02715 19.2913C1.62932 18.9479 1.81013 18.2787 2.32225 18.1991L23.8062 14.8605C24.2965 14.7844 24.6593 15.322 24.422 15.7729L21.4 21.5126M1 24L3 22.446C3.77553 21.8434 4.74135 21.6352 5.64843 21.8212C6.12758 21.9194 6.59034 22.1277 7 22.446C8.18519 23.3669 9.81482 23.3669 11 22.446C12.1852 21.5251 13.8148 21.5251 15 22.446C16.1852 23.3669 17.8148 23.3669 19 22.446C19.4097 22.1277 19.8724 21.9194 20.3516 21.8212C21.2586 21.6352 22.2245 21.8434 23 22.446L25 24" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h2 className="text-white text-2xl font-semibold group-hover:text-orange-100 transition-colors duration-300">Instant Link Shortening</h2>
                    </div>

                    <p className="text-gray-400 text-md mb-8 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        Transform long URLs into clean, memorable links in seconds. Simplify sharing and enhance your brand with our fast and reliable shortening engine.
                    </p>

                    <div className="space-y-1">
                        <div className="flex items-center gap-4 group/item hover:translate-x-2 transition-transform duration-200">
                            <div className="w-2 h-2 bg-orange-800/30 rounded-full group-hover/item:bg-orange-600 group-hover/item:shadow-lg group-hover/item:shadow-orange-600/50 transition-all duration-300"></div>
                            <span className="text-gray-300 text-base group-hover/item:text-white transition-colors duration-200">Fast redirection</span>
                        </div>
                        <div className="flex items-center gap-4 group/item hover:translate-x-2 transition-transform duration-200 delay-75">
                            <div className="w-2 h-2 bg-orange-800/30 rounded-full group-hover/item:bg-orange-600 group-hover/item:shadow-lg group-hover/item:shadow-orange-600/50 transition-all duration-300"></div>
                            <span className="text-gray-300 text-base group-hover/item:text-white transition-colors duration-200">Custom branded domains</span>
                        </div>
                        <div className="flex items-center gap-4 group/item hover:translate-x-2 transition-transform duration-200 delay-150">
                            <div className="w-2 h-2 bg-orange-800/30 rounded-full group-hover/item:bg-orange-600 group-hover/item:shadow-lg group-hover/item:shadow-orange-600/50 transition-all duration-300"></div>
                            <span className="text-gray-300 text-base group-hover/item:text-white transition-colors duration-200">Batch URL processing</span>
                        </div>
                    </div>
                </div>

                {/* Pulse animation for link shortening */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
            </div>

            {/* Analytics Card */}
            <div className="bg-[#171717] rounded-3xl p-8 border border-orange-900/60 relative overflow-hidden group transition-all duration-500 hover:border-orange-700/80 hover:shadow-2xl hover:shadow-orange-900/20 hover:-translate-y-2">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-8 group-hover:opacity-12 transition-opacity duration-500">
                    <div className="w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-orange-800/30 rounded-lg flex items-center justify-center group-hover:bg-orange-700/40 group-hover:scale-110 transition-all duration-300">
                            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform duration-300">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0 0.5C0 0.414778 0.0907857 0.283067 0.201005 0.176218C0.363543 0.0186494 0.589928 0.0899277 0.75 0.25V0.25C0.910072 0.410072 1.12654 0.48853 1.35127 0.461225C1.64417 0.425635 2 0.393035 2 0.5V8.16473V16H18.5C19 16 19 16.6485 19 16.8125V17.7031C19 17.8671 18.8671 18 18.7031 18H0.59375C0.265831 18 0 17.7342 0 17.4062V0.5Z" fill="white" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M16.1891 2.76385C16.5559 2.36723 17.2188 2.62676 17.2188 3.16698V14.0852C17.2188 14.4131 16.9529 14.6789 16.625 14.6789H4.45312C4.12521 14.6789 3.85938 14.4131 3.85938 14.0852V9.12484C3.85938 8.96641 3.9227 8.81454 4.03526 8.70303L8.15312 4.62365C8.38253 4.39639 8.75149 4.39413 8.98366 4.61856L11.8824 7.42067L16.1891 2.76385ZM15.7344 5.44175L12.5368 9.4962C12.2466 9.89541 12.1457 10.2698 11.9062 10.0383L8.57863 6.29156L5.34375 9.4962V13.1945H15.7344V5.44175Z" fill="white" />
                            </svg>
                        </div>
                        <h3 className="text-white text-xl font-semibold group-hover:text-orange-100 transition-colors duration-300">Powerful Analytics</h3>
                    </div>

                    <p className="text-gray-400 text-base mb-8 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        Gain deep insights into your link performance. Track click-through rates, referral sources, geographic data
                    </p>
                </div>

                {/* Animated chart bars */}
                <div className="absolute bottom-6 right-6 flex items-end gap-1 opacity-0 group-hover:opacity-60 transition-opacity duration-500">
                    <div className="w-1 bg-orange-500 rounded-full animate-pulse" style={{height: '12px', animationDelay: '0ms'}}></div>
                    <div className="w-1 bg-orange-500 rounded-full animate-pulse" style={{height: '20px', animationDelay: '200ms'}}></div>
                    <div className="w-1 bg-orange-500 rounded-full animate-pulse" style={{height: '16px', animationDelay: '400ms'}}></div>
                    <div className="w-1 bg-orange-500 rounded-full animate-pulse" style={{height: '24px', animationDelay: '600ms'}}></div>
                </div>
            </div>

            {/* Link Management Card */}
            <div className="bg-[#171717] rounded-3xl p-8 border border-orange-900/60 relative overflow-hidden group transition-all duration-500 hover:border-orange-700/80 hover:shadow-2xl hover:shadow-orange-900/20 hover:-translate-y-2">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-8 group-hover:opacity-12 transition-opacity duration-500">
                    <div className="w-full h-full bg-gradient-to-br from-green-600/10 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-orange-800/30 rounded-lg flex items-center justify-center group-hover:bg-orange-700/40 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform duration-300">
                                <path d="M1 10C1 14.9706 5.02944 19 10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8.5 8.5L14 6L11.5 11.5L6 14L8.5 8.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="text-white text-xl font-semibold group-hover:text-orange-100 transition-colors duration-300">Easy Link Management</h3>
                    </div>

                    <p className="text-gray-400 text-base mb-8 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        Organize, edit, and search all your shortened links
                    </p>
                </div>

                {/* Floating management icons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-40 transition-all duration-500 group-hover:translate-x-0 translate-x-4">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
            </div>

            {/* Security Card */}
            <div className="bg-[#171717] rounded-3xl p-8 border border-orange-900/60 relative overflow-hidden group transition-all duration-500 hover:border-orange-700/80 hover:shadow-2xl hover:shadow-orange-900/20 hover:-translate-y-2">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-8 group-hover:opacity-12 transition-opacity duration-500">
                    <div className="w-full h-full bg-gradient-to-br from-red-600/10 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-orange-800/30 rounded-lg flex items-center justify-center group-hover:bg-orange-700/40 group-hover:scale-110 transition-all duration-300">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform duration-300">
                                <rect x="4" y="9" width="16" height="12" rx="4" stroke="white" strokeWidth="2" />
                                <path d="M10 15L11.5 16.5L14.5 13.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-green-400 transition-colors duration-300" />
                                <path d="M16 9V7C16 4.79086 14.2091 3 12 3V3C9.79086 3 8 4.79086 8 7L8 9" stroke="white" strokeWidth="2" />
                            </svg>
                        </div>
                        <h3 className="text-white text-xl font-semibold group-hover:text-orange-100 transition-colors duration-300">Secure & Protected Links</h3>
                    </div>

                    <p className="text-gray-400 text-base mb-8 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        Control access to your shared content.
                    </p>
                </div>

                {/* Security shield pulse */}
                <div className="absolute top-4 right-4 w-4 h-4 border border-green-500/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-full h-full bg-green-500/20 rounded-full animate-ping"></div>
                </div>
            </div>

            {/* Open Source Card */}
            <div className="bg-[#171717] rounded-3xl p-8 border border-orange-900/60 relative overflow-hidden group transition-all duration-500 hover:border-orange-700/80 hover:shadow-2xl hover:shadow-orange-900/20 hover:-translate-y-2">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-8 group-hover:opacity-12 transition-opacity duration-500">
                    <div className="w-full h-full bg-gradient-to-br from-purple-600/10 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-orange-800/30 rounded-lg flex items-center justify-center group-hover:bg-orange-700/40 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                            <svg className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" fill="white" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </div>
                        <h3 className="text-white text-xl font-semibold group-hover:text-orange-100 transition-colors duration-300">Open Source</h3>
                    </div>

                    <p className="text-gray-400 text-base mb-8 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        Fully open source project made with <Heart className="inline w-5 h-5 text-red-500 mx-1 group-hover:text-red-400 group-hover:scale-110 transition-all duration-300" /> by kurama
                    </p>
                </div>

                {/* GitHub-style contribution dots */}
                <div className="absolute bottom-4 right-4 grid grid-cols-4 gap-1 opacity-0 group-hover:opacity-60 transition-opacity duration-500">
                    {[...Array(12)].map((_, i) => (
                        <div 
                            key={i}
                            className="w-1.5 h-1.5 bg-green-500/60 rounded-sm animate-pulse"
                            style={{animationDelay: `${i * 100}ms`}}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Additional smaller cards row */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Fast Redirection Card */}
                <div className="bg-[#171717] rounded-2xl p-6 border border-orange-900/60 relative overflow-hidden group transition-all duration-500 hover:border-orange-700/80 hover:shadow-xl hover:shadow-orange-900/15 hover:-translate-y-1">
                    {/* Background gradient */}
                    <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                        <div className="w-full h-full bg-gradient-to-br from-blue-600/15 to-transparent" />
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-orange-800/30 rounded-lg flex items-center justify-center group-hover:bg-orange-700/40 group-hover:scale-110 transition-all duration-300">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform duration-300">
                                        <path d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" stroke="white" strokeWidth="1.5"/>
                                        <path d="M8 5V8L10.5 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <h3 className="text-white text-lg font-semibold group-hover:text-orange-100 transition-colors duration-300">Fast Redirection</h3>
                            </div>
                            
                            {/* Animated country slider */}
                            <div className="relative w-12 h-8 bg-orange-900/20 rounded border border-orange-800/40 overflow-hidden group-hover:border-orange-600/60 transition-colors duration-300">
                                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white transition-opacity duration-300">
                                    <div className="country-slider transition-transform duration-500 ease-in-out">
                                        <span className="country-flag text-sm">{countries[countryIndex]}</span>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-2000 ease-in-out"></div>
                            </div>
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                            Lightning-fast redirects from anywhere in the world.<br/>
                            <span className="text-orange-400/80">Global CDN ensures minimal latency worldwide.</span>
                        </p>
                    </div>

                    {/* Pulse indicator */}
                    <div className="absolute top-3 right-3 w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
                </div>

                {/* Expiring URL Card */}
                <div 
                    className="bg-[#171717] rounded-2xl p-6 border border-orange-900/60 relative overflow-hidden group transition-all duration-500 hover:border-orange-700/80 hover:shadow-xl hover:shadow-orange-900/15 hover:-translate-y-1"
                    onMouseEnter={handleExpiringHover}
                    onMouseLeave={handleExpiringLeave}
                >
                    {/* Background gradient */}
                    <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                        <div className="w-full h-full bg-gradient-to-br from-red-600/15 to-transparent" />
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-orange-800/30 rounded-lg flex items-center justify-center group-hover:bg-orange-700/40 group-hover:scale-110 transition-all duration-300">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform duration-300">
                                    <path d="M8 2V1M8 15V14M15 8H14M2 8H1M12.3638 3.63623L11.6567 4.34334M4.34315 11.6569L3.63604 12.364M12.3638 12.364L11.6567 11.6569M4.34315 4.34334L3.63604 3.63623" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                                    <circle cx="8" cy="8" r="3" stroke="white" strokeWidth="1.5"/>
                                </svg>
                            </div>
                            <h3 className={`text-lg font-semibold transition-all duration-500 ${show404 ? 'text-red-400' : 'text-white group-hover:text-orange-100'}`}>
                                {show404 ? 'Link Expired' : 'Expiring URLs'}
                            </h3>
                        </div>

                        <div className={`transition-all duration-500 ${show404 ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                            <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                            URL that will expire after Clicks | Hours or maybe just a hover :)<br/>
                            <span className="text-orange-400/80">Set custom expiration dates for your links.</span>
                            </p>
                            </p>
                        </div>

                        {/* 404 Content */}
                        <div className={`absolute inset-6 flex flex-col justify-center items-center transition-all duration-500 ${show404 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <div className="text-red-400 text-2xl font-bold mb-1 animate-pulse">404</div>
                            <div className="text-gray-500 text-sm text-center">Link Not Found</div>
                            <div className="text-xs text-gray-600 mt-1">This link has expired</div>
                        </div>
                    </div>

                    {/* Timer animation */}
                    <div className={`absolute top-3 right-3 w-2 h-2 rounded-full transition-all duration-300 ${show404 ? 'bg-red-500 opacity-100' : 'bg-yellow-500 opacity-0 group-hover:opacity-100'}`}>
                        <div className={`w-full h-full rounded-full animate-ping ${show404 ? 'bg-red-500/50' : 'bg-yellow-500/50'}`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardSection;