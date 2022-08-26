<?php

namespace App\Models;

use App\Filters\CategoryFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;

    protected $guarded = [];

        
    public function scopeFilter($query, CategoryFilters $filters)
    {
        return $filters->apply($query);
    }
}
