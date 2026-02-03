import { Suspense } from "react";
import { GiftShareContent } from "@/components/pages/GiftShareContent";

export default function Page() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <GiftShareContent basePath="/mini" />
    </Suspense>
  );
}
