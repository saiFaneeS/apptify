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
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg900 text100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
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
                  href="/about"
                  className="flex items-center hover:text300 transition-colors"
                >
                  <Info className="mr-2 h-4 w-4" />
                  About the Scribe
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
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="mb-2">Ye Olde Blog Castle</p>
            <p className="mb-2">Medievalshire, ME1 2VA</p>
            <p className="mb-2">United Kingdoms of Yore</p>
            <p className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              scribe@yeoldeblog.com
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow My Scrolls</h3>
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
        <div className="mt-8 pt-8 border-t border800 text-center">
          <p>
            &copy; {new Date().getFullYear()} Ye Olde Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
