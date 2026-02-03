"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, Gift, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/ui/product-image";

interface GiftDetailContentProps {
  basePath: "/demo" | "/mini";
}

const giftProducts = [
  {
    id: "coffee",
    name: "プレミアムコーヒーギフト",
    description:
      "世界各地から厳選されたスペシャルティコーヒー豆を使用した、プレミアムなコーヒーギフトセットです。深い香りと豊かな味わいをお楽しみいただけます。",
    price: 2500,
    category: "ドリンク",
    features: [
      "厳選されたスペシャルティコーヒー豆使用",
      "3種類のブレンドをセット",
      "有効期限: 発行から30日間",
    ],
  },
  {
    id: "sweets",
    name: "スイーツアソート",
    description:
      "人気のパティスリーが厳選した焼き菓子の詰め合わせセットです。クッキー、マドレーヌ、フィナンシェなど、様々な味わいをお楽しみいただけます。",
    price: 3000,
    category: "フード",
    features: [
      "人気の焼き菓子5種類をセット",
      "個包装で食べやすい",
      "有効期限: 発行から30日間",
    ],
  },
  {
    id: "aroma",
    name: "リラックスアロマセット",
    description:
      "天然の植物から抽出した癒しのアロマオイル3本セットです。ラベンダー、ユーカリ、ベルガモットの香りで、リラックスタイムを演出します。",
    price: 4500,
    category: "雑貨",
    features: [
      "天然植物由来の高品質オイル",
      "3種類の香りをセット",
      "有効期限: 発行から60日間",
    ],
  },
  {
    id: "tea",
    name: "オーガニック紅茶ギフト",
    description:
      "有機栽培で育てられた高級紅茶のギフトセットです。ダージリン、アールグレイ、ローズヒップなど、豊かな香りと深い味わいをお楽しみいただけます。",
    price: 2800,
    category: "ドリンク",
    features: [
      "有機栽培の茶葉使用",
      "4種類のフレーバーをセット",
      "有効期限: 発行から30日間",
    ],
  },
];

export function GiftDetailContent({ basePath }: GiftDetailContentProps) {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id") || "coffee";
  const product =
    giftProducts.find((p) => p.id === productId) || giftProducts[0];
  return (
    <div className="min-h-full bg-gray-50 flex flex-col">
      {/* ヘッダー */}
      <div className="bg-white px-4 py-3 border-b flex items-center gap-3">
        <Link
          href={`${basePath}/gift-select`}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <h1 className="font-bold text-gray-800">ギフト詳細</h1>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 overflow-y-auto">
        {/* 商品画像 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full"
        >
          <ProductImage
            productId={product.id}
            productName={product.name}
            size="lg"
            priority={true}
          />
        </motion.div>

        {/* 商品情報 */}
        <div className="p-4 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="inline-block px-3 py-1 bg-[#06C755]/10 text-[#06C755] text-sm font-medium rounded-full">
              {product.category}
            </span>
            <h2 className="text-xl font-bold text-gray-800 mt-2">
              {product.name}
            </h2>
            <p className="text-2xl font-bold text-[#06C755] mt-2">
              ¥{product.price.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
          >
            <h3 className="font-bold text-gray-800 mb-2">商品説明</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
          >
            <h3 className="font-bold text-gray-800 mb-3">特徴</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#06C755] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* 購入ボタン */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-4 bg-white border-t"
      >
        <Link href={`${basePath}/gift-share`}>
          <Button size="lg">
            <Gift className="w-5 h-5" />
            ギフトを購入する
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
