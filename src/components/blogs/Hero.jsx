import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="relative pb-10 pt-24 mb-8 p-page-sides">
      <div className="absolute inset-0 dark:bg-primary/0 bg-primary">
        <Image
          src="/blogs-backdrop.png"
          alt=""
          fill
          sizes="100vw"
          quality={75}
          priority
          className="object-cover opacity-50 brightness-50 fixed"
        />
      </div>
      <div className="text-background dark:text-foreground relative z-10">
        <h1 className="text-3xl font-semibold mb-2">All Blogs</h1>
        <p className="text-base max-sm:text-sm leading-loose ">
          Read ideas that challenge the norm, and success stories that inspire.
        </p>
      </div>
    </div>
  );
};

export default Hero;
