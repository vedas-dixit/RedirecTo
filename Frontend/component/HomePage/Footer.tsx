"use client";
import React, { useState, useEffect } from "react";

function Footer() {
  const [chars, setChars] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isChanging, setIsChanging] = useState(false);

  const CHAR_SET =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const TOTAL_CHARS = 45;

  // Generate random character
  const getRandomChar = () => {
    return CHAR_SET.charAt(Math.floor(Math.random() * CHAR_SET.length));
  };

  // Initialize with random characters
  useEffect(() => {
    let initialChars = "";
    for (let i = 0; i < TOTAL_CHARS; i++) {
      initialChars += getRandomChar();
    }
    setChars(initialChars);
  }, []);

  // Animation cycle
  useEffect(() => {
    if (!chars) return;

    const animationCycle = () => {
      setIsChanging(true);
      setCurrentIndex(0);

      const changeNextChar = (index: number) => {
        if (index >= TOTAL_CHARS) {
          // Animation complete, wait 2 seconds before next cycle
          setCurrentIndex(-1);
          setIsChanging(false);
          setTimeout(() => {
            animationCycle();
          }, 3000);
          return;
        }

        // Change current character
        setChars((prevChars) => {
          const newChars = prevChars.split("");
          newChars[index] = getRandomChar();
          return newChars.join("");
        });

        setCurrentIndex(index);

        // Move to next character after 100ms
        setTimeout(() => {
          changeNextChar(index + 1);
        }, 180);
      };

      changeNextChar(0);
    };

    // Start first animation cycle after a short delay
    const timeout = setTimeout(animationCycle, 1000);
    return () => clearTimeout(timeout);
  }, [chars]);

  return (
    <footer className="border-b border-white/20 z-50">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="py-4 px-6 flex items-center justify-between text-sm">
            {/* Left - Logo */}
            <div className="flex items-center">
              <span className="text-white font-medium">© RedirectTo</span>
            </div>

            {/* Center - Animated Random Characters */}
            <div className="flex-1 flex justify-center">
              <div className="px-3 py-1 rounded-xl font-mono text-md tracking-wide border border-amber-800/55">
                <span className="text-orange-400 text-xl">/</span>
                {chars.split("").map((char, index) => (
                  <span
                    key={index}
                    className={`transition-colors duration-150 ${
                      currentIndex === index && isChanging
                        ? "text-orange-400"
                        : "text-gray-300"
                    }`}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>

            {/* Right - Social Links */}
            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                linkedin
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Kurama
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="py-3 px-3">
            {/* Animated Characters Row - Centered */}
            <div className="flex justify-center">
              <div className="px-2 py-1 rounded-lg font-mono text-xs sm:text-sm tracking-wide border border-amber-800/55 max-w-full overflow-hidden">
                <span className="text-orange-400 text-sm sm:text-lg">/</span>
                <span className="break-all">
                  {chars.split("").map((char, index) => (
                    <span
                      key={index}
                      className={`transition-colors duration-150 ${
                        currentIndex === index && isChanging
                          ? "text-orange-400"
                          : "text-gray-300"
                      }`}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </div>
            </div>
            {/* Logo and Social Links Row */}
            <div className="flex items-center justify-between text-xs mb-3 mt-3">
              <span className="text-white font-medium text-sm">
                © RedirectTo
              </span>
              <div className="flex items-center space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  linkedin
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Kurama
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="text-center text-xs text-gray-500 pb-3 border-t border-gray-800 pt-2 px-2">
          <span className="hidden sm:inline">
            Join the 60 million+ links created daily — but with smarter
            insights.
          </span>
          <span className="sm:hidden">
            56-68M URLs shortened daily globally
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
