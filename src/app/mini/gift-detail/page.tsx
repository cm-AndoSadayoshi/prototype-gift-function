import { Suspense } from "react";
import { GiftDetailContent } from "@/components/pages/GiftDetailContent";

export default function Page() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <GiftDetailContent basePath="/mini" />
    </Suspense>
  );
}
