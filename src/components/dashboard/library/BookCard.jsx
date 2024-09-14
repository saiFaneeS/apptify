import React, { useEffect } from "react";
import { BookOpen, CheckCircle, Clock, Heart, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditBook from "@/components/dashboard/library/EditBook";
import Image from "next/image";
import RemoveBook from "./RemoveBook";

const statusIcons = {
  read: <CheckCircle className="w-5 h-5 text-green-500" />,
  "currently reading": <BookOpen className="w-5 h-5 text-blue-500" />,
  favorite: <Heart className="w-5 h-5 text-red-500" />,
  tbr: <Clock className="w-5 h-5 text-yellow-500" />,
};

const BookCard = ({ book }) => {
  return (
    <Card key={book?.id} className="overflow-hidden">
      <CardHeader>
        <div className="relative h-60 w-full rounded-sm overflow-hidden">
          <Image
            src={book?.coverImage}
            alt={book?.title}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute top-2 right-2 bg-white rounded-full p-1">
            {statusIcons[book?.status]}
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-4">
        <CardTitle className="text-lg mb-2">{book.title}</CardTitle>
        <p className="text-sm text-gray-500">
          Added on: {new Date(book?.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
      <CardFooter className="flex items-center gap-2 p-0 pt-4 w-full">
        <EditBook book={book} />
        <RemoveBook book={book} />
      </CardFooter>
    </Card>
  );
};

export default BookCard;
