import React from "react";
import Hero from "@/components/works/Hero";
import Works from "@/components/works/Works";
import Layout from "../Layout";
import FeaturedWork from "@/components/works/FeaturedWork";
import CurrentlyReading from "@/components/CurrentlyReadingBooks";
import { Separator } from "@/components/ui/separator";

export default function WorksPage() {
  return (
    <Layout>
      <Hero />
      <Works />
      <FeaturedWork />
      <Separator className="bg-border/30" />
      <CurrentlyReading />
    </Layout>
  );
}
