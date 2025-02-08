import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ScrollText,
  BookOpen,
  Feather,
  Info,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Library,
  Home,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="p-page-sides py-6">
        {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="flex items-center hover:text-primary transition-colors"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Welcome Page
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="flex items-center hover:text-primary transition-colors"
                >
                  <ScrollText className="mr-2 h-4 w-4" />
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/bestiary"
                  className="flex items-center hover:text-primary transition-colors"
                >
                  <Library className="mr-2 h-4 w-4" />
                  Library
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="flex items-center hover:text-primary transition-colors"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Follow My Scrolls</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          <div className="col-span-2">
            <h3 className="text-xl font-semibold mb-4">About</h3>
            <p className="text-sm leading-loose text-foreground/80">
              My book review blog, where literature comes to life through
              insightful analysis and passionate discussion.
            </p>
          </div>
          </div> */}
        <div className="flex gap-4 justify-end items-center flex-wrap max-sm:justify-center ">
          <Link href={"https://www.instagram.com/progway"} target="_blank">
            <p className="font-light hover:underline">
              Developed by <span className="font-medium">Husban Baig</span>
            </p>
          </Link>
        </div>
      </div>
    </footer>
  );
}
