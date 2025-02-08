import Hero from "@/components/blogs/Hero";
import Blogs from "@/components/blogs/Blogs";
import FeaturedBlogs from "@/components/blogs/FeaturedBlogs";
import Layout from "../Layout";

export default function ReviewsPage() {
  return (
    <Layout>
      <Hero />
      <Blogs />
      <FeaturedBlogs />
    </Layout>
  );
}
