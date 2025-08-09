# proto-crud-20250809

このリポジトリは **Gitpod** 上で **Laravel + Next.js** の CRUD 機能を試すための開発用プロジェクトです。  
最終的にはローカル開発（Docker 利用）やチーム開発環境への移行も想定しています。

---

## 構成（予定）
proto-crud-20250809/
├─ backend/ ← Laravel (API サーバー)
└─ frontend/ ← Next.js (フロントエンド)

## 開発環境
- PHP 8.x / Laravel 11
- Node.js LTS / Next.js 14
- SQLite（Gitpod 上で簡易利用）

---

## Gitpod での起動方法
1. 以下のリンクから Gitpod を起動（GitHub アカウント連携が必要）
   https://gitpod.io/#https://github.com/sgoto130122/proto-crud-20250809

2. Gitpod ターミナルで以下を実行  
```bash
# backend
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve --host=0.0.0.0 --port=8000

# frontend
cd ../frontend
npm install
npm run dev -- -p 3000
