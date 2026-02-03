"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Gift } from "lucide-react";
import { ProductImage } from "@/components/ui/product-image";

const giftProducts = [
  {
    id: "coffee",
    name: "プレミアムコーヒーギフト",
  },
  {
    id: "sweets",
    name: "スイーツアソート",
  },
  {
    id: "aroma",
    name: "リラックスアロマセット",
  },
  {
    id: "tea",
    name: "オーガニック紅茶ギフト",
  },
];

export function CompleteContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id") || "coffee";
  const product =
    giftProducts.find((p) => p.id === productId) || giftProducts[0];

  const now = new Date();
  const formattedDate = now.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-full bg-white flex flex-col">
      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* 成功アニメーション */}
        <div className="relative mb-8">
          {/* 背景のリップル */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#06C755]/10"
              style={{
                width: 160 + i * 40,
                height: 160 + i * 40,
                left: `calc(50% - ${80 + i * 20}px)`,
                top: `calc(50% - ${80 + i * 20}px)`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}

          {/* チェックマーク */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
            className="relative w-32 h-32 bg-[#06C755] rounded-full flex items-center justify-center shadow-lg"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.5 }}
            >
              <CheckCircle className="w-16 h-16 text-white" />
            </motion.div>
          </motion.div>
        </div>

        {/* メッセージ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            ご利用ありがとうございました
          </h2>
          <p className="text-gray-500">
            ギフトチケットの利用が完了しました
          </p>
        </motion.div>

        {/* 利用情報カード */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full mt-8 bg-gray-50 rounded-2xl p-4"
        >
          <div className="flex gap-4 items-center">
            <ProductImage
              productId={product.id}
              productName={product.name}
              size="sm"
            />
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500">利用済み</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">利用日時</span>
              <span className="font-medium text-gray-800">{formattedDate}</span>
            </div>
          </div>
        </motion.div>

        {/* プロモーション */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="w-full mt-4 bg-gradient-to-r from-[#06C755] to-[#00B900] rounded-2xl p-4 text-white"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold">友だちにもギフトを贈ろう</p>
              <p className="text-sm text-white/80">
                今なら送料無料キャンペーン中!
              </p>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
