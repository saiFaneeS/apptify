import Image from "next/image";
import Link from "next/link";
import { Scroll } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden mb-8">
      <div className="absolute inset-0 bg-primary">
        <Image
          src="/bg1.jpg"
          alt="Medieval library background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
      </div>
      <div className="relative z-10 text-center text-background px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-semibold mb-6 text-center text-foreground">
          Welcome to The Blog
        </h1>
        <p className="text-xl md:text-2xl text-center max-w-3xl mx-auto mb-8 text-foreground">
          Embark on a journey through time, where tales of valor, mythical
          beasts, and ancient wisdom await.
        </p>
        <Link
          href="/reviews"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-background bg-foreground hover:bg-foreground/80 transition-colors duration-300"
        >
          <Scroll className="mr-2 h-5 w-5" />
          Begin Your Quest of Reading
        </Link>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text100"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  );
}
