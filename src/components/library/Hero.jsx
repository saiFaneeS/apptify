import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="relative pb-20 pt-40 mb-8">
      <div className="absolute inset-0 bg-primary">
        <Image
          src="/bg1.jpg"
          alt="Medieval library background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
      </div>
      <div className="text-background dark:text-foreground container mx-auto px-4 relative z-10">
        <h1 className="text-4xl md:text-7xl font-semibold mb-6 text-center">
          The Grand Library
        </h1>
        <p className="text-base text-center leading-relaxed max-w-2xl mx-auto px-6">
          Behold, noble readers, the vast collection of tomes and scrolls that
          grace our hallowed shelves. Embark on literary quests through time and
          imagination.
        </p>
      </div>
    </div>
  );
};

export default Hero;
