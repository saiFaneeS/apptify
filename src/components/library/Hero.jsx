import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="relative pb-20 pt-40 mb-8">
      <div className="absolute inset-0 bg-primary">
        <Image
          src="/bg1.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={75}
          priority
          className="object-cover opacity-20"
        />
      </div>
      <div className="text-background dark:text-foreground container mx-auto px-6 relative z-10">
        <h1 className="text-4xl sm:text-6xl font-semibold mb-2 text-center">
          My Library
        </h1>
        <p className="text-base max-sm:text-sm text-center leading-loose max-w-2xl mx-auto">
          Explore the collection of books I cherish. Each volume holds a unique
          story and a place in my reading journey for me.
        </p>
      </div>
    </div>
  );
};

export default Hero;
