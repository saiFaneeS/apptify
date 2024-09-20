import { useGoals } from "@/context/GoalContext";
import { Pin, Target } from "lucide-react";
import React, { useEffect } from "react";
import { Progress } from "../ui/progress";
import { Card } from "../ui/card";
import Loading from "../Loading";

const Goals = () => {
  const { goals, fetchAllGoals } = useGoals();

  useEffect(() => {
    fetchAllGoals();
  }, []);

  return (
    <div className="px-8 max-sm:px-4 mb-12">
      <h2 className="text-2xl font-semibold mb-5 flex items-center gap-2"><Pin/> Reading Quests</h2>
      {goals ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {goals?.map((goal) => (
            <Card key={goal.id}>
              <div className="flex items-center mb-4">
                <Target className="w-5 h-5 mr-3 shrink-0" />
                <h4 className="text-base font-semibold">{goal.title}</h4>
              </div>
              {goal.progress && (
                <>
                  <Progress value={goal.progress} className="h-2 mb-3" />
                  <p className="font-medium text-sm">{goal.progress}% achieved</p>
                </>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Goals;
