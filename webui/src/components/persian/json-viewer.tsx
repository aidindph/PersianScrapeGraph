"use client";

import { Fragment, type ReactNode } from "react";

/**
 * نمایش JSON با رنگ‌بندی سادهٔ نحوی (regex-based):
 * کلیدها سبز، مقدارهای رشته‌ای کهربایی، اعداد خاکستری تیره.
 */
const TOKEN =
  /("(?:\\.|[^"\\])*")(\s*:)?|(-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b)|(\btrue\b|\bfalse\b|\bnull\b)/g;

function renderLine(line: string): ReactNode {
  const parts: ReactNode[] = [];
  const regex = new RegExp(TOKEN.source, "g");
  let last = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(line)) !== null) {
    if (match.index > last) {
      parts.push(<Fragment key={key++}>{line.slice(last, match.index)}</Fragment>);
    }
    if (match[1] !== undefined) {
      if (match[2] !== undefined) {
        parts.push(
          <Fragment key={key++}>
            <span className="font-semibold text-emerald-700">{match[1]}</span>
            {match[2]}
          </Fragment>
        );
      } else {
        parts.push(
          <span key={key++} className="text-amber-700">
            {match[1]}
          </span>
        );
      }
    } else if (match[3] !== undefined) {
      parts.push(
        <span key={key++} className="text-zinc-800">
          {match[3]}
        </span>
      );
    } else if (match[4] !== undefined) {
      parts.push(
        <span key={key++} className="italic text-zinc-500">
          {match[4]}
        </span>
      );
    }
    last = regex.lastIndex;
  }
  if (last < line.length) {
    parts.push(<Fragment key={key++}>{line.slice(last)}</Fragment>);
  }
  return parts;
}

export function JsonViewer({ value }: { value: unknown }) {
  let text: string;
  try {
    text = JSON.stringify(value, null, 2) ?? "null";
  } catch {
    text = "\"نمایش خروجی ممکن نشد.\"";
  }
  const lines = text.split("\n");

  return (
    <pre dir="ltr" className="persian-scrollbar max-h-[26rem] overflow-auto p-4 text-left font-mono text-[13px] leading-relaxed text-zinc-600">
      <code>
        {lines.map((line, i) => (
          <span key={i} className="block whitespace-pre">
            {renderLine(line)}
          </span>
        ))}
      </code>
    </pre>
  );
}
