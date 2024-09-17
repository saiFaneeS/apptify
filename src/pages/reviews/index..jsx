import Hero from "@/components/blogs/Hero";
import Blogs from "@/components/blogs/Blogs";
import FeaturedBlogs from "@/components/blogs/FeaturedBlogs";
import CurrentlyReading from "@/components/CurrentlyReadingBooks";
import PopularBlogs from "@/components/blogs/PopularBlogs";
import Layout from "../Layout";

export default function ReviewsPage() {
  return (
    <Layout>
      <Hero />
      <Blogs />
      <FeaturedBlogs />
      <CurrentlyReading />
    </Layout>
  );
}
