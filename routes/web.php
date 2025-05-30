<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Response;

Route::get('/', [HomeController::class, 'index']);

Route::get('/sitemap.xml', function () {
    $content = view('sitemap');

    return Response::make($content, 200)->header('Content-Type', 'application/xml');
});

// Route fallback jika halaman tidak ditemukan (404)
Route::fallback(function () {
    return redirect('/');
});
