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
  Search,
  BookHeart,
  BookMarked,
  Glasses,
  Heart,
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Layout from "./Layout";
import { useLibrary } from "@/context/LibraryContext";
import Goals from "@/components/goals/Goals";
import Hero from "@/components/library/Hero";
import { Card } from "@/components/ui/card";
import { Grid, List } from "lucide-react";

export default function Library() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [layout, setLayout] = useState("grid");

  const { books, getAllBooks } = useLibrary();

  const tabData = [
    { value: "all", icon: LibraryBig, label: "All" },
    { value: "currently reading", icon: BookOpen, label: "Currently Reading" },
    { value: "tbr", icon: BookDashed, label: "To Be Read" },
    { value: "favorite", icon: Star, label: "Favorite" },
    { value: "read", icon: BookCheck, label: "Read" },
  ];

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

  const renderBookCard = (book, layout) => {
    const isListView = layout === "list";

    return (
      <Card key={book?.id} className={isListView ? "overflow-hidden" : ""}>
        <div
          className={
            isListView ? "flex items-center" : "flex items-start gap-4"
          }
        >
          <Image
            src={book?.image || book?.coverImage}
            alt={book?.title}
            width={isListView ? 60 : 120}
            height={isListView ? 120 : 180}
            className={`rounded-sm shadow-md ${isListView ? "mr-4" : ""}`}
          />
          <div
            className={`w-full ${
              isListView
                ? "flex-1 flex max-sm:flex-col items-center max-sm:items-start justify-between max-sm:justify-start "
                : ""
            }`}
          >
            <div>
              <h3
                className={`font-semibold ${
                  isListView ? "text-lg" : "text-xl mb-2"
                }`}
              >
                {book?.title}
              </h3>
              <p className={isListView ? "text-sm" : "mb-2"}>
                By {book?.author || book?.bookAuthor}
              </p>
            </div>
            {book.status === "currently reading" &&
              book?.progress !== undefined && (
                <div
                  className={`${
                    isListView ? "flex items-center gap-4" : "mt-4"
                  }`}
                >
                  <div className="p-1.5 aspect-square bg-foreground/90 text-background h-fit w-fit rounded-full">
                    <Glasses size={18} />
                  </div>
                  <div className="mt-4">
                    <Progress value={book?.progress} className="h-2 mb-2" />
                    <p className="text-sm">{book?.progress}% complete</p>
                  </div>
                </div>
              )}
            {book.status === "read" && (
              <div
                className={`${isListView ? "flex items-center gap-4" : "mt-4"}`}
              >
                <div className="p-1.5 aspect-square bg-emerald-500/90 text-background h-fit w-fit rounded-full">
                  <BookCheck size={18} />
                </div>
                <div className="mt-4">
                  <Progress value={"100"} className="h-2 mb-2" />
                  <p className="text-sm">100% complete</p>
                </div>
              </div>
            )}
            {book.status === "tbr" && (
              <div
                className={`${
                  isListView ? "flex items-center gap-4 mt-4" : "mt-4"
                }`}
              >
                <div className="p-1.5 aspect-square bg-amber-500/90 text-background h-fit w-fit rounded-full">
                  <BookMarked size={18} />
                </div>
              </div>
            )}
            {book.status === "favorite" && (
              <div
                className={`${isListView ? "flex items-center gap-4" : "mt-4"}`}
              >
                <div className="p-1.5 aspect-square bg-rose-500/90 text-background h-fit w-fit rounded-full">
                  <Heart size={18} />
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <Layout>
      {/* Hero section */}
      <Hero />
      {/* Search bar */}
      <div className="px-8 max-sm:px-4 mb-4">
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
          <Button className="flex items-center md:px-12">
            <Search className="mr-2 h-4 w-4" />
            Find
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="space-y-8 px-4 sm:px-8 mb-12">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center gap-4 mb-6">
            {/* Mobile view: Select dropdown */}
            <div className="sm:hidden w-full">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {tabData.map((tab) => (
                    <SelectItem key={tab.value} value={tab.value}>
                      <div className="flex items-center">
                        <tab.icon className="mr-2 h-4 w-4" />
                        {tab.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Desktop view: TabsList */}
            <TabsList className="hidden sm:flex w-fit">
              {tabData.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="data-[state=active]:bg700 data-[state=active]:text100 flex items-center whitespace-nowrap"
                >
                  <tab.icon className="mr-2 h-4 w-4" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0"
              onClick={() => setLayout(layout === "grid" ? "list" : "grid")}
            >
              {layout === "grid" ? <List size={20} /> : <Grid size={20} />}
            </Button>
          </div>

          {/* Tab content */}
          {tabData.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div
                className={
                  layout === "grid"
                    ? "grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "flex flex-col gap-4"
                }
              >
                {filteredBooks?.map((book) => renderBookCard(book, layout))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Goals />
    </Layout>
  );
}
