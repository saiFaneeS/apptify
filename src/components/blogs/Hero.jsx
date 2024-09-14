import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Component() {
  return (
    <section className="relative overflow-hidden h-screen">
      <div className="absolute inset-0 bg-[url('/medieval-background.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="h-screen w-full absolute z-10 top-0 left-0 bg-black opacity-70"></div>
        <Image
          src="/bg1.jpg"
          alt="Medieval castle background"
          layout="fill"
          objectFit="cover"
          priority
          className="absolute z-0"
        />
      </div>
      <div className="relative z-10 container h-full flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 text-center space-y-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text100 drop-shadow-md">
          Uncover the Secrets of the Past
        </h1>
        <div className="w-full max-w-3xl">
          <Input
            type="search"
            placeholder="Search our medieval archives..."
            className="w-full rounded-md bg50/70 px-6 py-4 text-lg focus:bg50/80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/30"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-5xl">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="bg100 hover:bg100">
              <Button variant="outline" className="w-full md:w-auto">
                <span className="flex items-center justify-between w-full">
                  <span>Content Type</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Select Content Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Articles</DropdownMenuItem>
              <DropdownMenuItem>Interviews</DropdownMenuItem>
              <DropdownMenuItem>Podcasts</DropdownMenuItem>
              <DropdownMenuItem>Videos</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="bg100 hover:bg100">
              <Button variant="outline" className="w-full md:w-auto">
                <span className="flex items-center justify-between w-full">
                  <span>Era</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Select Era</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Ancient</DropdownMenuItem>
              <DropdownMenuItem>Medieval</DropdownMenuItem>
              <DropdownMenuItem>Renaissance</DropdownMenuItem>
              <DropdownMenuItem>Enlightenment</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="w-full md:w-auto hover:bg900">Apply Filters</Button>
        </div>
      </div>
    </section>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
