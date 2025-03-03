import type { Link } from "@/types/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface LinkCardProps {
  link: Link;
}

export function LinkCard({ link }: LinkCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <CardContent className="p-4">
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-4"
        >
          {link.icon && (
            <div className="relative h-10 w-10 flex-shrink-0">
              <Image
                src={link.icon}
                alt={link.title}
                fill
                className="rounded object-cover"
              />
            </div>
          )}
          <div className="flex-grow">
            <h2 className="font-medium text-gray-900">{link.title}</h2>
            {link.description && (
              <p className="mt-1 text-sm text-gray-500">{link.description}</p>
            )}
          </div>
          <div className="flex-shrink-0 text-sm text-gray-400">
            {link.click_count} clicks
          </div>
        </a>
      </CardContent>
    </Card>
  );
} 