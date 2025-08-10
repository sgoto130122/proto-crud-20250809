"use client";

import React, { useEffect } from "react";

type ModalProps = {
  open: boolean;                 // 開閉フラグ
  title?: string;                // ヘッダーのタイトル
  onClose: () => void;           // ×や背景クリックで閉じる
  children: React.ReactNode;     // 中身（フォームなど）
};

export default function Modal({ open, title, onClose, children }: ModalProps) {
  // ESCで閉じる
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* 背景 */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      {/* 本体 */}
      <div className="relative w-full max-w-lg rounded-2xl bg-background text-foreground shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/10 dark:border-white/10">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            className="rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/10"
            onClick={onClose}
            aria-label="閉じる"
          >
            ×
          </button>
        </div>
        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  );
}
