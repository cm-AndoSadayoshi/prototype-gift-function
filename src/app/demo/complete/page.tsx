import { Suspense } from "react";
import { CompleteContent } from "@/components/pages/CompleteContent";

export default function Page() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <CompleteContent />
    </Suspense>
  );
}
