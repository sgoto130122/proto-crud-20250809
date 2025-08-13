// app/notes/NoteDeleteModal.tsx
"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

type Note = {
  id: number;
  title: string;
  body?: string;
};

type NoteDeleteModalProps = {
  open: boolean;                   // モーダル表示
  onClose: () => void;             // 閉じる
  fetchNotes: () => Promise<void>; // 削除後に一覧再取得
  note: Note | null;               // 対象ノート
};

export default function NoteDeleteModal({
  open,
  onClose,
  fetchNotes,
  note,
}: NoteDeleteModalProps) {
  const [deleting, setDeleting] = useState(false);

  const [title, setTitle] = useState(note?.title ?? "");
  const [body, setBody] = useState(note?.body ?? "");

  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  // モーダルが開いた/対象が切り替わったら表示内容を同期
  useEffect(() => {
    if (open && note) {
      setTitle(note.title ?? "");
      setBody(note.body ?? "");
    }
  }, [open, note]);

  const handleDelete = async () => {
    if (!API_BASE) return;
    if (!note?.id) {
      alert("削除対象のノートが見つかりません");
      return;
    }
    setDeleting(true);
    try {
      const res = await fetch(`${API_BASE}/api/notes/${note.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(`削除に失敗しました（${res.status}） ${t}`);
      }

      // 一覧更新
      await fetchNotes();

      // 閉じる
      onClose();
    } catch (e: any) {
      alert(e.message ?? "削除に失敗しました");
    } finally {
      setDeleting(false);
    }
  };

  const canDelete = !!API_BASE && !!note?.id && !deleting;

  return (
    <Modal open={open} title="ノートを削除" onClose={() => !deleting && onClose()}>
      <div className="space-y-4">
        {/* 警告文 */}
        <p className="text-sm font-medium text-red-600">
          本当に削除してもよろしいですか？
        </p>

        {/* 参照表示（読み取り専用） */}
        <div>
          <label className="block text-sm mb-1">タイトル</label>
          <input
            type="text"
            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 opacity-70"
            value={title}
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm mb-1">本文</label>
          <textarea
            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 min-h-[120px] opacity-70"
            value={body}
            readOnly
          />
        </div>

        {/* ボタン群 */}
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={() => !deleting && onClose()}>
            キャンセル
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={!canDelete}
            rightIcon={deleting ? <span className="animate-pulse">…</span> : undefined}
          >
            削除する
          </Button>
        </div>
      </div>
    </Modal>
  );
}
