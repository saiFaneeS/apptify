import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative bg-black sm:h-screen py-12 max-sm:pt-28 flex items-center justify-center p-page-sides">
      <div className="absolute inset-0">
        <Image
          src="/blogs-backdrop.png"
          alt="Blog Background"
          fill
          sizes="100vw"
          quality={90}
          priority
          className="object-cover brightness-[0.2]"
        />
      </div>

      <div className="relative z-10 container text-start">
        <div className="">
          <div className="animate-in fade-in-50 slide-in-from-bottom-10 duration-300">
            <h1 className="text-4xl max-sm:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Apptify Solutions - Blog
            </h1>
            <p className="text-base text-gray-300 mb-8 leading-relaxed">
              Discover insights, trends, and expert perspectives on technology,
              innovation, and digital transformation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-start mb-12 group">
              <Link href={"/blogs"}>
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 flex items-center gap-2 group-hover:gap-4 transition-all"
                >
                  Start Reading <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white dark:text-white hover:bg-white/10"
                disabled
              >
                <span>Newsletter (Coming Soon)</span>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8 text-center">
            <div className="backdrop-blur-md bg-neutral-800/30 p-4 rounded- flex flex-col items-center justify-center animate-in fade-in-50 slide-in-from-bottom-10 duration-300">
              <BookOpen className="h-8 w-8 mb-3 mx-auto text-blue-400" />
              <h3 className="text-base font-semibold mb-2">Expert Articles</h3>
              <p className="text-gray-300 text-sm">
                In-depth technical insights and analysis
              </p>
            </div>
            <div className="backdrop-blur-md bg-neutral-800/30 p-4 rounded- flex flex-col items-center justify-center animate-in fade-in-50 slide-in-from-bottom-10 duration-300">
              <TrendingUp className="h-8 w-8 mb-3 mx-auto text-green-400" />
              <h3 className="text-base font-semibold mb-2">Latest Trends</h3>
              <p className="text-gray-300 text-sm">
                Stay ahead with emerging tech trends
              </p>
            </div>
            <div className="backdrop-blur-md bg-neutral-800/30 p-4 rounded- flex flex-col items-center justify-center animate-in fade-in-50 slide-in-from-bottom-10 duration-300">
              <Users className="h-8 w-8 mb-3 mx-auto text-purple-400" />
              <h3 className="text-base font-semibold mb-2">Community</h3>
              <p className="text-gray-300 text-sm">
                Join discussions with tech enthusiasts
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center z-20">
        <div className="animate-bounce inline-block">
          <ArrowRight className="h-6 w-6 rotate-90 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
