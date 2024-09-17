import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollText, Feather, Book, Library } from "lucide-react";
import Link from "next/link";

export default function AboutHero({ blogs, books, goals }) {
  return (
    <div className="relative overflow-hidden h-screen mb-12">
      <div className="absolute inset-0 bg-primary">
        <Image
          src="/bg1.jpg"
          alt="Medieval library background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
      </div>
      <div className="relative max-w-7xl mx-auto flex flex-col items-start justify-center h-full sm:pt-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-background dark:text-foreground text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          Hi, Noble Readers!
        </h1>
        <h4 className="text-background dark:text-foreground mt-6 max-w-3xl text-2xl font-semibold">
          This is Violet Clough,{" "}
        </h4>
        <p className="text-background dark:text-foreground mt-6 max-w-3xl text-xl">
          Welcome to my humble scriptorium. Here I chronicle the tales of yore,
          review tomes of great renown, and share the wisdom of ages past.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href={"/reviews"}>
            <Button variant="outline">
              <ScrollText className="mr-2 h-5 w-5" />
              My Reviews
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
