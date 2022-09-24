<?php

namespace App\Models;

use App\Filters\SlideFilters;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Slide extends Model
{
    use HasFactory;
    protected $guarded = [];

    protected $hidden = [
        // 'image'
    ];

    public static function defaultImage($num = 1)
    {
        $slidesNames = [
            'banner1.jpg', 'banner2.jpg', 'banner3.jpg', 'banner4.jpg'
        ];
        $path = base_path('public/images/' . $slidesNames[$num]);
        $fileExtention = fileExtension($path);
        // dd($fileExtention);

        return 'data:image/' . $fileExtention . ';base64,' . base64_encode(file_get_contents($path));
    }


    public function scopeFilter($query, SlideFilters $filters)
    {
        return $filters->apply($query);
    }


    public function image()
    {
        $extension = explode('/', explode(";", $this->image ?? $this->defaultImage())[0])[1];

        $raw_image_string = base64_decode(explode("base64,", $this->image ?? $this->defaultImage())[1]);
        return response($raw_image_string)->header('Content-Type', 'image/' . $extension);
    }
}
