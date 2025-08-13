// app/notes/NoteEditModal.tsx
"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

type Note = {
  id: number;
  title: string;
  body?: string;
};

type NoteEditModalProps = {
  open: boolean;                  // モーダル表示フラグ
  onClose: () => void;            // モーダルを閉じる処理
  fetchNotes: () => Promise<void>; // 保存後に一覧を再取得する処理（create と同じ形）
  note: Note | null;              // 編集対象（null のときは保存不可にする）
};

export default function NoteEditModal({
  open,
  onClose,
  fetchNotes,
  note,
}: NoteEditModalProps) {
  const [title, setTitle] = useState(note?.title ?? "");
  const [body, setBody] = useState(note?.body ?? "");
  const [saving, setSaving] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  // モーダルが開いた/対象が切り替わったタイミングでフォームを同期
  useEffect(() => {
    if (open && note) {
      setTitle(note.title ?? "");
      setBody(note.body ?? "");
    }
  }, [open, note]);

  // 保存（PUT）
  const handleSave = async () => {
    if (!API_BASE) return;
    if (!note?.id) {
      alert("編集対象のノートが見つかりません");
      return;
    }
    if (!title.trim()) {
      alert("タイトルを入力してください");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/notes/${note.id}`, {
        method: "PUT",
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

      // 閉じる
      onClose();
    } catch (e: any) {
      alert(e.message ?? "保存に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  const canSave = !!API_BASE && !!note?.id && !saving;

  return (
    <Modal open={open} title="ノートを編集" onClose={() => !saving && onClose()}>
      <div className="space-y-4">
        {/* タイトル入力 */}
        <div>
          <label className="block text-sm mb-1">タイトル</label>
          <input
            type="text"
            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトルを入力"
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
            disabled={!canSave}
            rightIcon={saving ? <span className="animate-pulse">…</span> : undefined}
          >
            保存
          </Button>
        </div>
      </div>
    </Modal>
  );
}
