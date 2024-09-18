import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default Loading;
