import React from "react";
import AnimatedStarButton from "../blobs/Button";

const HomeComponent = () => {
  return (
    <>
      <div className="bg-landing fixed inset-0 -z-10" />

      <main className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
          Create links instantly.
          <br />
          <span className="text-[#c4642c]">Monitor traffic effortlessly.</span>
        </h1>
        <p className="mt-6 text-lg sm:text-md md:text-xl text-white/80 max-w-3xl mx-auto">
          RedirecTo. is your modern platform for intelligent link shortening.
          <br />
          Get custom URLs, detailed click analytics, blazing-fast redirects, and
          powerful link management tools — all in one place.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <AnimatedStarButton className="px-6 py-3" Link="/dashboard">
            Go To Dashboard
          </AnimatedStarButton>
        </div>
      </main>
    </>
  );
};

export default HomeComponent;
