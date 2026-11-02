<!DOCTYPE html>
<html lang="id">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ $title }} · MyAds</title>
        @foreach (['admin', 'refinements', 'tutorial'] as $stylesheet)
            @php
                $assetPath = 'css/'.$stylesheet.'.css';
                $version = is_file(public_path($assetPath)) ? filemtime(public_path($assetPath)) : null;
            @endphp
        <link rel="stylesheet" href="{{ asset($assetPath).($version !== null ? '?v='.$version : '') }}">
        @endforeach
    </head>
    <body data-menu="{{ $menu }}" data-action="{{ $action }}" data-record-id="{{ $recordId ?? '' }}">
        @include('partials.sidebar')
        <div class="app">
            @include('partials.header')
            <main>
                @yield('content')
                @include('partials.footer')
            </main>
        </div>
        @include('partials.feedback')
        @include('partials.tutorial')
        @stack('dialogs')
        @foreach (['admin-data', 'admin-app', 'ui', 'tutorial'] as $script)
            @php
                $assetPath = 'js/'.$script.'.js';
                $version = is_file(public_path($assetPath)) ? filemtime(public_path($assetPath)) : null;
            @endphp
        <script src="{{ asset($assetPath).($version !== null ? '?v='.$version : '') }}" defer></script>
        @endforeach
    </body>
</html>
