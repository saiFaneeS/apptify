import TopBar from "@/components/DashNav";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

const DashLayout = ({ children }) => {
  return (
    <div className="bg-accent">
      <TopBar />
      {children}
      <Toaster />
    </div>
  );
};

export default DashLayout;
