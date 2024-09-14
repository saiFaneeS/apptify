import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollText, Book, Star, Feather, Calendar } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "The Arthurian Legends: Fact or Fiction?",
    excerpt:
      "Delve into the mythical world of King Arthur and his Knights of the Round Table. Uncover the truths hidden within the mists of Avalon.",
    date: "1242 AD",
    author: "Sir Galahad the Wise",
    type: "chronicle",
    image: "/hp1.webp",
  },
  {
    id: 2,
    title: "Review: 'Beowulf' - A Tale of Heroism",
    excerpt:
      "An in-depth analysis of the Old English epic poem 'Beowulf' and its enduring legacy. Explore the heroic deeds and monstrous foes within this timeless tale.",
    date: "1256 AD",
    author: "Lady Aethelflaed of Mercia",
    type: "review",
    image: "/hp1.webp",
  },
  {
    id: 3,
    title: "The Black Death: A Firsthand Account",
    excerpt:
      "A chilling narrative of the plague that swept through Europe in the 14th century. Witness the devastation and resilience of a world forever changed.",
    date: "1349 AD",
    author: "Brother Cadfael",
    type: "chronicle",
    image: "/hp1.webp",
  },
];

export default function Main() {
  return (
    <>
      <>
        <div className="p-12 bg100">
          {/* Recent Posts */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text900 mb-8">
              Recent Reviews
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg50 border-2 border700 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[101%]"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      {post.type === "chronicle" ? (
                        <ScrollText className="w-5 h-5 text700 mr-2" />
                      ) : (
                        <Book className="w-5 h-5 text700 mr-2" />
                      )}
                      <Badge
                        variant="outline"
                        className="text700 border700"
                      >
                        {post.type === "chronicle"
                          ? "Chronicle"
                          : "Tome Review"}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text900 mb-3">
                      {post.title}
                    </h3>
                    <div className="flex items-center text700 mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{post.date}</span>
                    </div>
                    <div className="flex items-center text700 mb-4">
                      <Feather className="w-4 h-4 mr-2" />
                      <span className="text-sm">{post.author}</span>
                    </div>
                    <p className="text800 mb-6">{post.excerpt}</p>
                    <Button
                      variant="outline"
                      className="w-full border700 text700 hover:bg700 hover:text100"
                    >
                      Read More
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </>
    </>
  );
}
