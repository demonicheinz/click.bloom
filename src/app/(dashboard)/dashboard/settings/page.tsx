"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

export default function SettingsPage() {
  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  const handleAvatarUpload = () => {
    // This would be implemented with Supabase storage
    toast.success("Avatar uploaded successfully");
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs
        defaultValue="account"
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent
          value="account"
          className="space-y-4 pt-4"
        >
          <div className="space-y-4">
            {/* Avatar Upload Section */}
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src="/default-avatar.svg"
                  alt="Profile"
                />
                <AvatarFallback>CB</AvatarFallback>
              </Avatar>
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAvatarUpload}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Change Avatar
                </Button>
                <p className="text-xs text-muted-foreground mt-2">JPG, GIF or PNG. Max size 2MB.</p>
              </div>
            </div>

            <Separator />

            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself"
                className="min-h-32"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Account Management</h3>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">Download your data</p>
                    <p className="text-sm text-muted-foreground">
                      Download all your link data and analytics
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    Download
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">Delete account</p>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all your data
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </TabsContent>

        <TabsContent
          value="password"
          className="space-y-4 pt-4"
        >
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Change Password</h3>
            <div className="grid gap-2">
              <Label htmlFor="currentPassword">Current password</Label>
              <Input
                id="currentPassword"
                type="password"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="newPassword">New password</Label>
              <Input
                id="newPassword"
                type="password"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch id="2fa" />
            </div>
            <div className="rounded-md border p-4 text-sm text-muted-foreground">
              Two-factor authentication is not enabled yet. Enable it to add an extra layer of
              security to your account.
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave}>Update Security Settings</Button>
          </div>
        </TabsContent>

        <TabsContent
          value="advanced"
          className="space-y-4 pt-4"
        >
          <div className="space-y-4">
            <h3 className="text-lg font-medium">API Access</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable API access</p>
                  <p className="text-sm text-muted-foreground">
                    Allow external applications to access your data
                  </p>
                </div>
                <Switch id="api-access" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="apiKey"
                    value="••••••••••••••••••••••••••••••"
                    disabled
                  />
                  <Button
                    variant="outline"
                    className="shrink-0"
                    onClick={() => {
                      toast.success("API key copied to clipboard");
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
