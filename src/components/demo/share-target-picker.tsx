"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Friend {
  id: string;
  name: string;
  avatar: string;
}

const mockFriends: Friend[] = [
  { id: "1", name: "田中 太郎", avatar: "T" },
  { id: "2", name: "佐藤 花子", avatar: "S" },
  { id: "3", name: "鈴木 一郎", avatar: "S" },
  { id: "4", name: "高橋 美咲", avatar: "T" },
  { id: "5", name: "渡辺 健太", avatar: "W" },
];

interface ShareTargetPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (friends: Friend[]) => void;
}

export function ShareTargetPicker({
  isOpen,
  onClose,
  onSend,
}: ShareTargetPickerProps) {
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);

  const toggleFriend = (id: string) => {
    setSelectedFriends((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      const selected = mockFriends.filter((f) =>
        selectedFriends.includes(f.id)
      );
      onSend(selected);
      setIsSending(false);
      setSelectedFriends([]);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 z-50 flex items-end"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full bg-white rounded-t-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ヘッダー */}
            <div className="flex items-center justify-between p-4 border-b">
              <button onClick={onClose} className="p-1">
                <X className="w-6 h-6 text-gray-500" />
              </button>
              <span className="font-bold text-gray-800">送信先を選択</span>
              <div className="w-8" />
            </div>

            {/* 検索バー */}
            <div className="p-4">
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="友だちを検索"
                  className="bg-transparent flex-1 outline-none text-sm"
                />
              </div>
            </div>

            {/* 友だちリスト */}
            <div className="max-h-64 overflow-y-auto px-4">
              {mockFriends.map((friend) => {
                const isSelected = selectedFriends.includes(friend.id);
                return (
                  <motion.button
                    key={friend.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleFriend(friend.id)}
                    className="w-full flex items-center gap-3 py-3 border-b border-gray-100"
                  >
                    <div className="w-12 h-12 bg-[#06C755] rounded-full flex items-center justify-center text-white font-bold">
                      {friend.avatar}
                    </div>
                    <span className="flex-1 text-left font-medium text-gray-800">
                      {friend.name}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-[#06C755] border-[#06C755]"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* 送信ボタン */}
            <div className="p-4 border-t">
              <Button
                size="lg"
                onClick={handleSend}
                disabled={selectedFriends.length === 0 || isSending}
              >
                {isSending ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    送信する ({selectedFriends.length})
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
