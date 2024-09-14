import Image from "next/image";
import Layout from "./Layout";
import Hero from "@/components/Hero";
import RecentBlogs from "@/components/RecentBlogs";
import CurrentlyReading from "@/components/CurrentlyReadingBooks";
import FavoriteBooks from "@/components/FavoriteBooks";
import Blogs from "@/components/blogs/Blogs";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Blogs />
      <CurrentlyReading />
      <FavoriteBooks />
    </Layout>
  );
}
