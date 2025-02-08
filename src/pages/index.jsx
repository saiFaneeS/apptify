import Layout from "./Layout";
import Hero from "@/components/about/Hero";
import FeaturedBlogs from "@/components/blogs/FeaturedBlogs";
import PopularBlogs from "@/components/blogs/PopularBlogs";
import { Head } from "next/document";

export default function AboutPage() {
  return (
    <Layout>
      <Hero />
      <section className="p-page-sides pt-12"></section>
      <FeaturedBlogs />
      <PopularBlogs />
    </Layout>
  );
}
