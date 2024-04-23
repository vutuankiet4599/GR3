<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DevReceiveNotificationFromCompanyEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $data, $userId;

    /**
     * Create a new event instance.
     */
    public function __construct($data, $userId)
    {
        $this->data = $data;
        $this->userId = $userId;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('dev-' + $this->userId),
        ];
    }
}
