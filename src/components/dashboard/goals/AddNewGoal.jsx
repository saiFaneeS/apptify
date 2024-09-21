"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Plus } from "lucide-react";
import React from "react";
import { Label } from "@/components/ui/label";

const AddNewGoal = ({
  newGoal,
  setNewGoal,
  goals,
  loading,
  error,
  handleCreateGoal,
  handleUpdateGoal,
  handleDeleteGoal,
}) => {
  return (
    <Dialog>
      <DialogTrigger className="p-0">
        <Button className="w-full" size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-2" /> New Quest
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <Plus /> Add New Quest
          </DialogTitle>
          {/* <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription> */}
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <Label>Goal</Label>
            <Input
              placeholder="New quest title"
              value={newGoal.title}
              onChange={(e) =>
                setNewGoal({ ...newGoal, title: e.target.value })
              }
              className="bg50"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label>Progress</Label>
            <Slider
              value={[newGoal.progress]}
              onValueChange={(value) =>
                setNewGoal({ ...newGoal, progress: value[0] })
              }
              max={100}
              step={1}
              className="flex-grow"
            />
            <span className="text-xs font-medium text800 w-8 text-right">
              {newGoal.progress}%
            </span>
          </div>
          {error && <div className="text-red-500">Error: {error}</div>}
          <Button
            onClick={handleCreateGoal}
            className="w-full"
            disabled={!newGoal.title}
          >
            <Plus className="w-4 h-4 mr-2" /> Begin New Quest
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewGoal;
