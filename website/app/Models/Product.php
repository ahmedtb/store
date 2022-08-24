<?php

namespace App\Models;

use App\Filters\ProductFilters;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $hidden = [
        'image'
    ];

    public static function defaultImage()
    {
        $path = base_path('public/images/product.jpg');
        $fileExtention = fileExtension($path);
        // dd($fileExtention);

        return 'data:image/' . $fileExtention . ';base64,' . base64_encode(file_get_contents($path));
    }

    
    public function scopeFilter($query, ProductFilters $filters)
    {
        return $filters->apply($query);
    }

}
