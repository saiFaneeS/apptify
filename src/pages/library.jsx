"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Book,
  Filter,
  Target,
  BookOpen,
  Star,
  LibraryBig,
  BookCheck,
  BookDashed,
} from "lucide-react";
import Layout from "./Layout";
import { useLibrary } from "@/context/LibraryContext";
import Goals from "@/components/goals/Goals";
import Hero from "@/components/library/Hero";
import { Card } from "@/components/ui/card";

export default function Library() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const { books, getAllBooks } = useLibrary();

  useEffect(() => {
    setFilteredBooks(
      books?.filter(
        (book) =>
          (activeTab === "all" || book?.status === activeTab) &&
          book?.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (genreFilter === "" || book?.genre === genreFilter)
      )
    );
  }, [books, activeTab, searchTerm, genreFilter]);

  useEffect(() => {
    getAllBooks();
  }, []);

  const renderBookCard = (book) => (
    <Card key={book?.id}>
      <div className="flex">
        <Image
          src={book?.image || book?.coverImage}
          alt={book?.title}
          width={120}
          height={180}
          className="rounded-sm shadow-md mr-4"
        />
        <div>
          <h3 className="text-xl font-semibold mb-2">{book?.title}</h3>
          <p className="mb-2">By {book?.author || book?.bookAuthor}</p>
          {/* <p className="text700 mb-2">Genre: {book?.genre}</p> */}
          {book.progress && book?.progress !== undefined && (
            <div className="mt-4">
              <Progress value={book?.progress} className="h-2 mb-2" />
              <p className="text700 text-sm">{book?.progress}% complete</p>
            </div>
          )}
        </div>
      </div>
      {/* {book?.synopsis && (
        <p className="text800 mb-6 line-clamp-3">{book?.synopsis}</p>
      )} */}
    </Card>
  );

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero section */}
        <Hero />
        <div className="container mx-auto px-4 py-12">
          {/* Search bar */}
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

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-8"
          >
            <TabsList className="bg800 text100">
              {["all", "currently reading", "tbr", "favorite", "read"].map(
                (tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="data-[state=active]:bg700 data-[state=active]:text100"
                  >
                    {tab === "currently reading" && (
                      <BookOpen className="mr-2 h-4 w-4" />
                    )}
                    {tab === "all" && <LibraryBig className="mr-2 h-4 w-4" />}
                    {tab === "tbr" && <BookDashed className="mr-2 h-4 w-4" />}
                    {tab === "favorite" && <Star className="mr-2 h-4 w-4" />}
                    {tab === "read" && <BookCheck className="mr-2 h-4 w-4" />}
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </TabsTrigger>
                )
              )}
            </TabsList>
            {["all", "currently reading", "tbr", "favorite", "read"].map(
              (tab) => (
                <TabsContent key={tab} value={tab}>
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredBooks?.map(renderBookCard)}
                  </div>
                </TabsContent>
              )
            )}
          </Tabs>

          <Goals />
        </div>
      </div>
    </Layout>
  );
}
