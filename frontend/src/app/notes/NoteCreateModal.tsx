// "use client";

// import { useEffect, useState } from "react";
// import Button from "@/components/ui/Button";
// import Modal from "@/components/ui/Modal";
// import NoteCreateModal from "@/app/notes/NoteCreateModal;

// type Note = {
//   id: number;
//   title: string;
//   body: string;
//   created_at: string;
//   updated_at: string;
// };

// export default function NotesPage() {
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [loading, setLoading] = useState(true);

//   // 新規追加モーダル
//   const [openNew, setOpenNew] = useState(false);
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");
//   const [saving, setSaving] = useState(false);
//   const API_BASE = process.env.NEXT_PUBLIC_BACKEND_API_URL;

//   // 一覧取得
//   const fetchNotes = () => {
//     if (!API_BASE) return;
//     setLoading(true);
//     fetch(`${API_BASE}/api/notes`, { cache: "no-store" })
//       .then((r) => {
//         if (!r.ok) throw new Error("Failed to fetch");
//         return r.json();
//       })
//       .then((data) => setNotes(data))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchNotes();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [API_BASE]);

//   // 保存（POST）
//   const handleSave = async () => {
//     if (!API_BASE) return;
//     if (!title.trim()) {
//       alert("タイトルを入力してください");
//       return;
//     }
//     setSaving(true);
//     try {
//       const res = await fetch(`${API_BASE}/api/notes`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({
//           title,
//           body,
//           // created_by など追加したい場合はここで
//         }),
//       });

//       if (!res.ok) {
//         const t = await res.text().catch(() => "");
//         throw new Error(`保存に失敗しました（${res.status}） ${t}`);
//       }

//       // 追加後に一覧を再取得して反映
//       await fetchNotes();

//       // フォーム初期化 & 閉じる
//       setTitle("");
//       setBody("");
//       setOpenNew(false);
//     } catch (e: any) {
//       alert(e.message ?? "保存に失敗しました");
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//       {/* 新規作成モーダル */}
//       <Modal open={openNew} title="ノートを追加" onClose={() => !saving && setOpenNew(false)}>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm mb-1">タイトル</label>
//             <input
//               type="text"
//               className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="例) TODO など"
//             />
//           </div>
//           <div>
//             <label className="block text-sm mb-1">本文</label>
//             <textarea
//               className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 min-h-[120px]"
//               value={body}
//               onChange={(e) => setBody(e.target.value)}
//               placeholder="内容を入力"
//             />
//           </div>

//           <div className="flex justify-end gap-2 pt-2">
//             <Button variant="ghost" onClick={() => !saving && setOpenNew(false)}>
//               キャンセル
//             </Button>
//             <Button
//               variant="primary"
//               onClick={handleSave}
//               disabled={saving}
//               rightIcon={saving ? <span className="animate-pulse">…</span> : undefined}
//             >
//               保存
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }
// app/notes/NoteCreateModal.tsx
"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

type NoteCreateModalProps = {
  open: boolean;             // モーダル表示フラグ
  onClose: () => void;        // モーダルを閉じる処理
  fetchNotes: () => Promise<void>; // 保存後に一覧を再取得する処理
};

export default function NoteCreateModal({ open, onClose, fetchNotes }: NoteCreateModalProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  // 保存（POST）
  const handleSave = async () => {
    if (!API_BASE) return;
    if (!title.trim()) {
      alert("タイトルを入力してください");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ title, body }),
      });

      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(`保存に失敗しました（${res.status}） ${t}`);
      }

      // 一覧更新
      await fetchNotes();

      // フォーム初期化 & 閉じる
      setTitle("");
      setBody("");
      onClose();
    } catch (e: any) {
      alert(e.message ?? "保存に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open={open} title="ノートを追加" onClose={() => !saving && onClose()}>
      <div className="space-y-4">
        {/* タイトル入力 */}
        <div>
          <label className="block text-sm mb-1">タイトル</label>
          <input
            type="text"
            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="例) TODO など"
          />
        </div>

        {/* 本文入力 */}
        <div>
          <label className="block text-sm mb-1">本文</label>
          <textarea
            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 min-h-[120px]"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="内容を入力"
          />
        </div>

        {/* ボタン群 */}
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={() => !saving && onClose()}>
            キャンセル
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={saving}
            rightIcon={saving ? <span className="animate-pulse">…</span> : undefined}
          >
            保存
          </Button>
        </div>
      </div>
    </Modal>
  );
}
