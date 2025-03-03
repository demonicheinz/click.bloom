"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";

const shareOptions = [
  {
    name: "WhatsApp",
    icon: "/social-icons/whatsapp.svg",
    shareUrl: (url: string) => `https://wa.me/?text=${encodeURIComponent(url)}`,
  },
  {
    name: "Facebook",
    icon: "/social-icons/facebook.svg",
    shareUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "Gmail",
    icon: "/social-icons/gmail.svg",
    shareUrl: (url: string) => `mailto:?body=${encodeURIComponent(url)}`,
  },
  {
    name: "Discord",
    icon: "/social-icons/discord.svg",
    shareUrl: (url: string) => `https://discord.com/share?url=${encodeURIComponent(url)}`,
  },
  {
    name: "Telegram",
    icon: "/social-icons/telegram.svg",
    shareUrl: (url: string) => `https://t.me/share/url?url=${encodeURIComponent(url)}`,
  },
  {
    name: "Copy Link",
    icon: "/social-icons/copy-link.svg",
    action: async (url: string) => {
      try {
        await navigator.clipboard.writeText(url);
        return true;
      } catch (err) {
        console.error("Failed to copy link:", err);
        return false;
      }
    },
  },
];

export function ShareButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const handleShare = async (option: (typeof shareOptions)[0]) => {
    if (option.action) {
      const success = await option.action(pageUrl);
      if (success) {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      }
    } else if (option.shareUrl) {
      window.open(option.shareUrl(pageUrl), "_blank");
      setIsOpen(false);
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: "Check out my profile",
        text: "Check out my profile on ClickBloom",
        url: pageUrl,
      });
      setIsOpen(false);
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-9 w-9 rounded-full hover:bg-gray-100"
        >
          <Image
            src="/icons/share.svg"
            alt="Share"
            width={22}
            height={22}
            className="opacity-80"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between px-2">
            <span>Share link</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-2">
          <div className="flex items-center gap-2 rounded-md border bg-muted/50 p-2">
            <Image
              src="/icons/link.svg"
              alt="Link"
              width={20}
              height={20}
              className="opacity-60"
            />
            <div className="flex-1">
              <span
                className={`text-sm transition-all duration-200 ${isCopied ? "text-green-600 font-medium" : ""}`}
              >
                {isCopied ? "Copied!" : pageUrl}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleShare(shareOptions[5])}
            >
              <Image
                src={isCopied ? "/icons/check.svg" : "/icons/copy.svg"}
                alt={isCopied ? "Copied" : "Copy"}
                width={16}
                height={16}
                className={isCopied ? "text-green-600" : "opacity-60"}
              />
            </Button>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Share using</h3>
            <div className="grid grid-cols-5 gap-2">
              {shareOptions.slice(0, 4).map((option) => (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => handleShare(option)}
                  className="flex flex-col items-center gap-1 rounded-lg p-2 transition-colors hover:bg-gray-100"
                >
                  <div className="relative h-10 w-10">
                    <Image
                      src={option.icon}
                      alt={option.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs text-gray-600">{option.name}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={handleNativeShare}
                className="flex flex-col items-center gap-1 rounded-lg p-2 transition-colors hover:bg-gray-100"
              >
                <div className="relative h-10 w-10">
                  <Image
                    src="/icons/more.svg"
                    alt="More"
                    fill
                    className="object-contain opacity-60"
                  />
                </div>
                <span className="text-xs text-gray-600">More apps</span>
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
