<?php
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use App\Http\Sockets\Controllers\Chat;

require dirname(__DIR__) . '/vendor/autoload.php';
$server = IoServer::factory(
            new HttpServer(
                new WsServer(
                    new App\Http\Controllers\Chat()
                )
            ),
          8080
         );
$server->run();