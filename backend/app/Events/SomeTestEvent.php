<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Support\Facades\DB;

class SomeTestEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $data = [];
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($value, $date)
    {
        $this->data['value'] = $value;
        $this->data['date'] = $date;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('office-dashboard');
    }

    public function broadcastWith()
    {
        return [
            'data' => $this->data['value'],
            'date' => $this->data['date']
        ];
    }

    public function broadcastAs() {
        return 'SomeTestEvent';
    }
}
