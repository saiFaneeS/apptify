"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sun,
  Moon,
  Castle,
  Menu,
  X,
  BookCopy,
  Instagram,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";
  const lastScrollTop = useRef(0);
  const pathname = usePathname();
  const { userProfile } = useUser();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/blogs", label: "Blogs" },
    // { href: "/books", label: "My Shelf" },
  ];

  const isActive = (path) => {
    if (path === "/blogs") {
      return pathname?.startsWith("/blogs");
    }
    return pathname === path;
  };

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop.current) {
        setShowNavbar(false);
        setIsOpen(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollTop.current = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-background/90 backdrop-blur-md text-foreground fixed top-0 left-0 w-full z-50 transition-all duration-200 delay-100 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="p-page-sides">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                alt=""
                src={"/logo.png"}
                className="h-8 w-8 rounded-full object-cover border border-border"
                width={"100"}
                height={"100"}
              />
              <span className="text-lg font-medium text-foreground text-nowrap">
                Apptify
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-1.5 rounded text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-primary"
                    : "hover:text-foreground/90"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="w-8">
              {mounted && (
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </Button>
              )}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <div className="w-8 mr-2">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </Button>
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-8 w-8"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>
        </div>
      </div>
      <Separator />

      {isOpen && (
        <div className="md:hidden shadow-2xl transition-all">
          <div className="p-page-sides pt-2 pb-3 space-y-2 flex gap-2 flex-col-reverse">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-sm   font-normal ${
                  isActive(item.href) ? "text-primary" : "hover:bg-primary/10"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {/* <Separator /> */}
          </div>
        </div>
      )}
    </nav>
  );
}
