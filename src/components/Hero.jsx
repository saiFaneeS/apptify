import Image from "next/image";
import Link from "next/link";
import { Scroll } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="h-screen w-full absolute z-10 top-0 left-0 bg-black opacity-70"></div>
      <Image
        src="/bg1.jpg"
        alt="Medieval castle background"
        layout="fill"
        objectFit="cover"
        priority
        className="absolute z-0"
      />
      <div className="relative z-10 text-center text-background px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Welcome to Ye Olde Blog
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl mb-8 max-w-3xl mx-auto drop-shadow-lg">
          Embark on a journey through time, where tales of valor, mythical
          beasts, and ancient wisdom await.
        </p>
        <Link
          href="/chronicles"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-background bg-foreground hover:bg-foreground/80 transition-colors duration-300"
        >
          <Scroll className="mr-2 h-5 w-5" />
          Begin Your Quest
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
