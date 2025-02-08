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
      <Card className="w-full max-w-md border-2">
        <CardHeader className="text-center mb-8">
          <div className="mx-auto rounded-full p-2 my-2  flex items-center justify-center">
            <Shield className="w-7 h-7" />
          </div>
          <CardTitle className="text-2xl font-semibold">
            Welcome back, Chief.
          </CardTitle>
          <CardDescription>
            Please prove your identity to access the realm
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsContent value="signin">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-1">
                      Your Email
                      {/* <span className="text-foreground/50 font-normal">
                        (Email)
                      </span> */}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
                      <Input
                        id="email"
                        placeholder="knight@camelot.com"
                        type="email"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="flex items-center gap-1"
                    >
                      Password
                      {/* <span className="text-foreground/50 font-normal">
                        (Password)
                      </span> */}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
                      <Input
                        id="password"
                        type="password"
                        className="pl-10"
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
