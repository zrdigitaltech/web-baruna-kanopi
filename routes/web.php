<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PelangganController;

Route::get('/', [HomeController::class, 'index']);

Route::get('/sitemap.xml', function () {
    $content = view('sitemap');

    return Response::make($content, 200)->header('Content-Type', 'application/xml');
});

Route::post('/pelanggan/store', [PelangganController::class, 'store']);

// Route fallback jika halaman tidak ditemukan (404)
Route::fallback(function () {
    return redirect('/');
});
