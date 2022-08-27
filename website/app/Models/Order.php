<?php

namespace App\Models;

use App\Filters\OrderFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;

    protected $with = ['user'];
    
    public function scopeFilter($query, OrderFilters $filters)
    {
        return $filters->apply($query);
    }

    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
