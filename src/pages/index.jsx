import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Feather, Quote, BookOpen, Library, Check } from "lucide-react";
import Layout from "./Layout";
import Hero from "@/components/about/Hero";
import { useLibrary } from "@/context/LibraryContext";
import { useEffect } from "react";
import { useBlogs } from "@/context/BlogContext";
import { useGoals } from "@/context/GoalContext";
import { useUser } from "@/context/UserContext";
import Goals from "@/components/goals/Goals";
import CurrentlyReading from "@/components/CurrentlyReadingBooks";
import { Button } from "@/components/ui/button";
import PopularBlogs from "@/components/blogs/PopularBlogs";

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
      <div className="min-h-screen pb-12">
        <Hero blogs={blogs?.length} books={books?.length} />
        <div className="">
          {/* Introduction */}
          <section className="px-8 max-sm:px-4 mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <Image
                src={userProfile?.avatarUrl}
                alt="Portrait of the Scribe"
                width={300}
                height={300}
                className="rounded-full aspect-square object-cover"
              />
              <div>
                <h4 className="font-medium mt-2">{userProfile?.name}</h4>

                <section className="mb-12">
                  <h2 className="text-2xl font-semibold mb-4">
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
          <section className="px-8 max-sm:px-4 mb-12">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              My Literary Pursuits
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="text-center p-4">
                  <Feather className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Writing Tales</h3>
                  <p className="">
                    Writing stories, learning techniques, and being inspired for
                    my literary creations.
                  </p>
                  {/* <Button variant="outline">View Works</Button> */}
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center p-4">
                  <BookOpen className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Reviewing Books
                  </h3>
                  <p className="">
                    Explore my analyses of classic and contemporary literature.
                  </p>
                  {/* <Button variant="outline">Read Reviews</Button> */}
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center p-4">
                  <Library className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Collecting Tomes
                  </h3>
                  <p className="">
                    Collecting thought provoking books of different themes,
                    styles, and authors.
                  </p>
                  {/* <Button variant="outline">Visit Library</Button> */}
                </CardContent>
              </Card>
            </div>
          </section>

          <PopularBlogs />

          <CurrentlyReading />

          {/* Philosophy */}
          {/* <section className="px-8 max-sm:px-4 mb-12">
            <h2 className="text-2xl font-semibold mb-6">Creeds</h2>
            <p className="text800 mb-4">I adhere to these sacred principles:</p>
            <ul className="list-disc list-inside text800 mb-4 space-y-2">
              <li className="flex items-center gap-2">
                <Check size={20} /> Approach books with an open mind.
              </li>
              <li className="flex items-center gap-2">
                <Check size={20} /> Judge by content, not cover.
              </li>
              <li className="flex items-center gap-2">
                <Check size={20} /> Share thoughts honestly and respectfully.
              </li>
              <li className="flex items-center gap-2">
                <Check size={20} /> Celebrate diverse literary voices.
              </li>
            </ul>
          </section> */}

          {/* Favorite Quotes */}
          <section className="px-8 max-sm:px-4 mb-12">
            <h2 className="text-2xl font-semibold mb-6">Words of Wisdom</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="py-6">
                  <Quote className="w-8 h-8 text700 mx-auto mb-4" />
                  <p className="text800 text-center italic mb-2">
                    &quot;A reader lives a thousand lives before he dies . . .
                    The man who never reads lives only one.&quot;
                  </p>
                  <p className="text700 text-center">- George R.R. Martin</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="py-6">
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

          {/* Milestones */}
          <Goals />
        </div>
      </div>
    </Layout>
  );
}
