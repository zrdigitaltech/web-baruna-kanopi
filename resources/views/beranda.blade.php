@extends('layouts.app')

@section('title', 'Beranda')

@section('content')
<x-slider :data="$dataSlider" />
<x-cta />
<x-tentang />
<x-keunggulan-kami />
<x-alasan-memilih-kami />
<x-jenis-kanopi :data="$dataJenisKanopi" />
<x-project-kami :data="$dataPortofolio" />
<x-testimonial :data="$dataTestimoni" />
<x-google-maps />

<x-whatsapp-kami :data="$dataJenisKanopi" />
<x-terima-kasih />
@endsection