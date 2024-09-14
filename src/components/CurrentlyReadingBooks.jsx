import Image from "next/image";
import { Book, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";

export default function CurrentlyReading() {
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  const currentlyReading = [
    {
      id: 1,
      title: "Le Morte d'Arthur",
      author: "Sir Thomas Malory",
      progress: 65,
      image: "/tr.png",
    },
    {
      id: 2,
      title: "The Book of Margery Kempe",
      author: "Margery Kempe",
      progress: 30,
      image: "/tr.png",
    },
  ];
  useEffect(() => {
    setCurrentlyReadingBooks([
      {
        id: 1,
        title: "Le Morte d'Arthur",
        author: "Sir Thomas Malory",
        progress: 65,
        image: "/tr.png",
      },
      {
        id: 2,
        title: "The Book of Margery Kempe",
        author: "Margery Kempe",
        progress: 30,
        image: "/tr.png",
      },
    ]);
  }, []);
  return (
    <section className="py-12 px-12 bg50">
      <h2 className="text-3xl font-bold text900 mb-6">
        Currently Perusing
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {currentlyReading.map((book) => (
          <div
            key={book.id}
            className="flex items-center bg100 rounded-lg p-4 shadow-md"
          >
            <Image
              src={book.image}
              alt={book.title}
              width={100}
              height={150}
              className="rounded mr-4"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-bold text900 mb-1">
                {book.title}
              </h3>
              <p className="text800 text-sm mb-2">By {book.author}</p>
              <Progress value={book.progress} className="mb-2" />
              <p className="text700 text-sm">
                {book.progress}% complete
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
