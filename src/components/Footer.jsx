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
    <footer>
      <div className="px-8 max-sm:px-4 py-12 bg-background border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="flex items-center hover:text300 transition-colors"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Welcome Page
                </Link>
              </li>

              <li>
                <Link
                  href="/chronicles"
                  className="flex items-center hover:text300 transition-colors"
                >
                  <ScrollText className="mr-2 h-4 w-4" />
                  Book Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/bestiary"
                  className="flex items-center hover:text300 transition-colors"
                >
                  <Library className="mr-2 h-4 w-4" />
                  Library
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="flex items-center hover:text300 transition-colors"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="mb-2">Medievalshire, ME1 2VA</p>
            <p className="mb-2">United Kingdoms of Yore</p>
            <p className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              scribesemail@gmail.com
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow My Scrolls</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text300 transition-colors">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text300 transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="hover:text300 transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>
        <div className="flex gap-4 justify-between items-center flex-wrap border-t border-border pt-8 mt-8">
          <p>
            &copy; {new Date().getFullYear()} Violet Clough. All rights reserved.
          </p>
          <p className="font-light">
            Developed by{" "}
            <Link
              href={"https://saif-anees.vercel.app"}
              target="_blank"
              className="font-medium"
            >
              Saif Anees
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
