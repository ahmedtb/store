<?php

namespace App\Notifications;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class NewCartCreated extends Notification
{
    use Queueable;

    protected Order $cart;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Order $cart)
    {
        $this->cart = $cart;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database', 'broadcast'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'title' => 'سلة جديدة ' . $this->cart->id . ' إنشأت',
            'message' => '',
            'to' => "/dashboard/orderShow/{$this->cart->id}" 

        ];
    }
}