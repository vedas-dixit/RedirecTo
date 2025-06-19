import React, { useEffect, useRef, useState } from "react";

interface GlassyLoaderProps {
  loading: boolean;
}

const CHAR_SET = "$&%#)(#@$ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function getRandomChars(length: number) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += CHAR_SET.charAt(Math.floor(Math.random() * CHAR_SET.length));
  }
  return result;
}

const GlassyLoader: React.FC<GlassyLoaderProps> = ({ loading }) => {
  const [randomChars, setRandomChars] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (loading) {
      intervalRef.current = setInterval(() => {
        setRandomChars(getRandomChars(8));
      }, 100);
    } else {
      setRandomChars("");
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg px-6 py-3 flex items-center min-w-[180px] glassy-loader-box animate-fade-in">
        <span className="font-mono text-white text-base tracking-wider">
          Loading{randomChars}...
        </span>
      </div>
    </div>
  );
};

export default GlassyLoader; 