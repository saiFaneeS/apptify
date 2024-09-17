"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  ScrollText,
  Book,
  Feather,
  User,
  Mail,
  Menu,
  X,
  Library,
  Swords,
  Sun,
  Moon,
  Icon,
  flowerLotus,
  BookUser,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";
  const lastScrollTop = useRef(0);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: BookUser },
    { href: "/reviews", label: "Book Reviews", icon: ScrollText },
    { href: "/library", label: "Library", icon: Library },
    // { href: "/contact", label: "Send a Missive", icon: Mail },
  ];

  const isActive = (path) => pathname === path;

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop.current) {
        // Scrolling down
        setShowNavbar(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }
      lastScrollTop.current = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-background text-foreground p-4 fixed top-0 left-0 w-full z-50 transition-transform duration-200 ${
        showNavbar ? "translate-y-0" : "-translate-y-20"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-3 text-xl font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-flower-lotus"
            >
              <path d="M12 20c0-5.5-4.5-10-10-10 0 5.5 4.5 10 10 10" />
              <path d="M9.7 8.3c-1.8-2-3.8-3.1-3.8-3.1s-.8 2.5-.5 5.4" />
              <path d="M15 12.9V12c0-4.4-3-8-3-8s-3 3.6-3 8v.9" />
              <path d="M18.6 10.6c.3-2.9-.5-5.4-.5-5.4s-2 1-3.8 3.1" />
              <path d="M12 20c5.5 0 10-4.5 10-10-5.5 0-10 4.5-10 10" />
            </svg>
            <span className="">Violet Clough</span>
          </Link>
          <div className="hidden md:flex space-x-4">
            {navItems?.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive(item.href)
                    ? "bg-foreground/10"
                    : "hover:bg-foreground/5"
                }`}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.label}
              </Link>
            ))}
            {mounted && (
              <span
                className="h-9 w-9 rounded-full  flex justify-center items-center cursor-pointer outline outline-1 outline-border/10 hover:outline-primary/50 hover:bg-primary/10 transition-all shrink-0"
                onClick={() => setTheme(isDark ? "light" : "dark")}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </span>
            )}
          </div>
          <div className="flex gap-2 items-center">
            {mounted && (
              <span
                className="h-9 w-9 rounded-full  flex justify-center items-center cursor-pointer outline outline-1 outline-border/10 hover:outline-primary/50 hover:bg-primary/10 transition-all shrink-0"
                onClick={() => setTheme(isDark ? "light" : "dark")}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </span>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                isActive(item.href)
                  ? "bg800 text100"
                  : "hover:bg800 hover:text100"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="h-5 w-5 mr-2" />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
