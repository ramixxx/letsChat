<?php

namespace App\Http\Controllers;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Illuminate\Support\Facades\DB;

require '../vendor/autoload.php';

class Chat implements MessageComponentInterface {
  protected $clients;
  public function __construct() {
      $this->clients = new \SplObjectStorage;
  }
  
  public function onOpen(ConnectionInterface $conn)
  {
     // Store the new connection to send messages to later
     $this->clients->attach($conn);
     echo "New connection! ({$conn->resourceId})\n";
  }
  public function onMessage(ConnectionInterface $from, $msg) 
  {
      $numRecv = count($this->clients) - 1;
      echo sprintf('Connection %d sending message "%s" to %d other            connection%s' . "\n", $from->resourceId, $msg, $numRecv, $numRecv ==  1 ? '' : 's');

      $response = DB::select('select * from user_messages where recipient_id = ?', [$msg]);
      $test = $this->test();
      $response = $msg;
      $response = json_encode($response);
      foreach ($this->clients as $client) {
        //The sender is not the receiver, send to other clients
          $client->send($response);
      }
  }
  public function onClose(ConnectionInterface $conn)
  {
     // The connection is closed, remove from connection list
     $this->clients->detach($conn);
     echo "Connection {$conn->resourceId} has disconnected\n";
  }
  public function onError(ConnectionInterface $conn, \Exception $e)
  {
      echo "An error has occurred: {$e->getMessage()}\n";
      $conn->close();
  }
}