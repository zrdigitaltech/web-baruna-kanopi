<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

Route::get('/', [HomeController::class, 'index']);

// Route fallback jika halaman tidak ditemukan (404)
Route::fallback(function () {
    return redirect('/');
});
