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
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";

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

  return (
    <div className="px-8 max-sm:px-4 pt-24 pb-8 min-h-screen">
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
