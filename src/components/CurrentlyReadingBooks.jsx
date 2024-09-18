import Image from "next/image";
import { Book, Loader2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";
import { useLibrary } from "@/context/LibraryContext";
import { Card } from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import Loading from "./Loading";

export default function CurrentlyReading() {
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  const { books, getAllBooks } = useLibrary();

  useEffect(() => {
    if (!books || books.length === 0) {
      getAllBooks();
    }
  }, [books, getAllBooks]);

  useEffect(() => {
    const currentlyReading = books?.filter(
      (book) => book.status === "currently reading"
    );
    setCurrentlyReadingBooks(currentlyReading);
  }, [books]);

  return (
    <section className="px-8 max-sm:px-4 mb-12">
      <h2 className="text-2xl font-semibold mb-6">Books Currently Perusing</h2>
      {currentlyReadingBooks ? (
        <div className="grid gap-6 md:grid-cols-2">
          {currentlyReadingBooks?.map((book) => (
            <Card key={book.id} className="flex items-center">
              <Image
                src={book.coverImage}
                alt={book.title}
                width={100}
                height={150}
                className="rounded mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-bold text900 mb-1">{book.title}</h3>
                <p className="text800 text-sm mb-2">By {book.bookAuthor}</p>
                <Progress value={book.progress} className="h-2 mb-2" />
                <p className="text700 text-sm">{book.progress}% complete</p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Loading />
      )}
      <div className="flex justify-center">
        <Link href={"/library"}>
          <Button className="mt-6" variant="outline">
            View All
          </Button>
        </Link>
      </div>
    </section>
  );
}
