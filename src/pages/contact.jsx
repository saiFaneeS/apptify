import { Button } from "@/components/ui/button";
import { Scroll, Feather, Compass, Castle } from "lucide-react";
import Link from "next/link";
import Layout from "./Layout";
import { Card } from "@/components/ui/card";

const socialLinks = [
  { name: "Instagram Tapestry", icon: Castle, href: "https://instagram.com" },
  { name: "Facebook Scroll", icon: Scroll, href: "https://facebook.com" },
  { name: "Twitter Nest", icon: Feather, href: "https://twitter.com" },
  { name: "LinkedIn Guild", icon: Compass, href: "https://linkedin.com" },
];

export default function ContactPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from100 to200 flex items-center justify-center px-4 py-12 pt-24">
        <div className="max-w-3xl w-full">
          <Card>
            <div className="p-8 md:p-12">
              <h2 className="text-2xl md:text-4xl font-bold text900 mb-6 text-center">
                Hark! Connect with The Realm
              </h2>
              <p className="text-lg text800 mb-8 text-center">
                My realm extends beyond these digital borders. Seek me out in
                these lands of social communion.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {socialLinks.map((link) => (
                  <Link key={link.name} href={link.href} passHref>
                    <Button
                      variant="outline"
                      className="w-full h-20 text-lg font-semibold border-2 border700 bg100 hover:bg200 text900 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                      <link.icon className="mr-3 h-6 w-6" />
                      {link.name}
                    </Button>
                  </Link>
                ))}
              </div>
              <div className="mt-12 text-center">
                <p className="text800 mb-4">
                  Or if thou prefer the ways of old...
                </p>
                <p className="text-xl text900">Send a raven to:</p>
                <p className="text-lg font-medium text800">
                  Castle Address, Digital Realm, Internet Kingdom
                </p>
              </div>
            </div>
            <div className="bg900 text100 py-4 px-8 text-center">
              <p className="text-sm">
                Crafted with quill and parchment by Saif Anees ©{" "}
                {new Date().getFullYear()}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
