import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Link as LinkIcon, Users, Activity, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to ClickBloom, your link management platform.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Links</CardTitle>
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">237</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5K</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+201 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.3%</div>
            <p className="text-xs text-muted-foreground">+1.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue="overview"
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent
          value="overview"
          className="space-y-4"
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[200px] w-full bg-muted/20 flex items-center justify-center">
                  [Chart Placeholder]
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>You had 265 clicks in the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {[1, 2, 3].map((i) => (
                    <div
                      className="flex items-center"
                      key={i}
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Someone clicked your link
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {i === 1 ? "Just now" : i === 2 ? "2 hours ago" : "5 hours ago"}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        {i === 1 ? "blog.io/seo23" : i === 2 ? "blog.io/webinar" : "blog.io/ebook"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Links</CardTitle>
                <CardDescription>Your best performing links this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {[
                    { name: "Product Launch", clicks: 5243, growth: "+12%" },
                    { name: "Summer Sale", clicks: 4829, growth: "+8%" },
                    { name: "Newsletter", clicks: 3671, growth: "+5%" },
                  ].map((link, i) => (
                    <div
                      className="flex items-center"
                      key={i}
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{link.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {link.clicks.toLocaleString()} clicks
                        </p>
                      </div>
                      <div className="ml-auto font-medium text-green-500">{link.growth}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Links</CardTitle>
                <CardDescription>You created 12 links this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {[
                    { name: "Blog Post: SEO Tips", url: "bloom.io/seo23", date: "2 days ago" },
                    { name: "Webinar Registration", url: "bloom.io/webinar", date: "1 week ago" },
                    { name: "E-book Download", url: "bloom.io/ebook", date: "2 weeks ago" },
                  ].map((link, i) => (
                    <div
                      className="flex items-center"
                      key={i}
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{link.name}</p>
                        <div className="flex items-center pt-2">
                          <span className="text-sm text-muted-foreground">{link.url}</span>
                        </div>
                      </div>
                      <div className="ml-auto font-medium text-muted-foreground">{link.date}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent
          value="analytics"
          className="space-y-4"
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-7">
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Detailed analytics will be displayed here.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full bg-muted/20 flex items-center justify-center">
                  [Analytics Dashboard Placeholder]
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
