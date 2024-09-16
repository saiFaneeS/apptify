import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollText, Book, Feather, Mail, MapPin, Quote } from "lucide-react";
import Layout from "./Layout";
import Hero from "@/components/about/Hero";
import { useLibrary } from "@/context/LibraryContext";
import { useEffect } from "react";
import { useBlogs } from "@/context/BlogContext";
import { useGoals } from "@/context/GoalContext";
import { useUser } from "@/context/UserContext";
import Goals from "@/components/goals/Goals";

export default function AboutPage() {
  const { blogs, getAllBlogs } = useBlogs();
  const { books, getAllBooks } = useLibrary();
  const { goals, fetchAllGoals } = useGoals();
  const { userProfile } = useUser();

  useEffect(() => {
    if (!blogs || blogs.length === 0) {
      getAllBlogs();
    }
    if (!books || books.length === 0) {
      getAllBooks();
    }
    if (!goals || goals.length === 0) {
      fetchAllGoals();
    }
  }, [blogs, books, goals, getAllBlogs, getAllBooks, fetchAllGoals]);

  return (
    <Layout>
      <div className="bg50 min-h-screen pb-12">
        <Hero blogs={blogs?.length} books={books?.length} />
        <div className="container mx-auto px-4 py-12">
          {/* Introduction */}
          <section className="mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <Image
                src="/man1.png"
                alt="Portrait of the Scribe"
                width={300}
                height={300}
                className="rounded-full aspect-square object-cover"
              />
              <div>
                <h4 className="font-medium mt-2">{userProfile?.name}</h4>

                <section className="mb-12">
                  <h2 className="text-3xl font-bold text900 mb-4">
                    The Scribe&apos;s Tale
                  </h2>
                  <p className="text800 mb-4">
                    My journey into the world of letters began in the humble
                    scriptorium of my village monastery. As a young novice, I
                    was entrusted with the task of copying ancient manuscripts,
                    a duty that kindled my lifelong passion for the written
                    word.
                  </p>
                  <p className="text800 mb-4">
                    As years passed, my curiosity grew beyond the monastery
                    walls. I embarked on a pilgrimage across the lands,
                    collecting stories, ballads, and wisdom from every corner of
                    the known world. It was during these travels that the idea
                    of Ye Olde Blog was born - a means to share these literary
                    treasures with kindred spirits across the realm.
                  </p>
                </section>
              </div>
            </div>
          </section>

          {/* Focus on Content */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text900 mb-4">
              Literary Pursuits
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <ScrollText className="w-12 h-12 text700 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text900 mb-2 text-center">
                    Chronicles
                  </h3>
                  <p className="text800 text-center">
                    Tales of adventure, romance, and mystery from across the
                    ages
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Book className="w-12 h-12 text700 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text900 mb-2 text-center">
                    Tome Reviews
                  </h3>
                  <p className="text800 text-center">
                    Thoughtful examinations of literary works, both classic and
                    contemporary
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Feather className="w-12 h-12 text700 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text900 mb-2 text-center">
                    Scribal Musings
                  </h3>
                  <p className="text800 text-center">
                    Reflections on the art of reading, writing, and the literary
                    life
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Philosophy */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text900 mb-4">
              The Scribe&apos;s Creed
            </h2>
            <p className="text800 mb-4">
              In my pursuit of literary wisdom, I adhere to these sacred
              principles:
            </p>
            <ul className="list-disc list-inside text800 mb-4 space-y-2">
              <li>
                To approach each tome with an open mind and heart, ready to
                learn and be transformed.
              </li>
              <li>
                To judge not by the cover, but by the contents within, giving
                equal consideration to works both renowned and obscure.
              </li>
              <li>
                To share my thoughts with honesty and respect, recognizing that
                each reader&apos;s journey is unique.
              </li>
              <li>
                To celebrate the diversity of literary voices, seeking out tales
                from all corners of the world and all walks of life.
              </li>
            </ul>
          </section>

          {/* Milestones */}
          <Goals />

          {/* Favorite Quotes */}
          <section>
            <h2 className="text-3xl font-bold text900 mb-4">Words of Wisdom</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <Quote className="w-8 h-8 text700 mx-auto mb-4" />
                  <p className="text800 text-center italic mb-2">
                    &quot;A reader lives a thousand lives before he dies . . .
                    The man who never reads lives only one.&quot;
                  </p>
                  <p className="text700 text-center">- George R.R. Martin</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Quote className="w-8 h-8 text700 mx-auto mb-4" />
                  <p className="text800 text-center italic mb-2">
                    &quot;The person, be it gentleman or lady, who has not
                    pleasure in a good novel, must be intolerably stupid.&quot;
                  </p>
                  <p className="text700 text-center">- Jane Austen</p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
