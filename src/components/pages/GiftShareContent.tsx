"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Gift, Link as LinkIcon, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareTargetPicker } from "@/components/demo/share-target-picker";
import { ProductImage } from "@/components/ui/product-image";

interface GiftShareContentProps {
  basePath: "/demo" | "/mini";
}

const giftProducts = [
  {
    id: "coffee",
    name: "プレミアムコーヒーギフト",
    price: 2500,
    category: "ドリンク",
  },
  {
    id: "sweets",
    name: "スイーツアソート",
    price: 3000,
    category: "フード",
  },
  {
    id: "aroma",
    name: "リラックスアロマセット",
    price: 4500,
    category: "雑貨",
  },
  {
    id: "tea",
    name: "オーガニック紅茶ギフト",
    price: 2800,
    category: "ドリンク",
  },
];

export function GiftShareContent({ basePath }: GiftShareContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id") || "coffee";
  const product =
    giftProducts.find((p) => p.id === productId) || giftProducts[0];

  const [giftUrl, setGiftUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(true);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copied, setCopied] = useState(false);

  // URL生成アニメーション
  useEffect(() => {
    const timer = setTimeout(() => {
      setGiftUrl("https://gift.example.com/g/abc123xyz");
      setIsGenerating(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(giftUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    setIsPickerOpen(false);
    setIsSent(true);
    setTimeout(() => {
      router.push(`${basePath}/gift-receive?id=${product.id}`);
    }, 2000);
  };

  return (
    <div className="min-h-full bg-gray-50 flex flex-col relative">
      {/* ヘッダー */}
      <div className="bg-white px-4 py-3 border-b flex items-center gap-3">
        <Link
          href={`${basePath}/gift-detail?id=${product.id}`}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <h1 className="font-bold text-gray-800">ギフトを送る</h1>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 p-4 space-y-4">
        {/* 購入完了メッセージ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#06C755] to-[#00B900] rounded-2xl p-4 text-white"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold">ギフトの準備ができました!</p>
              <p className="text-sm text-white/80">
                友だちにURLを送りましょう
              </p>
            </div>
          </div>
        </motion.div>

        {/* ギフトURL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-2 mb-3">
            <LinkIcon className="w-5 h-5 text-[#06C755]" />
            <span className="font-bold text-gray-800">ギフトURL</span>
          </div>

          <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2">
            {isGenerating ? (
              <div className="flex-1">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-4 bg-gray-200 rounded w-3/4"
                />
              </div>
            ) : (
              <>
                <code className="flex-1 text-sm text-gray-600 truncate">
                  {giftUrl}
                </code>
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-[#06C755]" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </>
            )}
          </div>

          {copied && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-[#06C755] mt-2 text-center"
            >
              コピーしました!
            </motion.p>
          )}
        </motion.div>

        {/* 商品情報 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex gap-4">
            <ProductImage
              productId={product.id}
              productName={product.name}
              size="card"
            />
            <div>
              <h3 className="font-bold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-[#06C755] font-bold mt-1">
                ¥{product.price.toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 送信ボタン */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-4 bg-white border-t"
      >
        <AnimatePresence mode="wait">
          {isSent ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 py-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="w-12 h-12 bg-[#06C755] rounded-full flex items-center justify-center"
              >
                <Check className="w-6 h-6 text-white" />
              </motion.div>
              <span className="font-bold text-[#06C755]">送信しました!</span>
            </motion.div>
          ) : (
            <motion.div key="button" exit={{ opacity: 0 }}>
              <Button
                size="lg"
                onClick={() => setIsPickerOpen(true)}
                disabled={isGenerating}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 3.188-1.684 5.94-4.182 7.313l-.232.127-.196.106-.234.121-.25.126-.254.122-.262.119-.268.114-.278.11-.282.105-.292.1-.298.094-.306.088-.31.082-.32.076-.324.069-.332.062-.336.055-.344.048-.348.04-.358.032-.36.024-.368.015-.37.005c-5.803 0-10.505-4.702-10.505-10.505 0-5.803 4.702-10.505 10.505-10.505 5.803 0 10.505 4.702 10.505 10.505 0 .346-.283.63-.63.63-.346 0-.63-.284-.63-.63 0-5.108-4.137-9.245-9.245-9.245-5.108 0-9.245 4.137-9.245 9.245 0 5.108 4.137 9.245 9.245 9.245.316 0 .627-.016.933-.048l.297-.034.29-.04.285-.048.278-.054.274-.062.266-.068.262-.076.254-.082.25-.09.244-.096.236-.104.232-.11.224-.118.218-.124.21-.132.204-.138.196-.146.19-.152.182-.16.176-.166.168-.174.16-.18.154-.188.146-.194.138-.202.132-.208.124-.216.116-.222.108-.23.1-.236.094-.244.086-.25.078-.258.072-.264.064-.272.056-.278.048-.286.04-.292.034-.3.026-.306.018-.314.01-.32.004-.328c0-.346.284-.63.63-.63z" />
                </svg>
                LINEで送る
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ShareTargetPicker モック */}
      <ShareTargetPicker
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSend={handleSend}
      />
    </div>
  );
}
