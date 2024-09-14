"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Lock, Mail, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { verifyUser } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    verifyUser(email, password);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg100 border-2 border300">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg200 rounded-full p-2 w-16 h-16 flex items-center justify-center">
            <Shield className="w-8 h-8 text800" />
          </div>
          <CardTitle className="text-2xl font-bold text900">
            Welcome to Ye Olde Blog
          </CardTitle>
          <CardDescription className="text700">
            Sign in to access the realm of knowledge
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsContent value="signin">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text800">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text600" />
                      <Input
                        id="email"
                        placeholder="knight@camelot.com"
                        type="email"
                        className="pl-10 bg50 border300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text800">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text600" />
                      <Input
                        id="password"
                        type="password"
                        className="pl-10 bg50 border300"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <Button
                  className="w-full mt-6 bg700 hover:bg600"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Entering the realm..." : "Enter the Realm"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
