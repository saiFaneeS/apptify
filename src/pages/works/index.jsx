import React from "react";
import Hero from "@/components/works/Hero";
import Works from "@/components/works/Works";
import Layout from "../Layout";
import FeaturedWork from "@/components/works/FeaturedWork";
import CurrentlyReading from "@/components/CurrentlyReadingBooks";

export default function WorksPage() {
  return (
    <Layout>
      <Hero />
      <Works />
      <FeaturedWork />
      <CurrentlyReading />
    </Layout>
  );
}
