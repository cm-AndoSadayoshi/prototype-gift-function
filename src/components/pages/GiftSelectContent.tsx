"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gift, ChevronRight } from "lucide-react";
import { ProductImage } from "@/components/ui/product-image";

interface GiftSelectContentProps {
  basePath: "/demo" | "/mini";
}

const giftProducts = [
  {
    id: "coffee",
    name: "プレミアムコーヒーギフト",
    description: "厳選されたスペシャルティコーヒー",
    price: 2500,
    image: "/coffee.jpg",
    category: "ドリンク",
  },
  {
    id: "sweets",
    name: "スイーツアソート",
    description: "人気の焼き菓子詰め合わせ",
    price: 3000,
    image: "/sweets.jpg",
    category: "フード",
  },
  {
    id: "aroma",
    name: "リラックスアロマセット",
    description: "癒しのアロマオイル3本セット",
    price: 4500,
    image: "/aroma.jpg",
    category: "雑貨",
  },
  {
    id: "tea",
    name: "オーガニック紅茶ギフト",
    description: "有機栽培の高級紅茶セット",
    price: 2800,
    image: "/tea.jpg",
    category: "ドリンク",
  },
];

export function GiftSelectContent({ basePath }: GiftSelectContentProps) {
  return (
    <div className="min-h-full bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-white px-4 py-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#06C755] to-[#00B900] rounded-full flex items-center justify-center">
            <Gift className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-800">ギフトを選ぶ</h1>
            <p className="text-xs text-gray-500">大切な人に贈り物を</p>
          </div>
        </div>
      </div>

      {/* 商品リスト */}
      <div className="p-4 space-y-3">
        {giftProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`${basePath}/gift-detail`}>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 active:scale-[0.98] transition-transform">
                {/* 商品画像 */}
                <ProductImage
                  productId={product.id}
                  productName={product.name}
                  size="md"
                  className="flex-shrink-0"
                />

                {/* 商品情報 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block px-2 py-0.5 bg-[#06C755]/10 text-[#06C755] text-xs font-medium rounded-full mb-1">
                        {product.category}
                      </span>
                      <h3 className="font-bold text-gray-800 text-sm">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {product.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>
                  <p className="text-[#06C755] font-bold mt-2">
                    ¥{product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
