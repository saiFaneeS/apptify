import Hero from "@/components/blogs/Hero";
import Blogs from "@/components/blogs/Blogs";
import FeaturedBlogs from "@/components/blogs/FeaturedBlogs";
import CurrentlyReading from "@/components/CurrentlyReadingBooks";
import PopularBlogs from "@/components/blogs/PopularBlogs";
import Layout from "../Layout";
import { Separator } from "@/components/ui/separator";

export default function ReviewsPage() {
  return (
    <Layout>
      <Hero />
      <Blogs />
      <FeaturedBlogs />
      <Separator className="bg-border/80" />
      <CurrentlyReading />
    </Layout>
  );
}
