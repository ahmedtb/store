<?php

namespace App\Models;

use App\Casts\Json;
use App\Filters\OrderFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Validation\ValidationException;
use Spatie\Activitylog\Traits\LogsActivity;

class Order extends Model
{
    use HasFactory, LogsActivity;

    protected $guarded = [];
    protected $casts = [
        'GPS' => Json::class
    ];
    protected static $logAttributes = ['status'];


    protected $with = ['user', 'orderItems'];

    public static $statuses = ['new', 'ordered', 'accepted', 'rejected', 'paid'];

    public function scopeFilter($query, OrderFilters $filters)
    {
        return $filters->apply($query);
    }


    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function addToOrder(Product $product, int $quantity)
    {
        if ($this->status != 'new') {
            throw new ValidationException(['order' => 'you can add to this order']);
        }
        $orderItem = OrderItem::create([
            'order_id' => $this->id,
            'product_id' => $product->id,
            'quantity' => $quantity,
            'value' => $product->price * $quantity,
        ]);
        return $orderItem;
    }

    public function removeFromOrder($id)
    {

        $orderItem = $this->orderItems()->where('id', $id)->first();
        if (!$orderItem) {
            throw new ValidationException(['order_item_id' => 'this order does not have item with id ' . $id]);
        }
        $orderItem->delete();
    }
}
