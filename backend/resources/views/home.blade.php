@extends('layouts.app')

@section('content')
<script src="{{ asset('/js/app.js') }}"></script>
    <script src="//{{ Request::getHost() }}:6001/socket.io/socket.io.js"></script>
    <script>
        if(typeof io === "undefined"){
            alert('please check your laravel-echo-server status!');
        }else{
            Echo.channel('everyone')
                .listen('SendMsgEvent', function (e) {
                    if (e.msg) {
                        app.listenMsg(e.msg);
                    }
                });
        }
    </script>
@endsection
