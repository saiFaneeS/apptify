"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Book,
  Scroll,
  Filter,
  Target,
  Search,
  BookOpen,
  Star,
} from "lucide-react";
import Layout from "./Layout";

const books = [
  {
    id: 1,
    title: "The Canterbury Tales",
    author: "Geoffrey Chaucer",
    genre: "Poetry",
    startDate: "1399-04-01",
    lastReadDate: "1399-06-15",
    progress: 65,
    synopsis:
      "A collection of 24 stories that runs to over 17,000 lines written in Middle English by Geoffrey Chaucer.",
    image: "/hp1.webp",
    reviewLink: "/reviews/canterbury-tales",
    relatedPosts: [
      {
        title: "Medieval English Literature",
        link: "/blog/medieval-english-literature",
      },
      { title: "The Life of Geoffrey Chaucer", link: "/blog/geoffrey-chaucer" },
    ],
    status: "reading",
  },
  {
    id: 2,
    title: "Beowulf",
    author: "Unknown",
    genre: "Epic Poetry",
    startDate: "1399-05-10",
    lastReadDate: "1399-06-20",
    progress: 40,
    synopsis:
      "Old English epic poem consisting of 3,182 alliterative lines, one of the most important works of Old English literature.",
    image: "/hp1.webp",
    reviewLink: "/reviews/beowulf",
    relatedPosts: [
      { title: "Anglo-Saxon Literature", link: "/blog/anglo-saxon-literature" },
      {
        title: "Monsters in Medieval Literature",
        link: "/blog/medieval-monsters",
      },
    ],
    status: "reading",
  },
  {
    id: 3,
    title: "The Divine Comedy",
    author: "Dante Alighieri",
    genre: "Epic Poetry",
    startDate: "1399-03-15",
    lastReadDate: "1399-06-18",
    progress: 80,
    synopsis:
      "An Italian narrative poem representing a medieval world-view of the afterlife and God.",
    image: "/hp1.webp",
    reviewLink: "/reviews/divine-comedy",
    relatedPosts: [
      {
        title: "Dante's Inferno: A Journey Through Hell",
        link: "/blog/dantes-inferno",
      },
      {
        title: "Medieval Italian Literature",
        link: "/blog/medieval-italian-literature",
      },
    ],
    status: "reading",
  },
  {
    id: 4,
    title: "Le Morte d'Arthur",
    author: "Sir Thomas Malory",
    genre: "Prose",
    synopsis:
      "A compilation of traditional tales about the legendary King Arthur, Guinevere, Lancelot, and the Knights of the Round Table.",
    image: "/hp1.webp",
    status: "to-read",
  },
  {
    id: 5,
    title: "Sir Gawain and the Green Knight",
    author: "Unknown",
    genre: "Poetry",
    synopsis:
      "A late 14th-century Middle English chivalric romance, combining two types of folklore motifs, the beheading game and the exchange of winnings.",
    image: "/hp1.webp",
    status: "to-read",
  },
  {
    id: 6,
    title: "The Decameron",
    author: "Giovanni Boccaccio",
    genre: "Prose",
    synopsis:
      "A collection of novellas containing 100 tales told by a group of young people sheltering in a secluded villa just outside Florence to escape the Black Death.",
    image: "/hp1.webp",
    status: "favorite",
  },
];

const readingGoals = [
  { id: 1, goal: "Read 20 tomes by the end of the year", progress: 60 },
  { id: 2, goal: "Explore 5 new genres", progress: 40 },
  { id: 3, goal: "Complete the works of Geoffrey Chaucer", progress: 30 },
];

