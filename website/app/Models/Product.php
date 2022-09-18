<?php

namespace App\Models;

use App\Filters\ProductFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $hidden = [
        'image'
    ];

    protected $appends  = ['availableQuantity'];

    protected $with = ['category'];

    public static function defaultImage($num = 1)
    {
        $productsNames = [
            'product.jpg', 'product2.jpg', 'product3.jpg', 'product4.jpg', 'product5.jpg'
        ];
        $path = base_path('public/images/' . $productsNames[$num]);
        // dump($path);
        $fileExtention = fileExtension($path);
        // dd($fileExtention);

        return 'data:image/' . $fileExtention . ';base64,' . base64_encode(file_get_contents($path));
    }


    public function scopeFilter($query, ProductFilters $filters)
    {
        return $filters->apply($query);
    }


    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function orders()
    {
        $ids = $this->orderItems()->pluck('order_id')->all();
        return Order::whereIn('id', $ids);
    }

    public function image()
    {
        $extension = explode('/', explode(";", $this->image ?? $this->defaultImage())[0])[1];

        $raw_image_string = base64_decode(explode("base64,", $this->image ?? $this->defaultImage())[1]);
        return response($raw_image_string)->header('Content-Type', 'image/' . $extension);
    }

    public function availableQuantity()
    {
        return $this->quantity - $this->orderItems()->whereHas('order', function ($query) {
            return $query->whereIn('status', ['accepted', 'paid']);
        })->sum('quantity');
    }

    public function getAvailableQuantityAttribute()
    {
        return $this->availableQuantity();
    }
}
