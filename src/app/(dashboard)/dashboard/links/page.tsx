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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronRight,
  Home,
  Link as LinkIcon,
  Plus,
  Search,
  Copy,
  BarChart2,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for links
const mockLinks = [
  {
    id: "1",
    title: "Product Launch",
    originalUrl: "https://example.com/products/new-product-2023-launch-details",
    shortUrl: "bloom.io/prod23",
    clicks: 5243,
    createdAt: "2023-06-15",
    category: "Marketing",
    status: "active",
  },
  {
    id: "2",
    title: "Summer Sale",
    originalUrl: "https://example.com/promotions/summer-sale-2023-special-discounts",
    shortUrl: "bloom.io/sum23",
    clicks: 4829,
    createdAt: "2023-06-20",
    category: "Sales",
    status: "active",
  },
  {
    id: "3",
    title: "Newsletter Signup",
    originalUrl: "https://example.com/newsletter/signup?source=website&campaign=july",
    shortUrl: "bloom.io/news",
    clicks: 3671,
    createdAt: "2023-07-01",
    category: "Marketing",
    status: "active",
  },
  {
    id: "4",
    title: "Documentation",
    originalUrl: "https://example.com/docs/api/v2/reference",
    shortUrl: "bloom.io/docs",
    clicks: 2984,
    createdAt: "2023-05-10",
    category: "Support",
    status: "active",
  },
  {
    id: "5",
    title: "Support Page",
    originalUrl: "https://example.com/customer-support/contact",
    shortUrl: "bloom.io/help",
    clicks: 2541,
    createdAt: "2023-04-22",
    category: "Support",
    status: "active",
  },
  {
    id: "6",
    title: "Blog Post: SEO Tips",
    originalUrl: "https://example.com/blog/10-seo-tips-for-2023",
    shortUrl: "bloom.io/seo23",
    clicks: 1987,
    createdAt: "2023-07-12",
    category: "Content",
    status: "active",
  },
  {
    id: "7",
    title: "Webinar Registration",
    originalUrl: "https://example.com/events/webinar/digital-marketing-trends-2023/register",
    shortUrl: "bloom.io/webinar",
    clicks: 1854,
    createdAt: "2023-07-18",
    category: "Events",
    status: "active",
  },
  {
    id: "8",
    title: "E-book Download",
    originalUrl: "https://example.com/resources/ebooks/digital-transformation-guide",
    shortUrl: "bloom.io/ebook",
    clicks: 1632,
    createdAt: "2023-06-30",
    category: "Content",
    status: "active",
  },
  {
    id: "9",
    title: "Pricing Page",
    originalUrl: "https://example.com/pricing?utm_source=shortlink",
    shortUrl: "bloom.io/price",
    clicks: 1521,
    createdAt: "2023-05-15",
    category: "Sales",
    status: "active",
  },
  {
    id: "10",
    title: "Job Openings",
    originalUrl: "https://example.com/careers/open-positions",
    shortUrl: "bloom.io/jobs",
    clicks: 1245,
    createdAt: "2023-07-05",
    category: "HR",
    status: "active",
  },
];

export default function LinksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Filter links based on search term and category
  const filteredLinks = mockLinks.filter((link) => {
    const matchesSearch =
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.shortUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "all" || link.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = ["all", ...new Set(mockLinks.map((link) => link.category))];

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Links</h1>
        <p className="text-muted-foreground">Manage your links and track their performance.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Links</CardTitle>
          <CardDescription>
            You have {mockLinks.length} links. Click on a link to view detailed analytics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search links..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={categoryFilter}
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                  >
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Short URL</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLinks.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell className="font-medium">{link.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {link.shortUrl}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          title="Copy URL"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          title="Open link"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{link.clicks.toLocaleString()}</TableCell>
                    <TableCell>{link.category}</TableCell>
                    <TableCell>{new Date(link.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">Open menu</span>
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <BarChart2 className="mr-2 h-4 w-4" />
                            View Analytics
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Link
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Link
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
