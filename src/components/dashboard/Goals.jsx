import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ScrollText, Target, Edit, Loader2, Mountain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGoals } from "@/context/GoalContext";
import AddNewGoal from "./goals/AddNewGoal";
import { ConfirmDeleteGoal } from "./goals/ConfirmDeleteGoal";

export default function Goals() {
  const { toast } = useToast();
  const { goals, fetchAllGoals, createGoal, updateGoal, loading, error } =
    useGoals();

  const [newGoal, setNewGoal] = useState({ title: "", progress: 0 });
  const [editingGoal, setEditingGoal] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    fetchAllGoals();
    setMounted(true);
  }, []);

  const handleCreateGoal = async () => {
    try {
      await createGoal({ ...newGoal, id: `${newGoal.title}-${Date.now()}` });
      setNewGoal({ title: "", progress: 0 });
      toast({ title: "Quest added", description: "Your new quest has begun!" });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to create quest",
        variant: "destructive",
      });
    }
  };

  const handleUpdateGoal = async () => {
    try {
      await updateGoal(editingGoal);
      setEditingGoal(null);
      toast({
        title: "Quest updated",
        description: "Your quest progress has been recorded!",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update quest",
        variant: "destructive",
      });
    }
  };

  const renderGoal = (goal, isEditing) => (
    <div className="flex flex-col gap-4">
      {isEditing ? (
        <Input
          value={editingGoal.title}
          onChange={(e) =>
            setEditingGoal({ ...editingGoal, title: e.target.value })
          }
          className=""
        />
      ) : (
        <div className="flex  justify-between items-center">
          <span className="flex items-center gap-2 font-medium">
            <Target />
            {goal.title}
          </span>
          <div className="flex justify-end gap-2">
            {isEditing ? (
              <>
                <Button onClick={() => handleUpdateGoal(editingGoal)}>
                  Save
                </Button>
                <Button variant="outline" onClick={() => setEditingGoal(null)}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditingGoal(goal)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <ConfirmDeleteGoal goal={goal} />{" "}
              </>
            )}
          </div>
        </div>
      )}
      <div className="flex items-center gap-2">
        <Slider
          value={[isEditing ? editingGoal.progress : goal.progress]}
          onValueChange={(value) =>
            isEditing && setEditingGoal({ ...editingGoal, progress: value[0] })
          }
          max={100}
          step={1}
          className="flex-grow"
        />
        <div className="flex gap-6 items-center">
          <span className="text-xs font-medium w-8 text-right">
            {isEditing ? editingGoal.progress : goal.progress}%
          </span>
          {isEditing && (
            <div className="flex items-center gap-2">
              <Button onClick={() => setEditingGoal(null)} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleUpdateGoal}>Update</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Card className="flex flex-col gap-4 mb-8">
      <CardHeader>
        <CardTitle className="flex items-center w-full justify-between">
          <div className="flex gap-2 items-center text-lg font-semibold pl-1">
            {/* <Mountain className="w-5 h-5" /> */}
            Scribe&apos;s Quests
          </div>
          {mounted && (
            <AddNewGoal
              newGoal={newGoal}
              setNewGoal={setNewGoal}
              handleCreateGoal={handleCreateGoal}
            />
          )}{" "}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          <>
            <ul className="space-y-4">
              {goals?.map((goal) => (
                <Card
                  key={goal.id}
                  className="hover:shadow-lg transition-shadow duration-300 p-4"
                >
                  <div className="relative">
                    {renderGoal(goal, editingGoal?.id === goal.id)}
                  </div>
                </Card>
              ))}
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  );
}
