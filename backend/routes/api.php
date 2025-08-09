<?php

use App\Http\Controllers\NoteController;


Route::apiResource('notes', NoteController::class);

// Route::get('/notes', [NotesController::class, 'index']);
