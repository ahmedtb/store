<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=1560">

    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">


    @if (env('APP_ENV') == 'local')
        <link href="{{ asset('css/app.css') . '?rndstr=' . random_int(0, 1000000) }}" rel="stylesheet">
        <script src="{{ asset('js/app.js') . '?rndstr=' . random_int(0, 1000000) }}" defer></script>
    @else
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <script src="{{ asset('js/app.js') }}" defer></script>
    @endif
</head>

<body>
    <div id='store' />
    
</body>

</html>
