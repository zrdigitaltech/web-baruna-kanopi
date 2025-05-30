<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $dataSlider = [
            ['id' => 1, 'image' => 'https://placehold.co/1280x576', 'title' => 'Ahli dalam Pemasangan Kanopi', 'deskripsi' => 'Dengan latar belakang yang solid di bidang ini, kami siap memberikan layanan berkualitas tinggi dan hasil kerja yang memuaskan pelanggan.'],
            ['id' => 2, 'image' => 'https://placehold.co/1280x576', 'title' => 'Baruna Kanopi', 'deskripsi' => 'Kami hadir untuk memberikan solusi terbaik bagi kebutuhan kanopi berkualitas tinggi yang tidak hanya tahan lama tetapi juga estetis.'],
            ['id' => 3, 'image' => 'https://placehold.co/1280x576', 'title' => 'Ahli dalam Pemasangan Kanopi', 'deskripsi' => 'Dengan latar belakang yang solid di bidang ini, kami siap memberikan layanan berkualitas tinggi dan hasil kerja yang memuaskan pelanggan.'],
            ['id' => 4, 'image' => 'https://placehold.co/1280x576', 'title' => 'Baruna Kanopi', 'deskripsi' => 'Kami hadir untuk memberikan solusi terbaik bagi kebutuhan kanopi berkualitas tinggi yang tidak hanya tahan lama tetapi juga estetis.'],
        ];

        $dataJenisKanopi = [
            ['id' => 1, 'image' => 'https://placehold.co/525x525', 'nama' => 'Kanopi Alderon <br class="d-sm-none"/> Single',],
            ['id' => 2, 'image' => 'https://placehold.co/525x525', 'nama' => 'Kanopi Alderon <br class="d-sm-none"/> Double',],
            ['id' => 3, 'image' => 'https://placehold.co/525x525', 'nama' => 'Kanopi <br class="d-sm-none"/> Solar Flat'],
            ['id' => 4, 'image' => 'https://placehold.co/525x525', 'nama' => 'Kanopi <br class="d-sm-none"/> Baja Ringan',],
            ['id' => 5, 'image' => 'https://placehold.co/525x525', 'nama' => 'Kanopi <br class="d-sm-none"/> Polycarbonate',],
            ['id' => 6, 'image' => 'https://placehold.co/525x525', 'nama' => 'Kanopi Solar <br class="d-sm-none"/> Flat Sliding'],
        ];

        $dataPortofolio = [
            ['id' => 1, 'image' => 'https://placehold.co/600x420'],
            ['id' => 2, 'image' => 'https://placehold.co/600x420'],
            ['id' => 3, 'image' => 'https://placehold.co/600x420'],
            ['id' => 4, 'image' => 'https://placehold.co/600x420'],
            ['id' => 5, 'image' => 'https://placehold.co/600x420'],
            ['id' => 6, 'image' => 'https://placehold.co/600x420'],
        ];

        return view('beranda', compact('dataSlider', 'dataJenisKanopi', 'dataPortofolio'));
    }
}
