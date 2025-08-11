<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $notes = Note::all();  
        return response()->json($notes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // バリデーション
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:500'],
            'body'  => ['nullable', 'string'],
        ]);

        // 作成（必要なら created_by にユーザーIDなど入れる）
        $note = Note::create([
            'title' => $validated['title'],
            'body'  => $validated['body'] ?? '',
            // 'created_by' => auth()->id(), // 認証導入後に
            'created_by' => 1, // 仮
            'updated_by' => 1, // 仮
        ]);

        // 201 Created で作成レコードを返す
        return response()->json($note, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Note $note)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        $validated = $request->validate([
            'title' => ['sometimes','required','string','max:500'],
            'body'  => ['sometimes','nullable','string'],
        ]);

        $note->fill($validated)->save();

        return response()->json($note);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        $note->delete(); // ソフトデリート
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
