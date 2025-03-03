import { dummyAdmin, dummyLinks } from "@/lib/data/dummy";
import { ProfileHeader } from "@/components/public/profile-header";
import { LinkGrid } from "@/components/public/link-grid";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShareButton } from "@/components/public/share-button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <main className="h-[calc(100vh-2rem)] w-full max-w-2xl">
        <Card className="flex h-full flex-col overflow-hidden">
          <div className="relative">
            <ShareButton />
            <ProfileHeader admin={dummyAdmin} />
          </div>
          <ScrollArea className="flex-1">
            <div className="px-6 py-6">
              <LinkGrid links={dummyLinks} />
            </div>
          </ScrollArea>
          <footer className="border-t border-gray-100 p-4 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} ClickBloom. All rights reserved.
          </footer>
        </Card>
      </main>
    </div>
  );
}
