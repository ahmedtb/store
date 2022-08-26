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

    protected $with = ['category'];

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

    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }


    public function image()
    {
        $extension = explode('/', explode(";", $this->image ?? $this->defaultImage())[0])[1];

        $raw_image_string = base64_decode(explode("base64,", $this->image ?? $this->defaultImage())[1]);
        return response($raw_image_string)->header('Content-Type', 'image/' . $extension);
    }



}
