"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Gift, Calendar, QrCode, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";

interface TicketContentProps {
  basePath: "/demo" | "/mini";
}

const giftProducts = [
  {
    id: "coffee",
    name: "プレミアムコーヒーギフト",
    category: "ドリンク",
  },
  {
    id: "sweets",
    name: "スイーツアソート",
    category: "フード",
  },
  {
    id: "aroma",
    name: "リラックスアロマセット",
    category: "雑貨",
  },
  {
    id: "tea",
    name: "オーガニック紅茶ギフト",
    category: "ドリンク",
  },
];

export function TicketContent({ basePath }: TicketContentProps) {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id") || "coffee";
  const product =
    giftProducts.find((p) => p.id === productId) || giftProducts[0];

  // 有効期限（30日後）
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 30);
  const formattedExpiry = expiryDate.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-full bg-gray-50 flex flex-col">
      {/* ヘッダー */}
      <div className="bg-white px-4 py-3 border-b">
        <h1 className="font-bold text-gray-800 text-center">
          デジタルチケット
        </h1>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 p-4">
        {/* チケットカード */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-lg overflow-hidden"
        >
          {/* チケットヘッダー */}
          <div className="bg-gradient-to-r from-[#06C755] to-[#00B900] p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Gift className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-white/80 text-sm">{product.category}引換券</p>
              </div>
            </div>
          </div>

          {/* 点線区切り */}
          <div className="relative">
            <div className="absolute left-0 top-1/2 w-4 h-8 bg-gray-50 rounded-r-full -translate-y-1/2" />
            <div className="absolute right-0 top-1/2 w-4 h-8 bg-gray-50 rounded-l-full -translate-y-1/2" />
            <div className="border-t-2 border-dashed border-gray-200 mx-6" />
          </div>

          {/* QRコード */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="p-6 flex flex-col items-center"
          >
            <div className="w-48 h-48 bg-white border-2 border-gray-100 rounded-2xl flex items-center justify-center mb-4 shadow-inner p-3">
              <QRCodeSVG
                value="https://classmethod.jp"
                size={160}
                level="M"
                marginSize={0}
              />
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <QrCode className="w-4 h-4" />
              店舗でこのQRコードを提示してください
            </p>
          </motion.div>

          {/* チケット情報 */}
          <div className="px-6 pb-6 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-5 h-5 text-[#06C755]" />
              <div>
                <p className="text-gray-500">有効期限</p>
                <p className="font-medium text-gray-800">{formattedExpiry}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Store className="w-5 h-5 text-[#06C755]" />
              <div>
                <p className="text-gray-500">利用可能店舗</p>
                <p className="font-medium text-gray-800">全国の対象店舗</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 注意事項 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200"
        >
          <p className="text-sm text-yellow-800">
            <span className="font-bold">ご注意:</span>
            チケットは1回のみ使用可能です。使用後は無効となります。
          </p>
        </motion.div>
      </div>

      {/* 利用ボタン */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-4 bg-white border-t"
      >
        <Link href={`${basePath}/complete?id=${product.id}`}>
          <Button size="lg">
            <Store className="w-5 h-5" />
            店舗で使う
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
