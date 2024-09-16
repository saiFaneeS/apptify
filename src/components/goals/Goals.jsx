import { useGoals } from "@/context/GoalContext";
import { Target } from "lucide-react";
import React, { useEffect } from "react";
import { Progress } from "../ui/progress";
import { Card } from "../ui/card";

const Goals = () => {
  const { goals, fetchAllGoals } = useGoals();

  useEffect(() => {
    fetchAllGoals();
  }, []);

  return (
    <div className="px-8 max-sm:px-4 mb-8">
      <h2 className="text-3xl font-semibold mb-8">Reading Quests</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals?.map((goal) => (
          <Card key={goal.id}>
            <div className="flex items-center mb-4">
              <Target className="w-6 h-6 mr-3 shrink-0" />
              <h4 className="text-lg font-bold text900">{goal.title}</h4>
            </div>
            {goal.progress && (
              <>
                <Progress value={goal.progress} className="h-2 mb-3" />
                <p className="font-medium">{goal.progress}% achieved</p>
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Goals;
