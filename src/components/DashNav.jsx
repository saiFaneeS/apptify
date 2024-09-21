"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  LogOut,
  Sun,
  Moon,
  LibraryBig,
  NotebookTabs,
  Bolt,
  CircleUser,
  User2,
  Feather,
  ScrollText,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useTheme } from "next-themes";
import { useUser } from "@/context/UserContext";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { AvatarFallback } from "@radix-ui/react-avatar";

export default function TopBar() {
  const { user, auth } = useAuth();
  const { userProfile } = useUser();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const [avatar, setAvatar] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [mounted, setMounted] = useState(false);

  const isDark = theme === "dark";
  const lastScrollTop = useRef(0);

  const handleSignOut = async () => {
    await signOut(auth);
    localStorage.removeItem("userProfile");
  };

  useEffect(() => {
    setMounted(true);

    const storedAvatar = localStorage.getItem("userAvatar");
    if (storedAvatar) {
      try {
        const parsedAvatar = JSON.parse(storedAvatar);
        setAvatar(parsedAvatar);
      } catch (error) {
        console.error("Error parsing stored avatar:", error);
      }
    }

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
    // <div className="bg-background border-b-2 border700 fixed w-full z-50">
    <div
      className={`bg-background text-foreground border-b dark:border-border fixed top-0 left-0 w-full z-50 transition-transform duration-200 ${
        showNavbar ? "translate-y-0" : "-translate-y-20"
      }`}
    >
      <div className="px-8 max-sm:px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and site title */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-semibold pl-1"
          >
            <NotebookTabs className="h-5 w-5" />
            Dashboard
          </Link>
          <p className="flex gap-2 items-center text-sm text-foreground/70"></p>
          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                className="outline outline-2 outline-border/10 hover:outline-primary/50 hover:bg-primary/10 transition-all shrink-0 rounded-full max-sm:hidden"
                onClick={() => setTheme(isDark ? "light" : "dark")}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-auto rounded-full px-1 hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 flex justify-center items-center">
                      <AvatarImage
                        src={avatar}
                        alt="User"
                        className="object-cover"
                      />
                      <AvatarFallback className="flex justify-center items-center">
                        <User2 size={16} />
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline-block text-sm font-medium">
                      {userProfile?.name || "Menu"}
                    </span>
                    <ChevronDown size={16} className="text-muted-foreground" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userProfile?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center">
                    <NotebookTabs className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/works" className="flex items-center">
                    <Feather className="mr-2 h-4 w-4" />
                    <span>Works</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/reviews" className="flex items-center">
                    <ScrollText className="mr-2 h-4 w-4" />
                    <span>Book Reviews</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/library" className="flex items-center">
                    <LibraryBig className="mr-2 h-4 w-4" />
                    <span>Library</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center"
                  >
                    <CircleUser className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
