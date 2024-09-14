"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashLayout from "../DashLayout";
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
  const {
    userProfile,
    updateProfile,
    updateAvatar,
    updatingAvatar,
    loading,
    error,
  } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    // email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || "",
        email: userProfile.email || "",
      });
    }
  }, [userProfile]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await updateProfile(formData.name, formData.email);
    setIsSubmitting(false);
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await updateAvatar(file);
    }
  };

  return (
    <DashLayout>
      <div className="min-h-screen pt-20 md:pt-24 p-4 md:p-8">
        <Card className="max-w-4xl mx-auto bg100 border-2 border300">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text900">
              Scribe Settings
            </CardTitle>
            <CardDescription className="text700">
              Customize thy presence in the realm
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileSubmit}>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 mt-4">
                  <Avatar className="w-20 h-20 flex justify-center items-center">
                    {updatingAvatar ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        <AvatarImage
                          src={
                            userProfile?.avatarUrl ||
                            "/placeholder.svg?height=80&width=80"
                          }
                          className="object-cover"
                          alt="Profile Picture"
                        />
                        <AvatarFallback>
                          {userProfile?.name?.charAt(0) || ""}
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <Input
                    type="file"
                    onChange={handleAvatarChange}
                    accept="image/*"
                  />
                </div>
                {["name", "email"].map((field) => (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field} className="text800">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </Label>
                    <Input
                      id={field}
                      type={field === "email" ? "email" : "text"}
                      value={formData[field]}
                      disabled={field === "email"}
                      onChange={handleChange}
                      className="bg50 border300"
                    />
                  </div>
                ))}
              </div>
              <Button
                type="submit"
                className="mt-6 bg700 hover:bg600"
                disabled={isSubmitting || loading || updatingAvatar}
              >
                {isSubmitting
                  ? "Updating Details..."
                  : updatingAvatar
                  ? "Updating Avatar..."
                  : "Update Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashLayout>
  );
}
