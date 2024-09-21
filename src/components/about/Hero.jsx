import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollText, Library, Feather } from "lucide-react";
import Link from "next/link";

export default function AboutHero({ blogs, books, goals }) {
  return (
    <div className="relative overflow-hidden h-screen">
      <div className="absolute inset-0 bg-primary animate-in  fade-in-10 duration-1000">
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
      <div className="relative max-w-7xl mx-auto flex flex-col items-start justify-center h-full sm:pt-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-background dark:text-foreground text-xl font-medium leading-snug">
          Greetings, Readers!
        </h1>
        <h4 className="text-background dark:text-foreground mt-2 mb-4 max-w-3xl text-4xl sm:text-5xl font-semibold">
          I’m Violet Clough,
        </h4>
        <p className="text-background dark:text-foreground text-base max-sm:text-sm leading-loose max-w-2xl">
          Welcome to my corner of literary adventures. Here, I share my thoughts
          on cherished books, explore new reads, and celebrate the stories that
          inspire me.
        </p>

        <div className="mt-10 flex gap-4">
          <Link href={"/works"}>
            <Button variant="outline">
              <Feather className="mr-2 h-5 w-5" />
              My Works
            </Button>
          </Link>
          <Link href={"/library"}>
            <Button variant="secondary">
              <Library className="mr-2 h-5 w-5" />
              My Library
            </Button>
          </Link>
        </div>
        {/* <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex items-center">
            <ScrollText className="h-12 w-12 text300" />
            <div className="ml-4">
              <h3 className="text-lg font-medium">{blogs}+ Books Reviewed</h3>
              <p className="mt-2 text200">
                Tales from every corner of the realm
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Book className="h-12 w-12 text300" />
            <div className="ml-4">
              <h3 className="text-lg font-medium">{books}+ Tomes</h3>
              <p className="mt-2 text200">
                From ancient scrolls to modern manuscripts
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
