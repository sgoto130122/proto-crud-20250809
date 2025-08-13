// app/notes/page.tsx
"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import NoteCreateModal from "@/app/notes/NoteCreateModal";
import NoteEditModal from "@/app/notes/NoteEditModal"; // ← 追加

type Note = {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  // 新規作成モーダル
  const [openNew, setOpenNew] = useState(false);

  // 編集モーダル用
  const [openEdit, setOpenEdit] = useState(false);      // ← 追加
  const [selectedNote, setSelectedNote] = useState<Note | null>(null); // ← 追加

  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  // 一覧取得
  const fetchNotes = async () => {
    if (!API_BASE) return;
    setLoading(true);
    try {
      const r = await fetch(`${API_BASE}/api/notes`, { cache: "no-store" });
      if (!r.ok) throw new Error("Failed to fetch");
      const data = await r.json();
      setNotes(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API_BASE]);

  // 編集クリック時：対象ノートを選択してモーダルを開く
  const handleEditClick = (note: Note) => {
    setSelectedNote(note);
    setOpenEdit(true);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* noteページ内ヘッダー */}
      <div className="sticky top-0 z-10 backdrop-blur border-b border-black/10 dark:border-white/10 bg-background/70">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Notes</h1>
          <Button
            variant="primary"
            onClick={() => setOpenNew(true)}
            leftIcon={
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            }
          >
            新規追加
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* 空状態 */}
        {!loading && notes.length === 0 && (
          <div className="rounded-2xl border border-dashed border-black/15 dark:border-white/15 p-10 text-center">
            <p className="text-base">まだノートがありません。</p>
            <p className="text-sm opacity-70 mt-1">右上の「新規追加」から作成できます。</p>
          </div>
        )}

        {/* 一覧 */}
        {!loading && notes.length > 0 && (
          <ul className="grid gap-4 sm:gap-5">
            {notes.map((note) => (
              <li
                key={note.id}
                className="group rounded-2xl border border-black/10 dark:border-white/10 bg-background shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold leading-snug line-clamp-1">{note.title}</h2>
                      <p className="mt-1 text-sm opacity-80 line-clamp-2">{note.body}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                      <Button variant="secondary" size="sm" onClick={() => handleEditClick(note)}>
                        編集
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => alert(`Delete ${note.id}: 未実装`)}>
                        削除
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs opacity-60">
                    <span>ID: {note.id}</span>
                    <span>作成: {note.created_at}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* ローディング */}
        {loading && (
          <ul className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i} className="rounded-2xl border border-black/10 dark:border-white/10 p-4 shadow-sm">
                <div className="h-5 w-40 rounded bg-black/10 dark:bg.white/10 mb-3" />
                <div className="h-4 w-full rounded bg-black/10 dark:bg-white/10 mb-2" />
                <div className="h-4 w-2/3 rounded bg-black/10 dark:bg-white/10" />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 新規作成モーダル */}
      <NoteCreateModal
        open={openNew}
        onClose={() => setOpenNew(false)}
        fetchNotes={fetchNotes}
      />

      {/* 編集モーダル */}
      <NoteEditModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        fetchNotes={fetchNotes}
        note={selectedNote}
      />
    </div>
  );
}
