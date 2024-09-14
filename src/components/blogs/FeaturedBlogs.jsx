import React from "react";
import { Button } from "../ui/button";
import { Badge, ScrollText } from "lucide-react";
import Image from "next/image";

const featuredPost = {
  id: 5,
  title: "The Divine Comedy: A Journey Through the Afterlife",
  author: "Dante Alighieri",
  reviewer: "Friar Lawrence",
  excerpt:
    "Embark on an allegorical journey through Hell, Purgatory, and Paradise in Dante's masterpiece. This epic poem, a cornerstone of Italian literature and Western canon, weaves a tapestry of medieval theology, politics, and human nature.",
  image: "/hp1.webp",
};

const FeaturedBlogs = () => {
  return (
    <section className="p-12 pb-12 pt-0">
      <h2 className="text-4xl font-bold text900 mb-8">Featured</h2>
      <div className="bg50 border-2 border700 rounded-lg shadow-xl overflow-hidden">
        <div className="md:flex md:items-center">
          <div className="md:w-1/2 max-h-96 flex justify-center items-center">
            <Image
              src={featuredPost.image}
              alt={featuredPost.title}
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 md:w-1/2">
            <span className="mb-4 bg700 text100 rounded-full">
              <Badge className="">Featured Review</Badge>
            </span>
            <h3 className="text-3xl font-bold text900 mb-4">
              {featuredPost.title}
            </h3>
            <p className="text800 mb-2">By {featuredPost.author}</p>
            <p className="text700 mb-4">Reviewed by {featuredPost.reviewer}</p>
            <p className="text800 mb-6">{featuredPost.excerpt}</p>
            <Button className="bg700 hover:bg600 text100">
              <ScrollText className="mr-2 h-4 w-4" />
              Read Full Review
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
