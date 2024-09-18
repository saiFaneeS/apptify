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
      <div className="text-background dark:text-foreground container mx-auto px-6 relative z-10">
        <h1 className="text-4xl sm:text-6xl font-semibold mb-2 text-center">
          My Works
        </h1>
        <p className="text-base max-sm:text-sm text-center leading-loose max-w-2xl mx-auto">
          Explore the stories and writings I&nbsp;ve created. Each piece
          reflects my love for storytelling and my journey as a writer.
        </p>
      </div>
    </div>
  );
};

export default Hero;
