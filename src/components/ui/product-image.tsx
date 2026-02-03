"use client";

import Image from "next/image";
import { useState } from "react";
import { Coffee, Cake, Sparkles, Wine } from "lucide-react";

interface ProductImageProps {
  productId: string;
  productName: string;
  size?: "sm" | "md" | "lg" | "card";
  priority?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { width: 64, height: 64, iconSize: 24 },
  md: { width: 80, height: 80, iconSize: 32 },
  lg: { width: 800, height: 600, iconSize: 64 },
  card: { width: 64, height: 64, iconSize: 24 },
};

const iconMap = {
  coffee: Coffee,
  sweets: Cake,
  aroma: Sparkles,
  tea: Wine,
};

const gradientMap = {
  coffee: "from-amber-100 via-orange-50 to-amber-100",
  sweets: "from-pink-100 via-rose-50 to-pink-100",
  aroma: "from-purple-100 via-indigo-50 to-purple-100",
  tea: "from-green-100 via-emerald-50 to-green-100",
};

export function ProductImage({
  productId,
  productName,
  size = "md",
  priority = false,
  className = "",
}: ProductImageProps) {
  const [imageError, setImageError] = useState(false);
  const dimensions = sizeMap[size];
  const Icon = iconMap[productId as keyof typeof iconMap] || Coffee;
  const gradient = gradientMap[productId as keyof typeof gradientMap] || gradientMap.coffee;

  // 画像読み込みエラー時はフォールバックを表示
  if (imageError) {
    return (
      <div
        className={`relative bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center overflow-hidden ${className}`}
        style={
          size === "lg"
            ? { width: "100%", aspectRatio: "4/3" }
            : { width: dimensions.width, height: dimensions.height }
        }
      >
        <Icon
          className="text-gray-400"
          size={dimensions.iconSize}
          strokeWidth={1.5}
        />
      </div>
    );
  }

  // lgサイズの場合はレスポンシブ対応
  if (size === "lg") {
    return (
      <div className={`relative w-full overflow-hidden rounded-lg ${className}`} style={{ aspectRatio: "4/3" }}>
        <Image
          src={`/${productId}.jpg`}
          alt={productName}
          fill
          priority={priority}
          onError={() => setImageError(true)}
          className="object-cover"
          sizes="100vw"
        />
      </div>
    );
  }

  // 固定サイズ（sm, md, card）の場合
  return (
    <div
      className={`relative overflow-hidden rounded-lg flex-shrink-0 ${className}`}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        minWidth: dimensions.width,
        minHeight: dimensions.height,
        maxWidth: dimensions.width,
        maxHeight: dimensions.height,
      }}
    >
      <Image
        src={`/${productId}.jpg`}
        alt={productName}
        width={dimensions.width}
        height={dimensions.height}
        priority={priority}
        onError={() => setImageError(true)}
        className="object-cover w-full h-full"
        sizes={
          size === "md"
            ? "80px"
            : "64px"
        }
      />
    </div>
  );
}
