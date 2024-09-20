import React from "react";
import { Glasses, BookCheck, Heart, BookMarked } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import EditBook from "@/components/dashboard/library/EditBook";
import RemoveBook from "./RemoveBook";
import { Separator } from "@/components/ui/separator";

const statusIcons = {
  "currently reading": {
    Icon: Glasses,
    color: "bg-foreground/90 text-background",
  },
  read: { Icon: BookCheck, color: "bg-emerald-700/90 text-white" },
  favorite: { Icon: Heart, color: "bg-rose-700/90 text-white" },
  tbr: { Icon: BookMarked, color: "bg-amber-700/90 text-white" },
};

const BookCard = ({ book, layout }) => {
  const isListView = layout === "list";
  const { Icon, color } = statusIcons[book.status] || {};

  return (
    <Card className={`${isListView ? "p-2" : ""}`}>
      <CardContent className={isListView ? "sm:flex sm:items-center" : ""}>
        <div className={`flex gap-4 ${isListView ? "sm:flex-1" : ""}`}>
          <div
            className={`relative ${
              isListView ? "h-[80px] w-[55px]" : "h-40 w-28"
            } rounded-sm overflow-hidden shadow-md shrink-0`}
          >
            <Image
              src={book?.coverImage}
              alt={book?.title}
              layout="fill"
              objectFit="cover"
            />
            {Icon && !isListView && (
              <div
                className={`absolute left-1 bottom-1 p-1.5 ${color} w-fit rounded-sm`}
              >
                <Icon size={14} />
              </div>
            )}
          </div>
          <div
            className={`flex-1 flex flex-col justify-between ${
              isListView ? "sm:flex-row sm:items-center" : ""
            }`}
          >
            <div
              className={`${
                isListView ? "" : ""
              }`}
            >
              <h3 className="text-sm font-semibold max-sm:mb-1">
                {book.title}
              </h3>
              <p className="text-xs">By {book?.author || book?.bookAuthor}</p>
            </div>
            <div
              className={`flex justify-between gap-2 ${
                isListView
                  ? "sm:flex flex-row items-center sm:gap-8"
                  : "flex-col"
              }`}
            >
              {["currently reading", "read"].includes(book.status) ? (
                <div className={`${isListView ? "" : "w-full"}`}>
                  <Progress
                    value={book.status === "read" ? 100 : book?.progress}
                    className={`${isListView ? "h-1" : "h-1.5"} mb-1`}
                  />
                  <p className="text-xs">
                    {book.status === "read" ? "100" : book?.progress}% complete
                  </p>
                </div>
              ) : (
                <div></div>
              )}
              {Icon && isListView && (
                <div
                  className={`p-1.5 hidden md:block ${color} w-fit rounded-sm`}
                >
                  <Icon size={14} />
                </div>
              )}

              <div
                className={`${
                  isListView
                    ? "sm:mt-0 sm:ml-auto"
                    : "flex justify-between items-center"
                }`}
              >
                <div className="flex items-center gap-2">
                  <EditBook book={book} />
                  <RemoveBook book={book} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;
