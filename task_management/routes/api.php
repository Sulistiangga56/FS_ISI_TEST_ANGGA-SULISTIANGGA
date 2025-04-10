<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('tasks')->group(function () {
    Route::get('/', [TaskController::class, 'index']);            // GET all tasks
    Route::post('/', [TaskController::class, 'store']);           // POST create task
    Route::put('/{task}', [TaskController::class, 'update']);     // PUT update task (title/completed)
    Route::delete('/{task}', [TaskController::class, 'destroy']); // DELETE a task
});
