import type { Link } from "@/types/link";
import { LinkCard } from "./link-card";

interface LinkGridProps {
  links: Link[];
}

export function LinkGrid({ links }: LinkGridProps) {
  // Group links by category
  const groupedLinks = links.reduce<Record<string, Link[]>>((acc, link) => {
    const category = link.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(link);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(groupedLinks).map(([category, categoryLinks]) => (
        <div key={category}>
          <h2 className="mb-3 text-lg font-semibold text-gray-800">{category}</h2>
          <div className="space-y-3">
            {categoryLinks
              .sort((a, b) => a.position - b.position)
              .map((link) => (
                <LinkCard
                  key={link.id}
                  link={link}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
