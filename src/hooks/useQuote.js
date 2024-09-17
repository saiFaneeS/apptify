import { useState, useEffect } from "react";

const quotes = [
  "May your quill be sharp and your ink never run dry.",
  "In the realm of words, every page is a new adventure.",
  "Books are the mirrors of the soul.",
  "A reader lives a thousand lives before he dies.",
  // Add more quotes as desired
];

export function useQuote() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const storedQuote = localStorage.getItem("dailyQuote");
    const storedDate = localStorage.getItem("quoteDate");
    const today = new Date().toDateString();

    if (storedQuote && storedDate === today) {
      setQuote(storedQuote);
    } else {
      const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(newQuote);
      localStorage.setItem("dailyQuote", newQuote);
      localStorage.setItem("quoteDate", today);
    }
  }, []);

  return { quote };
}
