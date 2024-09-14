"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Moon, Sun, Bell, Settings, User, Plus } from "lucide-react";

const colorVariables = [
  { name: "background", lightValue: "43 74% 66%", darkValue: "20 14.3% 4.1%" },
  { name: "foreground", lightValue: "20 14.3% 4.1%", darkValue: "43 74% 66%" },
  { name: "card", lightValue: "44 52% 80%", darkValue: "20 14.3% 4.1%" },
  {
    name: "card-foreground",
    lightValue: "20 14.3% 4.1%",
    darkValue: "44 52% 80%",
  },
  { name: "popover", lightValue: "44 52% 80%", darkValue: "20 14.3% 4.1%" },
  {
    name: "popover-foreground",
    lightValue: "20 14.3% 4.1%",
    darkValue: "44 52% 80%",
  },
  { name: "primary", lightValue: "27 96% 61%", darkValue: "27 96% 61%" },
  {
    name: "primary-foreground",
    lightValue: "60 9.1% 97.8%",
    darkValue: "24 9.8% 10%",
  },
  { name: "secondary", lightValue: "0 74% 39%", darkValue: "0 74% 39%" },
  {
    name: "secondary-foreground",
    lightValue: "60 9.1% 97.8%",
    darkValue: "24 9.8% 10%",
  },
  { name: "muted", lightValue: "60 4.8% 95.9%", darkValue: "12 6.5% 15.1%" },
  {
    name: "muted-foreground",
    lightValue: "25 5.3% 44.7%",
    darkValue: "24 5.4% 63.9%",
  },
  { name: "accent", lightValue: "12 6.5% 15.1%", darkValue: "60 4.8% 95.9%" },
  {
    name: "accent-foreground",
    lightValue: "60 9.1% 97.8%",
    darkValue: "24 9.8% 10%",
  },
  {
    name: "destructive",
    lightValue: "0 84.2% 60.2%",
    darkValue: "0 62.8% 30.6%",
  },
  {
    name: "destructive-foreground",
    lightValue: "60 9.1% 97.8%",
    darkValue: "60 9.1% 97.8%",
  },
  { name: "border", lightValue: "20 5.9% 90%", darkValue: "12 6.5% 15.1%" },
  { name: "input", lightValue: "20 5.9% 90%", darkValue: "12 6.5% 15.1%" },
  { name: "ring", lightValue: "27 96% 61%", darkValue: "27 96% 61%" },
];

export default function ColorModeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [colors, setColors] = useState(colorVariables);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    updateCssVariables();
  }, [isDarkMode, colors]);

  const updateCssVariables = () => {
    colors.forEach((color) => {
      const value = isDarkMode ? color.darkValue : color.lightValue;
      document.documentElement.style.setProperty(`--${color.name}`, value);
    });
  };

  const handleColorChange = (name, value) => {
    setColors(
      colors.map((color) =>
        color.name === name
          ? { ...color, [isDarkMode ? "darkValue" : "lightValue"]: value }
          : color
      )
    );
  };

  return (
    <div className="bg-background text-foreground p-6 px-80 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Color Mode Switcher</h1>
        <div className="flex items-center space-x-2">
          <Sun className="h-5 w-5" />
          <Switch
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
            aria-label="Toggle dark mode"
          />
          <Moon className="h-5 w-5" />
        </div>
      </div>

      <Tabs defaultValue="colors" className="mb-8">
        <TabsList>
          <TabsTrigger value="colors">Color Variables</TabsTrigger>
          <TabsTrigger value="preview">Component Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="colors">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {colors.map((color) => (
              <div key={color.name} className="space-y-2">
                <Label htmlFor={color.name}>{color.name}</Label>
                <div className="flex space-x-2">
                  <Input
                    id={color.name}
                    value={isDarkMode ? color.darkValue : color.lightValue}
                    onChange={(e) =>
                      handleColorChange(color.name, e.target.value)
                    }
                  />
                  <div
                    className="w-10 h-10 rounded border"
                    style={{
                      backgroundColor: `hsl(${
                        isDarkMode ? color.darkValue : color.lightValue
                      })`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="preview">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>This is a card description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the main content of the card.</p>
              </CardContent>
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            </Card>

            <div className="flex space-x-4">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>

            <div className="flex space-x-4">
              <Badge>Default Badge</Badge>
              <Badge variant="secondary">Secondary Badge</Badge>
              <Badge variant="destructive">Destructive Badge</Badge>
              <Badge variant="outline">Outline Badge</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">
                  john@example.com
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="slider">Slider</Label>
              <Slider defaultValue={[33]} max={100} step={1} />
            </div>

            <div className="space-y-2">
              <Label>Progress</Label>
              <Progress value={66} />
            </div>

            <div className="flex space-x-4">
              <Button size="icon">
                <Bell />
              </Button>
              <Button size="icon">
                <Settings />
              </Button>
              <Button size="icon">
                <User />
              </Button>
              <Button size="icon">
                <Plus />
              </Button>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-muted-foreground">
                This is muted text in a muted background.
              </p>
            </div>

            <div className="grid grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`h-20 rounded-md flex items-center justify-center text-white font-bold`}
                  style={{ backgroundColor: `hsl(var(--chart-${i}))` }}
                >
                  Chart {i}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
