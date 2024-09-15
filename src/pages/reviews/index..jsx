import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollText, Book, Filter, Star } from "lucide-react";
import Layout from "../Layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import Hero from "@/components/blogs/Hero";
import Blogs from "@/components/blogs/Blogs";
import FeaturedBlogs from "@/components/blogs/FeaturedBlogs";
import CurrentlyReading from "@/components/CurrentlyReadingBooks";
import PopularBlogs from "@/components/blogs/PopularBlogs";

export default function ReviewsPage() {
  return (
    <Layout>
      <Hero />
      <Blogs />
      <FeaturedBlogs />
      <CurrentlyReading />
      <PopularBlogs />
    </Layout>
  );
}
