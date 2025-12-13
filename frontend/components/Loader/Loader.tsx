"use client";

export default function LoaderOverlay({ text }: { text?: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-3">
        <span className="h-8 w-8 border-4 border-black border-t-transparent rounded-full animate-spin"></span>
        {text && <p className="text-black text-sm">{text}</p>}
      </div>
    </div>
  );
}
