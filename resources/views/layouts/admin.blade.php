<!DOCTYPE html>
<html lang="id">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ $title }} · MyAds</title>
        @foreach (['admin', 'refinements', 'tutorial'] as $stylesheet)
        <link rel="stylesheet" href="{{ asset('css/'.$stylesheet.'.css') }}?v={{ filemtime(public_path('css/'.$stylesheet.'.css')) }}">
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
        <script src="{{ asset('js/'.$script.'.js') }}?v={{ filemtime(public_path('js/'.$script.'.js')) }}" defer></script>
        @endforeach
    </body>
</html>
