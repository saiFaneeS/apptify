"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ScrollText,
  Search,
  BookOpen,
  Feather,
  Info,
  Menu,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="lg:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-4 w-4" />
      </Button>
      <aside
        className={`fixed top-0 z-40 w-64 h-screen transition-all ${
          isOpen ? "right-0" : "-right-full"
        } lg:translate-x-0 bg800 text100 p-5 overflow-y-auto`}
      >
        <nav className="space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-4 flex justify-between items-center">
              Navigation{" "}
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                onClick={toggleSidebar}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/chronicles"
                  className="flex items-center p-2 rounded-lg hover:bg700 transition-colors"
                >
                  <ScrollText className="mr-3 h-5 w-5" />
                  Chronicles
                </Link>
              </li>
              <li>
                <Link
                  href="/bestiary"
                  className="flex items-center p-2 rounded-lg hover:bg700 transition-colors"
                >
                  <BookOpen className="mr-3 h-5 w-5" />
                  Bestiary
                </Link>
              </li>
              <li>
                <Link
                  href="/artifacts"
                  className="flex items-center p-2 rounded-lg hover:bg700 transition-colors"
                >
                  <Feather className="mr-3 h-5 w-5" />
                  Artifacts
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="flex items-center p-2 rounded-lg hover:bg700 transition-colors"
                >
                  <Info className="mr-3 h-5 w-5" />
                  About the Scribe
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">
              Search the Archives
            </h2>
            <form className="flex items-center">
              <Input
                type="search"
                placeholder="Search..."
                className="bg700 border600 text100 placeholder400"
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="ml-2"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">
              Featured Scroll
            </h2>
            <div className="bg700 p-4 rounded-lg">
              <h3 className="font-bold mb-2">
                The Alchemist&apos;s Secret
              </h3>
              <p className="text-sm mb-4">
                Uncover the mysteries of transmutation in this ancient scroll...
              </p>
              <Link
                href="/chronicles/alchemists-secret"
                className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg600 hover:bg500 transition-colors"
              >
                Read More
              </Link>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
