import React from "react";
import { Glasses, BookCheck, Heart, BookMarked } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import EditBook from "@/components/dashboard/library/EditBook";
import RemoveBook from "./RemoveBook";

const StatusIcon = ({ status }) => {
  const icons = {
    "currently reading": {
      Icon: Glasses,
      color: "bg-foreground/90 text-background",
    },
    read: { Icon: BookCheck, color: "bg-emerald-700/90 text-white" },
    favorite: { Icon: Heart, color: "bg-rose-700/90 text-white" },
    tbr: { Icon: BookMarked, color: "bg-amber-700/90 text-white" },
  };

  const { Icon, color } = icons[status] || {};
  return Icon ? (
    <div className={`p-1.5 ${color} w-fit rounded-sm`}>
      <Icon size={14} />
    </div>
  ) : null;
};

const BookCard = ({ book, layout }) => {
  const isListView = layout === "list";

  return (
    <Card className="overflow-hidden">
      <CardContent className={isListView ? "flex items-center gap-4" : ""}>
        <div className={`flex ${isListView ? "flex-1" : ""}`}>
          <div
            className={`relative ${
              isListView ? "h-20 w-14" : "h-40 aspect-[0.65]"
            } rounded-sm overflow-hidden shadow-md mr-4 shrink-0`}
          >
            <Image
              src={book?.coverImage}
              alt={book?.title}
              layout="fill"
              objectFit="cover"
            />
            {/* {!isListView && ( */}
            <div className="absolute left-1 bottom-1">
              <StatusIcon status={book.status} />
            </div>
            {/* )} */}
          </div>
          <div
            className={`flex-1 flex ${
              isListView ? "flex-row items-center" : "flex-col"
            } gap-2 justify-between`}
          >
            <div className={isListView ? "flex-1" : ""}>
              <h3 className="text-base font-semibold mb-2">{book.title}</h3>
              <p className="text-sm">By {book?.author || book?.bookAuthor}</p>
            </div>
            <div className="flex items-center max-sm:flex-col-reverse max-sm:items-end sm:gap-6">
              {(book.status === "currently reading" ||
                book.status === "read") && (
                <div className={`mt-4 ${isListView ? "w-32 " : ""}`}>
                  <Progress
                    value={book.status === "read" ? 100 : book?.progress}
                    className="h-2 mb-2"
                  />
                  <p className="text-sm">
                    {book.status === "read" ? "100" : book?.progress}%{" "}
                    <span className="max-sm:hidden">complete</span>
                  </p>
                </div>
              )}
              {isListView && (
                <>
                  <div className="flex items-center gap-2">
                    <EditBook book={book} />
                    <RemoveBook book={book} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {!isListView && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 max-sm:hidden">
              Added on: {new Date(book?.createdAt).toLocaleDateString()}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <RemoveBook book={book} />
              <EditBook book={book} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookCard;
