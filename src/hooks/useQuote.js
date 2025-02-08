import { useState, useEffect } from "react";

const quotes = [
  "Talk is cheap. Show me the code.",
  "Technology is best when it brings people together.",
  "The best way to predict the future is to invent it.",
  "Software is eating the world.",
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
