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
            ['id' => 1, 'image' => 'https://placehold.co/525x525', 'nama' => 'Kanopi Alderon <br class="d-sm-none"/> Single', 'deskripsi' => 'Ringan, tahan lama & cocok untuk teras.'],
            ['id' => 2, 'image' => 'https://placehold.co/525x525', 'nama' => 'Kanopi Alderon <br class="d-sm-none"/> Double', 'deskripsi' => 'Ganda, sejuk & redam suara lebih baik.'],
            ['id' => 3, 'image' => 'https://placehold.co/525x525', 'nama' => 'Kanopi <br class="d-sm-none"/> Solar Flat', 'deskripsi' => 'Atap rata, terang alami & tahan cuaca.'],
            ['id' => 4, 'image' => 'https://placehold.co/525x525', 'nama' => 'Kanopi <br class="d-sm-none"/> Baja Ringan', 'deskripsi' => 'Kuat, ringan, <br/> dan tahan lama.'],
            ['id' => 5, 'image' => 'https://placehold.co/525x525', 'nama' => 'Kanopi <br class="d-sm-none"/> Polycarbonate', 'deskripsi' => 'Transparan, kuat & tampak elegan.'],
            ['id' => 6, 'image' => 'https://placehold.co/525x525', 'nama' => 'Kanopi Solar <br class="d-sm-none"/> Flat Sliding', 'deskripsi' => 'Geser fleksibel, buka tutup sesuai cuaca.'],
        ];

        $dataPortofolio = [
            ['id' => 1, 'image' => 'https://placehold.co/600x420'],
            ['id' => 2, 'image' => 'https://placehold.co/600x420'],
            ['id' => 3, 'image' => 'https://placehold.co/600x420'],
            ['id' => 4, 'image' => 'https://placehold.co/600x420'],
            ['id' => 5, 'image' => 'https://placehold.co/600x420'],
            ['id' => 6, 'image' => 'https://placehold.co/600x420'],
        ];

        $dataTestimoni = [
            [
                'description' => 'Proses pemasangan cepat dan hasilnya sesuai janji. Tim Baruna Kanopi sangat teliti dan bertanggung jawab.',
                'name' => 'Sari Wulandari',
                'role' => 'Pengusaha Lokal',
                'avatar' => '/assets/images/avatar.png',
            ],
            [
                'description' => 'Baruna Kanopi memberikan layanan pemasangan yang sangat rapi dan profesional. Kanopi kami kini tampak lebih elegan dan kuat.',
                'name' => 'Budi Santoso',
                'role' => 'Pemilik Rumah',
                'avatar' => '/assets/images/avatar.png',
            ],
            [
                'description' => 'Kanopi baru kami terlihat modern dan tahan lama, berkat material berkualitas dari Baruna Kanopi. Sangat direkomendasikan!',
                'name' => 'Andi Prasetyo',
                'role' => 'Kontraktor Bangunan',
                'avatar' => '/assets/images/avatar.png',
            ],
            [
                'description' => 'Pelayanan ramah dan hasil pemasangan sangat memuaskan. Terima kasih Baruna Kanopi atas profesionalismenya!',
                'name' => 'Dewi Kartika',
                'role' => 'Ibu Rumah Tangga',
                'avatar' => '/assets/images/avatar.png',
            ]
        ];

        return view('beranda', compact('dataSlider', 'dataJenisKanopi', 'dataPortofolio', 'dataTestimoni'));
    }
}
