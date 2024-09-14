import Image from 'next/image'
import { Star, User, Scroll } from 'lucide-react'
import { Button } from "@/components/ui/button"

const favoriteBooks = [
  {
    id: 1,
    title: "The Divine Comedy",
    author: "Dante Alighieri",
    coverImage: "/hp1.webp",
    rating: 5,
    review: "A masterpiece that takes the reader on a journey through the afterlife..."
  },
  {
    id: 2,
    title: "The Decameron",
    author: "Giovanni Boccaccio",
    coverImage: "/hp1.webp",
    rating: 4,
    review: "A collection of novellas that provides a vivid glimpse into medieval life..."
  },
  {
    id: 3,
    title: "Sir Gawain and the Green Knight",
    author: "Unknown",
    coverImage: "/hp1.webp",
    rating: 5,
    review: "An Arthurian romance that beautifully blends chivalric and supernatural elements..."
  }
]

export default function FavoriteBooks() {
  return (
    <section className="py-12 px-12 bg50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold font-serif text900 mb-8">
          Tomes of Great Esteem
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {favoriteBooks.map((book) => (
            <div key={book.id} className="bg100  rounded-lg shadow-lg overflow-hidden transform transition duration-500">
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
                    <h3 className="text-xl font-serif font-bold text900 mb-2">{book.title}</h3>
                    <div className="flex items-center text700 text-sm mb-2">
                      <User className="w-4 h-4 mr-2" />
                      <span>{book.author}</span>
                    </div>
                    <div className="flex items-center text700 text-sm mb-2">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${index < book.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
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
  )
}