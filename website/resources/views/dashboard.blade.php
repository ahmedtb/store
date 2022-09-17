<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=1560">

    <title>{{env('APP_NAME')}}</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">


    @if (env('APP_ENV') == 'local')
        <link href="{{ asset('css/dashboard.css') . '?rndstr=' . random_int(0, 1000000) }}" rel="stylesheet">
        <script src="{{ asset('js/dashboard.js') . '?rndstr=' . random_int(0, 1000000) }}" defer></script>
    @else
        <link href="{{ asset('css/dashboard.css') }}" rel="stylesheet">
        <script src="{{ asset('js/dashboard.js') }}" defer></script>
    @endif
    @auth('admin')
        <script>
            window.admin = <?php echo json_encode(auth('admin')->user()); ?>;
        </script>
    @endauth
</head>

<body>
    <div id='dashboard' />
</body>

</html>
