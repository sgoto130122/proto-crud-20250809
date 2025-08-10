// src/components/layout/Footer.tsx
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 text-gray-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
        {/* 左側：コピーライト */}
        <p className="mb-2 sm:mb-0">
          &copy; {new Date().getFullYear()} My App. All rights reserved.
        </p>

        {/* 右側：リンク例 */}
        <div className="flex space-x-4">
          <a
            href="#"
            className="hover:text-gray-900 transition-colors duration-200"
          >
            利用規約
          </a>
          <a
            href="#"
            className="hover:text-gray-900 transition-colors duration-200"
          >
            プライバシー
          </a>
        </div>
      </div>
    </footer>
  );
}
