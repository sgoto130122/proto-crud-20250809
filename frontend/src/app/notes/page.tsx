"use client";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

import { useEffect, useState } from "react";

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${apiUrl}/api/notes`)
    .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch notes");
        }
        return res.json();
      })
      .then((data) => {
        setNotes(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p className="text-red-600">エラー: {error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">ノート一覧</h1>
      {notes.length === 0 ? (
        <p>ノートがありません。</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id} className="mb-3 border-b pb-2">
              <h2 className="font-semibold">{note.title}</h2>
              <p>{note.body}</p>
              {/* <small>作成日: {new Date(note.created_at).toLocaleString()}</small> */}
              <small>作成日: {note.created_at}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
