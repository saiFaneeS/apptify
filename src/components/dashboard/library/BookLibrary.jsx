import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLibrary } from "@/context/LibraryContext";
import AddNewBook from "./AddNewBook";
import BookCard from "./BookCard";
import {
  Loader2,
  Book,
  Heart,
  BookCheck,
  BookMarked,
  LucideGlasses,
  Grid,
  List,
  LibraryBig,
  BookOpen,
  Star,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const BookLibrary = () => {
  const { books, getAllBooks, fetchingBooks } = useLibrary();
  const [activeTab, setActiveTab] = useState("all");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [layout, setLayout] = useState("grid");

  useEffect(() => {
    if (!books || books.length === 0) {
      getAllBooks();
    }
  }, [books, getAllBooks]);

  useEffect(() => {
    if (books) {
      setFilteredBooks(
        activeTab === "all"
          ? books
          : books.filter((book) => book.status === activeTab)
      );
    }
  }, [books, activeTab]);

  const tabOptions = [
    { value: "all", label: "All Books", icon: Book },
    { value: "read", label: "Read", icon: BookCheck },
    { value: "currently reading", label: "Reading", icon: LucideGlasses },
    { value: "favorite", label: "Favorites", icon: Heart },
    { value: "tbr", label: "To Be Read", icon: BookMarked },
  ];

  const getStatistics = () => {
    const total = books?.length || 0;
    const read = books?.filter((book) => book.status === "read").length || 0;
    const reading =
      books?.filter((book) => book.status === "currently reading").length || 0;
    const favorites =
      books?.filter((book) => book.status === "favorite").length || 0;
    const tbr = books?.filter((book) => book.status === "tbr").length || 0;

    return { total, read, reading, favorites, tbr };
  };

  const stats = getStatistics();

  return (
    <div className="px-8 max-sm:px-4 pt-24 pb-8 min-h-screen">
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <div className="flex gap-2 items-center text-lg font-medium">
          <LibraryBig className="h-6 w-6" strokeWidth={1.6}/>
          My Library
        </div>
      </div>

      {/* Statistics Bar */}
      <Card className="mb-6">
        <CardContent className="py-2 text-center">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 gap-y-6">
            <div className="flex flex-col items-center">
              <Book className="h-8 w-8 max-sm:h-6 max-sm:w-6 mb-2 text-primary" />
              <span className="text-xl font-semibold">{stats.total}</span>
              <span className="text-xs text-muted-foreground">Total Books</span>
            </div>
            <div className="flex flex-col items-center">
              <BookCheck className="h-8 w-8 max-sm:h-6 max-sm:w-6 mb-2 text-green-500" />
              <span className="text-xl font-semibold">{stats.read}</span>
              <span className="text-xs text-muted-foreground">Read</span>
            </div>
            <div className="flex flex-col items-center">
              <LucideGlasses className="h-8 w-8 max-sm:h-6 max-sm:w-6 mb-2 text-blue-500" />
              <span className="text-xl font-semibold">{stats.reading}</span>
              <span className="text-xs text-muted-foreground">Reading</span>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="h-8 w-8 max-sm:h-6 max-sm:w-6 mb-2 text-red-500" />
              <span className="text-xl font-semibold">{stats.favorites}</span>
              <span className="text-xs text-muted-foreground">Favorites</span>
            </div>
            <div className="flex flex-col items-center">
              <BookMarked className="h-8 w-8 max-sm:h-6 max-sm:w-6 mb-2 text-yellow-500" />
              <span className="text-xl font-semibold">{stats.tbr}</span>
              <span className="text-xs text-muted-foreground">To Be Read</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Reading Progress</span>
              <span className="text-sm font-medium">
                {Math.round((stats.read / stats.total) * 100)}%
              </span>
            </div>
            <Progress
              value={(stats.read / stats.total) * 100}
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)}
        className="space-y-4"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full sm:w-auto">
            <Select
              value={activeTab}
              onValueChange={(value) => setActiveTab(value)}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {tabOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center">
                      <option.icon className="mr-2 h-4 w-4" />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="hidden lg:block">
            <TabsList>
              {tabOptions.map((option) => (
                <TabsTrigger
                  key={option.value}
                  value={option.value}
                  className="flex items-center"
                >
                  <option.icon className="mr-2 h-4 w-4" />
                  {option.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <div className="flex items-center max-sm:justify-end max-sm:w-full gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setLayout(layout === "grid" ? "list" : "grid")}
            >
              {layout === "grid" ? <List size={20} /> : <Grid size={20} />}
            </Button>
            <AddNewBook />
          </div>
        </div>
        <TabsContent value={activeTab}>
          {fetchingBooks ? (
            <div className="flex justify-center items-center h-[60vh]">
              <Loader2 className="animate-spin h-8 w-8" />
            </div>
          ) : (
            <div
              className={
                layout === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  : "flex flex-col gap-2"
              }
            >
              {filteredBooks?.map((book) => (
                <BookCard book={book} key={book.id} layout={layout} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookLibrary;
