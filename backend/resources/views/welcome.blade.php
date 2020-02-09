<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<script src="{{ asset('js/app.js') }}"></script>
    <script src="//{{ Request::getHost() }}:6001/socket.io/socket.io.js"></script>
    <script>
        if(typeof io === "undefined"){
            alert('please check your laravel-echo-server status!');
        }else{
            window.Echo.channel('office-dashboard')
                .listen('.SomeTestEvent', function (e) {
                    console.log(e);
                });
        }
    </script>
</html>