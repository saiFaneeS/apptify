import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useWorks } from "@/context/WorkContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeftRight, Check, Loader2, Plus } from "lucide-react";

const SetFeaturedWorkModal = ({ currentFeaturedWork }) => {
  const { works, updateFeaturedWork, updatingFeatured } = useWorks();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);

  const handleUpdateFeaturedWork = async () => {
    if (selectedWork && selectedWork !== currentFeaturedWork?.id) {
      await updateFeaturedWork(currentFeaturedWork, selectedWork);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="p-2 h-8" size="sm">
          {updatingFeatured ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <ArrowLeftRight size={16} />
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>
            Select Featured Work
          </DialogTitle>
          <DialogDescription>
            This will be prominently displayed as your featured work.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-4 max-h-[60vh] pr-4 py-2">
          <div className="space-y-4">
            {works
              ?.filter((work) => work.completionStatus === "completed")
              .map((work) => (
                <div
                  key={work.id}
                  className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                    selectedWork?.id === work?.id
                      ? "bg-primary/10 border border-primary"
                      : "border border-border/50 hover:bg-foreground/5 hover:border-foreground/20"
                  }`}
                  onClick={() => setSelectedWork(work)}
                >
                  <div className="relative w-12 h-16 rounded-md overflow-hidden">
                    <Image
                      src={work?.coverImage || "/"}
                      alt={work?.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg leading-snug font-semibold">
                      {work.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {work?.synopsis}
                    </p>
                  </div>
                  {selectedWork?.id === work?.id && (
                    <Check className="w-6 h-6" />
                  )}
                </div>
              ))}
          </div>
        </ScrollArea>
        <div className="mt-4 flex justify-end">
          <Button
            onClick={handleUpdateFeaturedWork}
            disabled={selectedWork?.id === currentFeaturedWork?.id}
            className=""
          >
            {updatingFeatured ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Set as Featured"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SetFeaturedWorkModal;
