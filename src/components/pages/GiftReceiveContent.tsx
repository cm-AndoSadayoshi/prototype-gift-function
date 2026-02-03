"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gift, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/ui/product-image";

interface GiftReceiveContentProps {
  basePath: "/demo" | "/mini";
}

export function GiftReceiveContent({ basePath }: GiftReceiveContentProps) {
  return (
    <div className="min-h-full bg-gradient-to-b from-[#06C755]/10 to-white flex flex-col">
      {/* ヘッダー */}
      <div className="bg-white/80 backdrop-blur-sm px-4 py-3 border-b">
        <div className="flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-[#06C755] mr-2" />
          <span className="font-bold text-gray-800">ギフトが届きました</span>
          <Sparkles className="w-5 h-5 text-[#06C755] ml-2" />
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* ギフトアニメーション */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="relative mb-8"
        >
          {/* 背景のリップル */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full bg-[#06C755]/10"
              style={{
                width: 200 + i * 40,
                height: 200 + i * 40,
                left: -(i * 20),
                top: -(i * 20),
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}

          {/* ギフトアイコン */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative w-40 h-40 bg-gradient-to-br from-[#06C755] to-[#00B900] rounded-3xl flex items-center justify-center shadow-lg"
          >
            <Gift className="w-20 h-20 text-white" />
          </motion.div>
        </motion.div>

        {/* メッセージ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-6"
        >
          <p className="text-gray-500 text-sm mb-2">田中 太郎さんから</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            プレミアムコーヒーギフト
          </h2>
          <div className="inline-flex items-center gap-1 px-4 py-2 bg-pink-50 rounded-full">
            <Heart className="w-4 h-4 text-pink-500" />
            <span className="text-sm text-pink-600">
              いつもありがとう!
            </span>
          </div>
        </motion.div>

        {/* 商品情報カード */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex gap-4">
            <ProductImage
              productId="coffee"
              productName="プレミアムコーヒーギフト"
              size="card"
            />
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">
                プレミアムコーヒーギフト
              </h3>
              <p className="text-sm text-gray-500">
                厳選されたスペシャルティコーヒー
              </p>
              <p className="text-[#06C755] font-bold mt-1">¥2,500相当</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 受け取りボタン */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="p-4 bg-white border-t"
      >
        <Link href={`${basePath}/ticket`}>
          <Button size="lg">
            <Gift className="w-5 h-5" />
            ギフトを受け取る
          </Button>
        </Link>
        <p className="text-xs text-gray-400 text-center mt-3">
          受け取り後、デジタルチケットが発行されます
        </p>
      </motion.div>
    </div>
  );
}
