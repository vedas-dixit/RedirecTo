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
        {/* Unified Layout for all screen sizes */}
        <div className="py-4 px-3">
          {/* Animated Characters Row - Always centered and on top */}
          <div className="flex justify-center mb-4 px-4">
            <div className="px-3 py-1 rounded-xl font-mono text-xs sm:text-sm md:text-md tracking-wide border border-amber-800/55">
              <span className="text-orange-500 text-sm sm:text-lg md:text-xl">
                /
              </span>
              {chars.split("").map((char, index) => (
                <span
                  key={index}
                  className={`transition-colors duration-150 ${
                    currentIndex === index && isChanging
                      ? "text-orange-500"
                      : "text-gray-300"
                  }`}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>

          {/* Logo and Social Links Row - Always horizontal layout */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-white font-medium">© RedirectTo</span>
            <div className="flex items-center space-x-4 sm:space-x-6">
              <a
                href="https://www.linkedin.com/in/vedasdixit/"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                linkedin
              </a>
              <a
                href="https://github.com/vedas-dixit"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                GitHub
              </a>
              <a
                href="https://vedas-desktop.vercel.app/#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Kurama
              </a>
            </div>
          </div>
        </div>

        {/* Bottom text - Unified message */}
        <div className="text-center text-xs text-gray-500 pb-3 border-t border-gray-800 pt-2 px-2">
          Join the 60 million+ links created daily — but with smarter insights.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
