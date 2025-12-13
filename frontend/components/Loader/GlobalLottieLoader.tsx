"use client";

import { useAtom } from "jotai";
import Lottie from "lottie-react";
import loaderAnim from "@/public/loader.json";
import { loaderAtom } from "@/lib/atoms";

export default function GlobalLoader() {
  const [loading] = useAtom(loaderAtom);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-9999">
      <div className="w-32 h-32">
        <Lottie animationData={loaderAnim} loop={true} />
      </div>
    </div>
  );
}
