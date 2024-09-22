import React, { useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, writeBatch, doc } from "firebase/firestore";

const Seed = () => {
  const addDummyData = async () => {
    try {
      const batch = writeBatch(db);

      // Dummy data for Book Reviews
      const bookReviews = [
        {
          title: "A Journey Beyond the Stars",
          content:
            "An enthralling tale that combines science and human emotion...",
          bookName: "The Cosmic Traveler",
          bookAuthor: "Jane Starfield",
          rating: 4.5,
          coverImage:
            "https://firebasestorage.googleapis.com/v0/b/olde-blog.appspot.com/o/blogCovers%2F1726959116288-blogCovers%252F1726336507082-cp.png?alt=media&token=0d153d5d-b991-4cb4-a997-648976de0598",
          isPublished: true,
          createdAt: "2023-12-01T10:00:00Z",
        },
        {
          title: "The Depths of Reality",
          content:
            "A deep dive into the mind of an author who questions existence...",
          bookName: "The Unreal Mirror",
          bookAuthor: "Philip Wainwright",
          rating: 3.8,
          coverImage:
            "https://firebasestorage.googleapis.com/v0/b/olde-blog.appspot.com/o/blogCovers%2F1726959116288-blogCovers%252F1726336507082-cp.png?alt=media&token=0d153d5d-b991-4cb4-a997-648976de0598",
          isPublished: true,
          createdAt: "2024-02-10T12:15:00Z",
        },
        {
          title: "Adventures in the Unknown",
          content:
            "A fascinating look into uncharted territories, both literal and figurative...",
          bookName: "Lost Worlds",
          bookAuthor: "Ava Knight",
          rating: 4.2,
          coverImage:
            "https://firebasestorage.googleapis.com/v0/b/olde-blog.appspot.com/o/blogCovers%2F1726959116288-blogCovers%252F1726336507082-cp.png?alt=media&token=0d153d5d-b991-4cb4-a997-648976de0598",
          isPublished: true,
          createdAt: "2024-03-05T14:45:00Z",
        },
        {
          title: "A Romance to Remember",
          content:
            "A touching and heartfelt love story that stays with you long after...",
          bookName: "Hearts in Harmony",
          bookAuthor: "Lily Wharton",
          rating: 5.0,
          coverImage:
            "https://firebasestorage.googleapis.com/v0/b/olde-blog.appspot.com/o/blogCovers%2F1726959116288-blogCovers%252F1726336507082-cp.png?alt=media&token=0d153d5d-b991-4cb4-a997-648976de0598",
          isPublished: true,
          createdAt: "2024-04-08T09:30:00Z",
        },
      ];

      // Dummy data for Own Works
      const ownWorks = [
        {
          title: "The Last Kingdom",
          synopsis:
            "A tale of a fallen kingdom and the rise of an unlikely hero...",
          content: "Once upon a time...",
          completionStatus: "completed",
          datePublished: "2024-03-20",
          coverImage:
            "https://firebasestorage.googleapis.com/v0/b/olde-blog.appspot.com/o/blogCovers%2F1726959116288-blogCovers%252F1726336507082-cp.png?alt=media&token=0d153d5d-b991-4cb4-a997-648976de0598",
          tags: ["fantasy", "adventure", "hero"],
          createdAt: "2024-01-10T11:30:00Z",
          viewCount: 345,
        },
        {
          title: "Whispers of the Wind",
          synopsis: "A poetic exploration of nature's silent beauty...",
          content: "The wind whispers softly...",
          completionStatus: "in-progress",
          datePublished: null,
          coverImage:
            "https://firebasestorage.googleapis.com/v0/b/olde-blog.appspot.com/o/blogCovers%2F1726959116288-blogCovers%252F1726336507082-cp.png?alt=media&token=0d153d5d-b991-4cb4-a997-648976de0598",
          tags: ["poetry", "nature", "reflection"],
          createdAt: "2024-04-10T08:15:00Z",
          viewCount: 89,
        },
        {
          title: "Shadows of the Past",
          synopsis: "An epic historical fiction about love and betrayal...",
          content: "In the shadow of the ancient castle...",
          completionStatus: "completed",
          datePublished: "2024-06-01",
          coverImage:
            "https://firebasestorage.googleapis.com/v0/b/olde-blog.appspot.com/o/blogCovers%2F1726959116288-blogCovers%252F1726336507082-cp.png?alt=media&token=0d153d5d-b991-4cb4-a997-648976de0598",
          tags: ["historical", "drama", "intrigue"],
          createdAt: "2024-02-05T10:00:00Z",
          viewCount: 120,
        },
        {
          title: "Echoes of Eternity",
          synopsis:
            "A philosophical novel delving into the nature of time and existence...",
          content: "The ticking of the clock seemed to slow...",
          completionStatus: "completed",
          datePublished: "2024-06-01",
          coverImage:
            "https://firebasestorage.googleapis.com/v0/b/olde-blog.appspot.com/o/blogCovers%2F1726959116288-blogCovers%252F1726336507082-cp.png?alt=media&token=0d153d5d-b991-4cb4-a997-648976de0598",
          tags: ["philosophy", "time", "existential"],
          createdAt: "2024-03-22T14:20:00Z",
          viewCount: 512,
        },
      ];

      // Dummy data for Library
      const library = [
        {
          title: "The Timekeeper's Dilemma",
          bookAuthor: "Harold Winters",
          coverImage:
            "https://firebasestorage.googleapis.com/v0/b/olde-blog.appspot.com/o/blogCovers%2F1726959116288-blogCovers%252F1726336507082-cp.png?alt=media&token=0d153d5d-b991-4cb4-a997-648976de0598",
          status: "currently reading",
          progress: 45,
        },
        {
          title: "The Forgotten Realm",
          bookAuthor: "Emily Graves",
          coverImage:
            "https://firebasestorage.googleapis.com/v0/b/olde-blog.appspot.com/o/blogCovers%2F1726959116288-blogCovers%252F1726336507082-cp.png?alt=media&token=0d153d5d-b991-4cb4-a997-648976de0598",
          status: "tbr",
          progress: 0,
        },
        {
          title: "Beneath the Surface",
          bookAuthor: "Claire Waters",
          coverImage:
            "https://firebasestorage.googleapis.com/v0/b/olde-blog.appspot.com/o/blogCovers%2F1726959116288-blogCovers%252F1726336507082-cp.png?alt=media&token=0d153d5d-b991-4cb4-a997-648976de0598",
          status: "read",
          progress: 100,
        },
        {
          title: "The Philosopher's Path",
          bookAuthor: "Sophia Sage",
          coverImage:
            "https://firebasestorage.googleapis.com/v0/b/olde-blog.appspot.com/o/blogCovers%2F1726959116288-blogCovers%252F1726336507082-cp.png?alt=media&token=0d153d5d-b991-4cb4-a997-648976de0598",
          status: "favorite",
          progress: 100,
        },
      ];

      // Add Book Reviews to Firestore
      const reviewsRef = collection(db, "blogs");
      bookReviews.forEach((review) => {
        const docRef = doc(reviewsRef);
        batch.set(docRef, review);
      });

      // Add Own Works to Firestore
      const worksRef = collection(db, "works");
      ownWorks.forEach((work) => {
        const docRef = doc(worksRef);
        batch.set(docRef, work);
      });

      // Add Library Books to Firestore
      const libraryRef = collection(db, "library");
      library.forEach((book) => {
        const docRef = doc(libraryRef);
        batch.set(docRef, book);
      });

      // Commit the batch
      await batch.commit();

      console.log("Dummy data added successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    addDummyData();
  }, []);

  return <div>Seeding data... Check console for results.</div>;
};

export default Seed;
