import Image from "next/image";
import { Star, User, Scroll } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLibrary } from "@/context/LibraryContext";
import { useEffect, useState } from "react";

export default function FavoriteBooks() {
  const [favorites, setFavorites] = useState([]);
  const { books, getAllBooks } = useLibrary();

  useEffect(() => {
    getAllBooks();
  }, [getAllBooks]);

  useEffect(() => {
    const favoritesFiltered = books?.filter(
      (book) => book.status === "favorite"
    );
    setFavorites(favoritesFiltered);
  }, [books]);

  return (
    <section className="py-12 px-12 bg50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold  text900 mb-8">
          Tomes of Great Esteem
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {favorites?.map((book) => (
            <div
              key={book.id}
              className="bg100  rounded-lg shadow-lg overflow-hidden transform transition duration-500"
            >
              <div className="p-4 flex flex-col h-full">
                <div className="flex mb-4">
                  <div className="w-1/3 mr-4">
                    <Image
                      src={book.coverImage}
                      alt={`Cover of ${book.title}`}
                      width={200}
                      height={300}
                      className="rounded-md shadow-md"
                    />
                  </div>
                  <div className="w-2/3">
                    <h3 className="text-xl  font-bold text900 mb-2">
                      {book.title}
                    </h3>
                    <div className="flex items-center text700 text-sm mb-2">
                      <User className="w-4 h-4 mr-2" />
                      <span>{book.author}</span>
                    </div>
                    <div className="flex items-center text700 text-sm mb-2">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < book.rating
                              ? "text-yellow-500 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text800 mb-4 flex-grow">{book.review}</p>
                <Button
                  variant="outline"
                  className="w-full mt-auto text900 border900 hover:bg200"
                >
                  <Scroll className="mr-2 h-4 w-4" />
                  Read Full Review
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
