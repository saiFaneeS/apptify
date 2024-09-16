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
  ScrollText,
  User,
  LogOut,
  Bell,
  Sun,
  Moon,
  LibraryBig,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useTheme } from "next-themes";
import { useUser } from "@/context/UserContext";

export default function TopBar() {
  const { user, auth } = useAuth();
  const { userProfile } = useUser();
  const { theme, setTheme } = useTheme();
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
      className={`bg-background text-foreground fixed top-0 left-0 w-full z-50 transition-transform duration-500 delay-75 ${
        showNavbar ? "translate-y-0" : "-translate-y-20"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and site title */}
          <Link
            href="/dashboard"
            className="flex items-center space-x-3 text-xl font-semibold"
          >
            <LayoutDashboard className="h-6 w-6" />
            <span className="hidden sm:inline">CMS</span>
          </Link>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            {/* <Button
              variant="ghost"
              size="icon"
              className="text100 hover:text200"
            >
              <Bell className="h-5 w-5" />
            </Button> */}
            {mounted && (
              <span
                className="h-9 w-9 rounded-full  flex justify-center items-center cursor-pointer outline outline-1 outline-border/10 hover:outline-primary/50 hover:bg-primary/10 transition-all shrink-0"
                onClick={() => setTheme(isDark ? "light" : "dark")}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </span>
            )}

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={avatar}
                      alt="User"
                      className="object-cover"
                    />
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm leading-snug text-foreground">
                      {userProfile?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={"/dashboard"}>
                  <DropdownMenuItem>
                    <ScrollText className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                </Link>
                <Link href={"/dashboard/library"}>
                  <DropdownMenuItem>
                    <LibraryBig className="mr-2 h-4 w-4" />
                    <span>Library</span>
                  </DropdownMenuItem>
                </Link>
                <Link href={"/dashboard/settings"}>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <div onClick={handleSignOut}>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
