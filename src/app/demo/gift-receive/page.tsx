import { Suspense } from "react";
import { GiftReceiveContent } from "@/components/pages/GiftReceiveContent";

export default function Page() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <GiftReceiveContent basePath="/demo" />
    </Suspense>
  );
}
