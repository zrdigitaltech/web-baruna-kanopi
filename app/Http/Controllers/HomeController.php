<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $dataSlider = [
            ['id' => 1, 'image' => 'data:image/svg+xml,%3Csvg%20xmlns=&#39;http://www.w3.org/2000/svg&#39;%20viewBox=&#39;0%200%20876%20558&#39;%3E%3C/svg%3E', 'title' => 'Ahli dalam Pemasangan Kanopi', 'deskripsi' => 'Dengan latar belakang yang solid di bidang ini, kami siap memberikan layanan berkualitas tinggi dan hasil kerja yang memuaskan pelanggan.'],
            ['id' => 2, 'image' => 'data:image/svg+xml,%3Csvg%20xmlns=&#39;http://www.w3.org/2000/svg&#39;%20viewBox=&#39;0%200%201280%20576&#39;%3E%3C/svg%3E', 'title' => 'Baruna Kanopi', 'deskripsi' => 'Kami hadir untuk memberikan solusi terbaik bagi kebutuhan kanopi berkualitas tinggi yang tidak hanya tahan lama tetapi juga estetis.'],
            ['id' => 3, 'image' => 'data:image/svg+xml,%3Csvg%20xmlns=&#39;http://www.w3.org/2000/svg&#39;%20viewBox=&#39;0%200%20876%20558&#39;%3E%3C/svg%3E', 'title' => 'Ahli dalam Pemasangan Kanopi', 'deskripsi' => 'Dengan latar belakang yang solid di bidang ini, kami siap memberikan layanan berkualitas tinggi dan hasil kerja yang memuaskan pelanggan.'],
            ['id' => 4, 'image' => 'data:image/svg+xml,%3Csvg%20xmlns=&#39;http://www.w3.org/2000/svg&#39;%20viewBox=&#39;0%200%201280%20576&#39;%3E%3C/svg%3E', 'title' => 'Baruna Kanopi', 'deskripsi' => 'Kami hadir untuk memberikan solusi terbaik bagi kebutuhan kanopi berkualitas tinggi yang tidak hanya tahan lama tetapi juga estetis.'],
        ];

        $dataJenisKanopi = [
            ['id' => 1, 'image' => 'https://galaxykanopi.com/wp-content/uploads/bb-plugin/cache/galaxykanopi.com-10-circle-308d2187e84c5f24e319bdb973852b56-.jpeg', 'nama' => 'Kanopi <br class="d-sm-none"/> Alderon Single',],
            ['id' => 2, 'image' => 'https://galaxykanopi.com/wp-content/uploads/bb-plugin/cache/galaxykanopi.com-2-circle-051ed9df7a6ff6c6771bd86847532b6c-.jpeg', 'nama' => 'Kanopi <br class="d-sm-none"/> Alderon Double',],
            ['id' => 3, 'image' => 'https://galaxykanopi.com/wp-content/uploads/bb-plugin/cache/galaxykanopi.com-3-circle-50c66b947145e47f1049797887b4cacc-.jpeg', 'nama' => 'Kanopi <br class="d-sm-none"/> Solar Flat'],
            ['id' => 4, 'image' => 'https://galaxykanopi.com/wp-content/uploads/bb-plugin/cache/galaxykanopi11-circle-dacbb86ee6e08bf826a9cee86ece330f-.jpg', 'nama' => 'Kanopi <br class="d-sm-none"/> Baja Ringan',],
            ['id' => 5, 'image' => 'https://galaxykanopi.com/wp-content/uploads/bb-plugin/cache/galaxykanopi.com-11-circle-f2b4a4c7454caefb4f165e4fc1fb6f64-.jpeg', 'nama' => 'Kanopi <br class="d-sm-none"/> Polycarbonate',],
            ['id' => 6, 'image' => 'https://galaxykanopi.com/wp-content/uploads/bb-plugin/cache/galaxykanopi.com-1-circle-1d364bb807880a3ccec7399dabc05a44-.jpeg', 'nama' => 'Kanopi <br class="d-sm-none"/> Solar Flat Sliding'],
        ];

        $dataPortofolio = [
            ['id' => 1, 'image' => 'https://galaxykanopi.com/wp-content/uploads/bb-plugin/cache/Gambar-WhatsApp-2024-09-18-pukul-10.27.32_1f2febf1-600x800-1-089b7b2a43382b98e954783e8152d8e9-.jpg'],
            ['id' => 2, 'image' => 'https://galaxykanopi.com/wp-content/uploads/bb-plugin/cache/Gambar-WhatsApp-2024-09-18-pukul-10.27.32_1d2a98a4-1-3fe48ee96fd65629a804e9ce7790ecce-.jpg'],
            ['id' => 3, 'image' => 'https://galaxykanopi.com/wp-content/uploads/bb-plugin/cache/Gambar-WhatsApp-2024-09-18-pukul-10.27.32_0e39f465-800x578-1-1f9c91512dc68b12ba296f865beb6873-.jpg'],
            ['id' => 4, 'image' => 'https://galaxykanopi.com/wp-content/uploads/bb-plugin/cache/IMG-20240918-WA0037-600x800-1-4902cd4147e69932302163faddc45c27-.jpg'],
            ['id' => 5, 'image' => 'https://galaxykanopi.com/wp-content/uploads/bb-plugin/cache/IMG-20240918-WA0036-800x360-1-3b7fb795016cbcdede1c8c59890226b7-.jpg'],
            ['id' => 6, 'image' => 'https://galaxykanopi.com/wp-content/uploads/bb-plugin/cache/IMG-20240918-WA0035-800x600-1-97448c7fcc1e12cec33bd3b6564a8b42-.jpg'],
        ];

        return view('beranda', compact('dataSlider', 'dataJenisKanopi', 'dataPortofolio'));
    }
}
