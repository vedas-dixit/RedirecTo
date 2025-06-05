import React from 'react';
import Image from 'next/image';
import { Heart, Link, GitBranchPlus } from 'lucide-react';

const CardSection = () => {
    return (
        <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Card - Instant Link Shortening */}
            <div className="lg:col-span-2 bg-[#171717] rounded-3xl p-10 border-1 border-orange-900/60">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 bg-orange-800/50 rounded-xl flex items-center justify-center">
                                <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.1625 14.675C22.1625 11.5671 17.3625 1 9.56249 1C10.3903 2.7152 10.8983 4.66704 11.2 6.59433M11.2 6.59433C11.9916 11.6516 11.3625 16.5398 11.3625 16.5398M11.2 6.59433C9.56249 10.3239 6.4 15.2966 3.56249 17.783M4.6 21.5126L2.02715 19.2913C1.62932 18.9479 1.81013 18.2787 2.32225 18.1991L23.8062 14.8605C24.2965 14.7844 24.6593 15.322 24.422 15.7729L21.4 21.5126M1 24L3 22.446C3.77553 21.8434 4.74135 21.6352 5.64843 21.8212C6.12758 21.9194 6.59034 22.1277 7 22.446C8.18519 23.3669 9.81482 23.3669 11 22.446C12.1852 21.5251 13.8148 21.5251 15 22.446C16.1852 23.3669 17.8148 23.3669 19 22.446C19.4097 22.1277 19.8724 21.9194 20.3516 21.8212C21.2586 21.6352 22.2245 21.8434 23 22.446L25 24" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                            </div>
                            <h2 className="text-white text-2xl font-semibold">Instant Link Shortening</h2>
                        </div>

                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Transform long URLs into clean, memorable links in seconds. Simplify sharing and enhance your brand with our fast and reliable shortening engine.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-gray-300 text-base">Fast redirection</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-gray-300 text-base">Custom branded domains</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-gray-300 text-base">Batch URL processing</span>
                            </div>
                        </div>
                    </div>

                    {/* Space for icon on the right */}
                    <div className="w-40 h-40 ml-10 flex items-center justify-center">
                        <div className="w-32 h-32 bg-gray-900 rounded-3xl border-2 border-gray-800 flex items-center justify-center">
                            <Image
                                src="/api/placeholder/80/80"
                                alt="Main feature illustration"
                                width={80}
                                height={80}
                                className="rounded-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Analytics Card */}
            <div className="bg-[#171717] rounded-3xl p-8 border-1 border-orange-900/60">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-8 h-8 bg-orange-800 rounded-lg flex items-center justify-center">
                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0.5C0 0.414778 0.0907857 0.283067 0.201005 0.176218C0.363543 0.0186494 0.589928 0.0899277 0.75 0.25V0.25C0.910072 0.410072 1.12654 0.48853 1.35127 0.461225C1.64417 0.425635 2 0.393035 2 0.5V8.16473V16H18.5C19 16 19 16.6485 19 16.8125V17.7031C19 17.8671 18.8671 18 18.7031 18H0.59375C0.265831 18 0 17.7342 0 17.4062V0.5Z" fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.1891 2.76385C16.5559 2.36723 17.2188 2.62676 17.2188 3.16698V14.0852C17.2188 14.4131 16.9529 14.6789 16.625 14.6789H4.45312C4.12521 14.6789 3.85938 14.4131 3.85938 14.0852V9.12484C3.85938 8.96641 3.9227 8.81454 4.03526 8.70303L8.15312 4.62365C8.38253 4.39639 8.75149 4.39413 8.98366 4.61856L11.8824 7.42067L16.1891 2.76385ZM15.7344 5.44175L12.5368 9.4962C12.2466 9.89541 12.1457 10.2698 11.9062 10.0383L8.57863 6.29156L5.34375 9.4962V13.1945H15.7344V5.44175Z" fill="white" />
                        </svg>

                    </div>
                    <h3 className="text-white text-xl font-semibold">Powerful Analytics</h3>
                </div>

                <p className="text-gray-400 text-base mb-8 leading-relaxed">
                    Gain deep insights into your link performance. Track click-through rates, referral sources, geographic data
                </p>

                {/* Space for analytics visualization */}
                <div className="flex justify-center">
                    <div className="w-20 h-20 flex items-center justify-center">
                        <Image
                            src="/api/placeholder/64/64"
                            alt="Analytics visualization"
                            width={64}
                            height={64}
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </div>

            {/* Link Management Card */}
            <div className="bg-[#171717] rounded-3xl p-8 border-1 border-orange-900/60">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-8 h-8 bg-orange-800 rounded-lg flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 10C1 14.9706 5.02944 19 10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.5 8.5L14 6L11.5 11.5L6 14L8.5 8.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </div>
                    <h3 className="text-white text-xl font-semibold">Easy Link Management</h3>
                </div>

                <p className="text-gray-400 text-base mb-8 leading-relaxed">
                    Organize, edit, and search all your shortened links
                </p>

                {/* Management interface mockup */}
                <div className="flex justify-center">
                    <div className="w-20 h-20 flex items-center justify-center">
                        <Image
                            src="/api/placeholder/64/64"
                            alt="Link management interface"
                            width={64}
                            height={64}
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </div>

            {/* Security Card */}
            <div className="bg-[#171717] rounded-3xl p-8 border-1 border-orange-900/60">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-8 h-8 bg-orange-800 rounded-lg flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="4" y="9" width="16" height="12" rx="4" stroke="white" stroke-width="2" />
                            <path d="M10 15L11.5 16.5L14.5 13.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M16 9V7C16 4.79086 14.2091 3 12 3V3C9.79086 3 8 4.79086 8 7L8 9" stroke="white" stroke-width="2" />
                        </svg>

                    </div>
                    <h3 className="text-white text-xl font-semibold">Secure & Protected Links</h3>
                </div>

                <p className="text-gray-400 text-base mb-8 leading-relaxed">
                    Control access to your shared content.
                </p>

                {/* Security badge */}
                <div className="flex justify-center">
                    <div className="w-20 h-20 flex items-center justify-center">
                        <Image
                            src="/api/placeholder/64/64"
                            alt="Security badge"
                            width={64}
                            height={64}
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </div>

            {/* Open Source Card */}
            <div className="bg-[#171717] rounded-3xl p-8 border-1 border-orange-900/60">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-8 h-8 bg-orange-800 rounded-lg flex items-center justify-center">
                        <svg className="h-6 w-6" fill="white" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </div>
                    <h3 className="text-white text-xl font-semibold">Open Source</h3>
                </div>

                <p className="text-gray-400 text-base mb-8 leading-relaxed">
                    Fully open source project made with <Heart className="inline w-5 h-5 text-red-500 mx-1" /> by kurama
                </p>

                {/* GitHub-style contribution graph */}
                <div className="flex justify-center items-end space-x-1 h-20">
                    <div className="w-3 h-10 bg-green-500 rounded-sm"></div>
                    <div className="w-3 h-16 bg-green-400 rounded-sm"></div>
                    <div className="w-3 h-8 bg-green-600 rounded-sm"></div>
                    <div className="w-3 h-12 bg-green-500 rounded-sm"></div>
                    <div className="w-3 h-6 bg-green-300 rounded-sm"></div>
                    <div className="w-3 h-18 bg-green-600 rounded-sm"></div>
                    <div className="w-3 h-10 bg-green-400 rounded-sm"></div>
                </div>
            </div>
        </div>
    );
};

export default CardSection;