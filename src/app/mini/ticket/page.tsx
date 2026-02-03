import { Suspense } from "react";
import { TicketContent } from "@/components/pages/TicketContent";

export default function Page() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <TicketContent basePath="/mini" />
    </Suspense>
  );
}
