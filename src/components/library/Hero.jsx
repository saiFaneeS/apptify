import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="relative pb-20 pt-40">
      <div className="absolute inset-0">
        <Image
          src="/bg1.jpg"
          alt="Medieval library background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
      </div>
      <div className="absolute inset-0 bg-[url('/medieval-library.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center">
          The Grand Library
        </h1>
        <p className="text-xl md:text-2xl text-center max-w-3xl mx-auto">
          Behold, noble readers, the vast collection of tomes and scrolls that
          grace our hallowed shelves. Embark on literary quests through time and
          imagination.
        </p>
      </div>
    </div>
  );
};

export default Hero;
