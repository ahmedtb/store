<?php

namespace App\Models;

use App\Filters\OrderItemFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrderItem extends Model
{
    use HasFactory;

    protected $with = ['order', 'product'];
    protected $guarded = [];

        
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public function scopeFilter($query, OrderItemFilters $filters)
    {
        return $filters->apply($query);
    }

    

}
