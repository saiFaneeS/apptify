import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollText, Feather, Book, Library } from "lucide-react";

export default function AboutHero({ blogs, books, goals }) {
  return (
    <div className="relative bg950 text100 overflow-hidden h-screen">
      <div className="absolute inset-0">
        <Image
          src="/bg1.jpg"
          alt="Medieval library background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:pb-20 sm:pt-44 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          About Me
        </h1>
        <p className="mt-6 max-w-3xl text-xl">
          Welcome, noble readers, to our humble scriptorium. Here we chronicle
          the tales of yore, review tomes of great renown, and share the wisdom
          of ages past.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button className="bg700 hover:bg600 text100">
            <ScrollText className="mr-2 h-5 w-5" />
            My Reviews
          </Button>
          <Button
            variant="outline"
            className="bg800 hover:bg700 text100 border100"
          >
            <Library className="mr-2 h-5 w-5" />
            My Library
          </Button>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
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
        </div>
      </div>
    </div>
  );
}
