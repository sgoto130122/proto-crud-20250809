"use client";

import React from "react";

// ボタンのプロパティ型定義（HTMLのbutton属性に加えて、独自のオプションを追加）
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost"; // ボタンの種類
  size?: "sm" | "md"; // ボタンのサイズ
  leftIcon?: React.ReactNode; // ボタンの左に表示するアイコン
  rightIcon?: React.ReactNode; // ボタンの右に表示するアイコン
};

export default function Button({
  children,         // ボタン内に表示する内容
  variant = "primary", // デフォルトのスタイル（primary）
  size = "md",         // デフォルトサイズ（md）
  className = "",      // 外部から追加するCSSクラス
  leftIcon,            // 左アイコン
  rightIcon,           // 右アイコン
  ...props             // その他のHTML属性（onClickなど）
}: ButtonProps) {
  // 基本となる共通クラス
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition";

  // サイズごとのクラス
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
  };

  // バリエーションごとのクラス（色や背景など）
  const styles = {
    primary: "bg-foreground text-background hover:opacity-90",
    secondary:
      "border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "hover:bg-black/5 dark:hover:bg-white/10",
  };

  return (
    <button
      // base + サイズ + バリエーション + 外部から渡された className を結合
      className={`${base} ${sizes[size]} ${styles[variant]} ${className}`}
      {...props}
    >
      {/* 左アイコン → 子要素（テキストなど）→ 右アイコン の順で表示 */}
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