export default function Library() {
  const [activeTab, setActiveTab] = useState("reading");
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("");

  const filteredBooks = books.filter(
    (book) =>
      book?.status === activeTab &&
      book?.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (genreFilter === "" || book?.genre === genreFilter)
  );

  return (
    <Layout>
      <div className="min-h-screen bg50">
        {/* Hero Section */}
        <div className="relative bg950 text100 pb-20 pt-40">
          <div className="absolute inset-0">
            <Image
              src="/bg1.jpg"
              alt="Medieval library background"
              layout="fill"
              objectFit="cover"
              className="opacity-20"
            />
          </div>
          <div className="absolute inset-0 bg-[url('/medieval-library.jpg')] bg-cover bg-center opacity-20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center drop-shadow-lg">
              The Grand Library
            </h1>
            <p className="text-xl md:text-2xl text-center max-w-3xl mx-auto">
              Behold, noble readers, the vast collection of tomes and scrolls
              that grace our hallowed shelves. Embark on literary quests through
              time and imagination.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Filtering and Search Options */}
          <div className="mb-8 bg800 p-2 rounded-lg shadow-lg">
            <div className="flex gap-2 justify-between items-center">
              <div className="w-full">
                <Input
                  type="search"
                  placeholder="Search tomes..."
                  className="bg100 text900 placeholder700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  variant="secondary"
                  className="bg100 text900 hover:bg200 px-12"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Find
                </Button>
              </div>
            </div>
          </div>

          {/* Book Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-8"
          >
            <TabsList className="bg800 text100">
              <TabsTrigger
                value="reading"
                className="data-[state=active]:bg700 data-[state=active]:text100"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Currently Reading
              </TabsTrigger>
              <TabsTrigger
                value="to-read"
                className="data-[state=active]:bg700 data-[state=active]:text100"
              >
                <Book className="mr-2 h-4 w-4" />
                To Be Read
              </TabsTrigger>
              <TabsTrigger
                value="favorite"
                className="data-[state=active]:bg700 data-[state=active]:text100"
              >
                <Star className="mr-2 h-4 w-4" />
                Favorites
              </TabsTrigger>
            </TabsList>
            <TabsContent value="reading">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredBooks?.map((book) => (
                  <div
                    key={book?.id}
                    className="bg100 rounded-lg shadow-lg overflow-hidden border-2 border800 transition-transform duration-300 hover:scale-105"
                  >
                    <div className="p-6">
                      <div className="flex mb-6">
                        <Image
                          src={book?.image}
                          alt={book?.title}
                          width={120}
                          height={180}
                          className="rounded-md shadow-md mr-4"
                        />
                        <div>
                          <h2 className="text-2xl font-bold text900 mb-2">
                            {book?.title}
                          </h2>
                          <p className="text800 text-lg mb-2">
                            By {book?.author}
                          </p>
                          <p className="text700 mb-2">
                            Genre: {book?.genre}
                          </p>
                          <div className="mt-4">
                            <Progress
                              value={book?.progress}
                              className="h-2 mb-2"
                            />
                            <p className="text700 text-sm">
                              {book?.progress}% complete
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4 flex justify-between text700 text-sm">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>Started: {book?.startDate}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>Last Read: {book?.lastReadDate}</span>
                        </div>
                      </div>
                      <p className="text800 mb-6 line-clamp-3">
                        {book?.synopsis}
                      </p>
                      <div className="space-y-4">
                        {/* <Link href={book?.reviewLink}>
                          <Button
                            variant="default"
                            size="sm"
                            className="w-full bg700 hover:bg600"
                          >
                            <Book className="mr-2 h-4 w-4" />
                            Read Full Review
                          </Button>
                        </Link> */}
                        {/* <div>
                          <h4 className="text-sm font-medium text900 mb-2">
                            Related Chronicles:
                          </h4>
                          <div className="space-y-2">
                            {book?.relatedPosts?.map((post, index) => (
                              <Link key={index} href={post.link}>
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="w-full text-left p-0 text700 hover:text900"
                                >
                                  <Scroll className="mr-2 h-4 w-4" />
                                  {post.title}
                                </Button>
                              </Link>
                            ))}
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="to-read">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredBooks?.map((book) => (
                  <div
                    key={book?.id}
                    className="bg100 rounded-lg shadow-lg overflow-hidden border-2 border800 transition-transform duration-300 hover:scale-105"
                  >
                    <div className="p-6">
                      <div className="flex mb-6">
                        <Image
                          src={book?.image}
                          alt={book?.title}
                          width={120}
                          height={180}
                          className="rounded-md shadow-md mr-4"
                        />
                        <div>
                          <h2 className="text-2xl font-bold text900 mb-2">
                            {book?.title}
                          </h2>
                          <p className="text800 text-lg mb-2">
                            By {book?.author}
                          </p>
                          <p className="text700 mb-2">
                            Genre: {book?.genre}
                          </p>
                        </div>
                      </div>
                      <p className="text800 mb-6 line-clamp-3">
                        {book?.synopsis}
                      </p>
                      {/* <Button
                        variant="default"
                        size="sm"
                        className="w-full bg700 hover:bg600"
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        Start Reading
                      </Button> */}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="favorite">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredBooks?.map((book) => (
                  <div
                    key={book?.id}
                    className="bg100 rounded-lg shadow-lg overflow-hidden border-2 border800 transition-transform duration-300 hover:scale-105"
                  >
                    <div className="p-6">
                      <div className="flex mb-6">
                        <Image
                          src={book?.image}
                          alt={book?.title}
                          width={120}
                          height={180}
                          className="rounded-md shadow-md mr-4"
                        />
                        <div>
                          <h2 className="text-2xl font-bold text900 mb-2">
                            {book?.title}
                          </h2>
                          <p className="text800 text-lg mb-2">
                            By {book?.author}
                          </p>
                          <p className="text700 mb-2">
                            Genre: {book?.genre}
                          </p>
                        </div>
                      </div>
                      <p className="text800 mb-6 line-clamp-3">
                        {book?.synopsis}
                      </p>
                      {/* <Button
                        variant="default"
                        size="sm"
                        className="w-full bg700 hover:bg600"
                      >
                        <Book className="mr-2 h-4 w-4" />
                        Read Review
                      </Button> */}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Reading Goals Section */}
          <div className="mt-16">
            <h2 className="text-4xl font-bold text900 mb-8 text-center">
              Reading Quests
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {readingGoals?.map((goal) => (
                <div
                  key={goal.id}
                  className="bg100 rounded-lg shadow-lg p-6 border-2 border800"
                >
                  <div className="flex items-center mb-4">
                    <Target className="w-8 h-8 text700 mr-3 shrink-0" />
                    <h3 className="text-xl font-bold text900">
                      {goal.goal}
                    </h3>
                  </div>
                  <Progress value={goal.progress} className="h-3 mb-3" />
                  <p className="text700 text-lg font-medium">
                    {goal.progress}% achieved
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
