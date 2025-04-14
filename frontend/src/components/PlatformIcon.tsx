
import { Instagram, Twitter, Youtube } from "lucide-react";

export type PlatformType = "instagram" | "twitter" | "youtube" | string;

interface PlatformIconProps {
  platform: PlatformType;
  size?: number;
  className?: string;
}

export const getPlatformColor = (platform: PlatformType) => {
  const platformLower = platform.toLowerCase();
  switch (platformLower) {
    case "instagram":
      return "text-pink-500";
    case "twitter":
      return "text-blue-400";
    case "youtube":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

const PlatformIcon = ({ platform, size = 20, className = "" }: PlatformIconProps) => {
  const platformLower = platform.toLowerCase() as PlatformType;
  const colorClass = getPlatformColor(platformLower);
  
  return (
    <span className={`${colorClass} ${className}`}>
      {platformLower === "instagram" && <Instagram size={size} />}
      {platformLower === "twitter" && <Twitter size={size} />}
      {platformLower === "youtube" && <Youtube size={size} />}
    </span>
  );
};

export default PlatformIcon;
