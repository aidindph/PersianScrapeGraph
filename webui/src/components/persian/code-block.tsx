"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  code: string;
  label?: string;
  className?: string;
};

/** بلوک کد چپ‌چین با دکمهٔ کپی؛ خطوط کامنت به رنگ سبز ملایم */
export function CodeBlock({ code, label, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // راهکار جایگزین برای مرورگرهای بدون Clipboard API
      const ta = document.createElement("textarea");
      ta.value = code;
      ta.dir = "ltr";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  const lines = code.replace(/\n$/, "").split("\n");

  return (
    <div
      dir="ltr"
      className={cn(
        "overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-zinc-800 bg-zinc-900/80 px-4 py-2.5">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-600/70" />
          {label ? (
            <span className="ms-2 font-mono text-[11px] tracking-wide text-zinc-400">{label}</span>
          ) : null}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          aria-label="کپی کد"
          className="h-8 gap-1.5 px-2.5 text-zinc-300 hover:bg-zinc-800 hover:text-white"
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="text-xs">{copied ? "کپی شد" : "کپی"}</span>
        </Button>
      </div>
      <pre className="persian-scrollbar overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
        <code>
          {lines.map((line, i) => (
            <span
              key={i}
              className={
                line.trimStart().startsWith("#") || line.trimStart().startsWith("//")
                  ? "block whitespace-pre text-emerald-400/80"
                  : "block whitespace-pre text-zinc-200"
              }
            >
              {line || " "}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
