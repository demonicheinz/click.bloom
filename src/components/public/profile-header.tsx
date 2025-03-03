import type { Admin } from "@/types/admin";
import Image from "next/image";

interface ProfileHeaderProps {
  admin: Admin;
}

export function ProfileHeader({ admin }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center space-y-4 border-b border-gray-100 bg-white px-6 py-8">
      <div className="relative h-24 w-24 overflow-hidden rounded-full">
        <Image
          src={admin.avatar_url || "/default-avatar.svg"}
          alt={admin.full_name || "Profile"}
          fill
          className="object-cover"
        />
      </div>
      <h1 className="text-2xl font-bold">{admin.full_name}</h1>
      {admin.bio && <p className="text-center text-gray-600">{admin.bio}</p>}

      <div className="flex space-x-6">
        <a
          href="mailto:contact@heinz.id"
          target="_blank"
          rel="noopener noreferrer"
          className="transform transition-transform duration-200 hover:scale-125"
        >
          <Image
            src="/social-icons/gmail.svg"
            alt="Email"
            width={34}
            height={34}
          />
        </a>
        <a
          href="https://github.com/demonicheinz"
          target="_blank"
          rel="noopener noreferrer"
          className="transform transition-transform duration-200 hover:scale-125"
        >
          <Image
            src="/social-icons/github.svg"
            alt="GitHub"
            width={34}
            height={34}
          />
        </a>
        <a
          href="https://x.com/chrysantastixxx"
          target="_blank"
          rel="noopener noreferrer"
          className="transform transition-transform duration-200 hover:scale-125"
        >
          <Image
            src="/social-icons/x.svg"
            alt="X"
            width={34}
            height={34}
          />
        </a>
        <a
          href="https://instagram.com/chrysantastixxx"
          target="_blank"
          rel="noopener noreferrer"
          className="transform transition-transform duration-200 hover:scale-125"
        >
          <Image
            src="/social-icons/instagram.svg"
            alt="Instagram"
            width={34}
            height={34}
          />
        </a>
      </div>
    </div>
  );
}
