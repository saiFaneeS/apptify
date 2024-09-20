import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useWorks } from "@/context/WorkContext";

export function DeleteWork({ work, onClose }) {
  const [open, setOpen] = useState(false);
  const { deleteWork } = useWorks();

  const handleDelete = () => {
    deleteWork(work?.id);
    setOpen(false);
    // onClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="border800 text800 hover:bg200"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg100 border-2 border300">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text900">
            Confirm Deletion
          </DialogTitle>
          <DialogDescription className="text700">
            Are you certain you wish to remove this work from your portfolio? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text800 font-semibold">Title: {work?.title}</p>
          <p className="text700 mt-2">
            This work will be permanently removed from your portfolio.
          </p>
        </div>
        <DialogFooter className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="bg100 text900 hover:bg200"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
