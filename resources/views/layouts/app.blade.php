<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light">

    <title>@yield('title', 'BrainVLM')</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <link rel="icon" href="{{ asset('assets/brainvlm-logo.svg') }}">
    <link rel="stylesheet" href="{{ asset('css/brainvlm.css') }}">

    @stack('head')
</head>
<body>
    <header class="topbar" role="banner">
        <div class="topbar__inner">
            <a class="brand" href="{{ route('brainvlm') }}" aria-label="Go to BrainVLM home">
                <img class="brand__logo" src="{{ asset('assets/brainvlm-logo.svg') }}" alt="">
                <div class="brand__text">
                    <div class="brand__title">Clinical MRI Assistant</div>
                    <div class="brand__subtitle">Clean hospital UI • Prototype</div>
                </div>
            </a>

            <div class="topbar__actions" aria-label="Status">
                <span class="badge badge--neutral" id="appStatus">Ready</span>
            </div>
        </div>
    </header>

    <main class="container" role="main">
        @yield('content')
    </main>

    <footer class="footer" role="contentinfo">
        <div class="footer__inner">
            <span class="muted">© {{ date('Y') }}</span>
        </div>
    </footer>

    <script src="{{ asset('js/brainvlm.js') }}" defer></script>
    @stack('scripts')
</body>
</html>
