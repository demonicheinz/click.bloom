"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronRight,
  Home,
  Palette,
  Upload,
  Globe,
  Smartphone,
  Check,
  X,
  Plus,
  Trash,
  Edit,
  Copy,
  ExternalLink,
  Image,
  Type,
  Paintbrush,
  Layers,
  Layout,
  Monitor,
  Tablet,
  Smartphone as SmartphoneIcon,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  RotateCcw,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function CustomizationPage() {
  const [primaryColor, setPrimaryColor] = useState("#4f46e5");
  const [logoUrl, setLogoUrl] = useState("/logo.svg");
  const [brandName, setBrandName] = useState("ClickBloom");
  const [customDomain, setCustomDomain] = useState("links.example.com");
  const [showBranding, setShowBranding] = useState(true);

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customization</h1>
        <p className="text-muted-foreground">Personalize your link page appearance.</p>
      </div>

      <Tabs
        defaultValue="branding"
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="domains">Domains</TabsTrigger>
        </TabsList>

        <TabsContent
          value="branding"
          className="space-y-6 mt-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Brand Identity</CardTitle>
              <CardDescription>Customize your brand appearance across all links.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="brandName">Brand Name</Label>
                <Input
                  id="brandName"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-md border flex items-center justify-center bg-muted">
                    <img
                      src={logoUrl}
                      alt="Brand logo"
                      className="max-h-12 max-w-12"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-logo.svg";
                      }}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended size: 512x512px. Max file size: 2MB.
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="primaryColor">Brand Color</Label>
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full border"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <Input
                    id="primaryColor"
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-16 h-8 p-0"
                  />
                  <Input
                    value={primaryColor.toUpperCase()}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-28 font-mono text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showBranding">Show ClickBloom Branding</Label>
                  <p className="text-sm text-muted-foreground">
                    Display "Powered by ClickBloom" on your link pages.
                  </p>
                </div>
                <Switch
                  id="showBranding"
                  checked={showBranding}
                  onCheckedChange={setShowBranding}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Brand Settings</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media Preview</CardTitle>
              <CardDescription>
                Customize how your links appear when shared on social media.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="defaultTitle">Default Title</Label>
                <Input
                  id="defaultTitle"
                  placeholder="Enter default title for social shares"
                  defaultValue={`${brandName} - Short Links`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultDescription">Default Description</Label>
                <Input
                  id="defaultDescription"
                  placeholder="Enter default description for social shares"
                  defaultValue={`Links shared by ${brandName}`}
                />
              </div>

              <div className="space-y-2">
                <Label>Default Image</Label>
                <div className="flex items-center gap-4">
                  <div className="h-24 w-40 rounded-md border flex items-center justify-center bg-muted">
                    <img
                      src="/default-avatar.svg"
                      alt="Social preview"
                      className="max-h-24 max-w-40 object-cover rounded-md"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended size: 1200x630px. Max file size: 2MB.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Social Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent
          value="appearance"
          className="space-y-6 mt-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Link Page Appearance</CardTitle>
              <CardDescription>Customize how your link pages look to visitors.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select defaultValue="system">
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System (Auto)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fontFamily">Font Family</Label>
                <Select defaultValue="inter">
                  <SelectTrigger id="fontFamily">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="opensans">Open Sans</SelectItem>
                    <SelectItem value="montserrat">Montserrat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Button Style</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-primary">
                    <div className="w-full h-8 bg-primary rounded-md" />
                    <span className="text-sm">Filled</span>
                  </div>
                  <div className="border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-primary">
                    <div className="w-full h-8 bg-transparent border-2 border-primary rounded-md" />
                    <span className="text-sm">Outline</span>
                  </div>
                  <div className="border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-primary">
                    <div className="w-full h-8 bg-transparent border-b-2 border-primary rounded-md" />
                    <span className="text-sm">Subtle</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Button Shape</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-primary">
                    <div className="w-full h-8 bg-primary rounded-none" />
                    <span className="text-sm">Square</span>
                  </div>
                  <div className="border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-primary border-primary">
                    <div className="w-full h-8 bg-primary rounded-md" />
                    <span className="text-sm">Rounded</span>
                  </div>
                  <div className="border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-primary">
                    <div className="w-full h-8 bg-primary rounded-full" />
                    <span className="text-sm">Pill</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Appearance</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Background</CardTitle>
              <CardDescription>Choose a background for your link pages.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Background Type</Label>
                <Tabs defaultValue="color">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="color">Color</TabsTrigger>
                    <TabsTrigger value="gradient">Gradient</TabsTrigger>
                    <TabsTrigger value="image">Image</TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="color"
                    className="mt-4"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full border"
                        style={{ backgroundColor: "#ffffff" }}
                      />
                      <Input
                        type="color"
                        defaultValue="#ffffff"
                        className="w-16 h-8 p-0"
                      />
                      <Input
                        defaultValue="#FFFFFF"
                        className="w-28 font-mono text-sm"
                      />
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="gradient"
                    className="mt-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Start Color</Label>
                        <div className="flex items-center gap-2 mt-2">
                          <div
                            className="w-8 h-8 rounded-full border"
                            style={{ backgroundColor: "#4f46e5" }}
                          />
                          <Input
                            type="color"
                            defaultValue="#4f46e5"
                            className="w-16 h-8 p-0"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>End Color</Label>
                        <div className="flex items-center gap-2 mt-2">
                          <div
                            className="w-8 h-8 rounded-full border"
                            style={{ backgroundColor: "#10b981" }}
                          />
                          <Input
                            type="color"
                            defaultValue="#10b981"
                            className="w-16 h-8 p-0"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="image"
                    className="mt-4"
                  >
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border rounded-md p-1 cursor-pointer hover:border-primary">
                        <img
                          src="/placeholder-bg-1.jpg"
                          alt="Background option"
                          className="w-full h-24 object-cover rounded"
                        />
                      </div>
                      <div className="border rounded-md p-1 cursor-pointer hover:border-primary">
                        <img
                          src="/placeholder-bg-2.jpg"
                          alt="Background option"
                          className="w-full h-24 object-cover rounded"
                        />
                      </div>
                      <div className="border rounded-md p-1 cursor-pointer hover:border-primary border-primary">
                        <img
                          src="/placeholder-bg-3.jpg"
                          alt="Background option"
                          className="w-full h-24 object-cover rounded"
                        />
                      </div>
                      <div className="border rounded-md p-4 flex items-center justify-center cursor-pointer hover:border-primary col-span-3">
                        <div className="flex flex-col items-center gap-1">
                          <Upload className="h-6 w-6 text-muted-foreground" />
                          <span className="text-sm">Upload custom image</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Background</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent
          value="domains"
          className="space-y-6 mt-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Custom Domain</CardTitle>
              <CardDescription>
                Connect your own domain to use for your shortened links.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="customDomain">Your Custom Domain</Label>
                <div className="flex gap-2">
                  <Input
                    id="customDomain"
                    placeholder="links.yourdomain.com"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    className="shrink-0"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Verify
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter a subdomain (e.g., links.yourdomain.com) or a custom domain.
                </p>
              </div>

              <div className="rounded-md border p-4">
                <h3 className="font-medium mb-2">DNS Configuration</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add the following DNS records to your domain provider to connect your custom
                  domain.
                </p>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="font-medium">Type</div>
                    <div className="font-medium">Name</div>
                    <div className="font-medium">Value</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>CNAME</div>
                    <div>links</div>
                    <div className="flex items-center gap-2">
                      <span className="truncate">cname.clickbloom.io</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>TXT</div>
                    <div>_clickbloom</div>
                    <div className="flex items-center gap-2">
                      <span className="truncate">verify=abc123def456</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center p-4 rounded-md bg-muted">
                <div className="mr-4">
                  <Globe className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">Domain Status: Not Connected</h3>
                  <p className="text-sm text-muted-foreground">
                    Your domain is not yet connected. Please add the DNS records and verify.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Domain Settings</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Default URL Structure</CardTitle>
              <CardDescription>Configure how your shortened URLs look.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="urlPrefix">URL Prefix</Label>
                <Select defaultValue="none">
                  <SelectTrigger id="urlPrefix">
                    <SelectValue placeholder="Select prefix" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (domain.com/code)</SelectItem>
                    <SelectItem value="go">go (domain.com/go/code)</SelectItem>
                    <SelectItem value="link">link (domain.com/link/code)</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urlLength">URL Code Length</Label>
                <Select defaultValue="6">
                  <SelectTrigger id="urlLength">
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4 characters</SelectItem>
                    <SelectItem value="6">6 characters</SelectItem>
                    <SelectItem value="8">8 characters</SelectItem>
                    <SelectItem value="10">10 characters</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Longer codes provide more unique combinations but are harder to remember.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowCustomCodes">Allow Custom Codes</Label>
                    <p className="text-sm text-muted-foreground">
                      Let users create their own custom URL codes.
                    </p>
                  </div>
                  <Switch
                    id="allowCustomCodes"
                    defaultChecked
                  />
                </div>
              </div>

              <div className="p-4 rounded-md bg-muted">
                <h3 className="font-medium mb-2">Preview</h3>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{customDomain || "links.example.com"}/abc123</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save URL Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
