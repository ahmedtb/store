<?php

namespace App\Models;

use App\Casts\Json;
use App\Traits\Notifiable;
use App\Filters\AdminFilters;
use Laravel\Sanctum\HasApiTokens;
use Database\Factories\AdminFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'password',
        'roles'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];
    protected $guarded = [];

    
    public static $possibleRoles = [
        'super'
    ];
    protected $casts = [
        'roles' => Json::class
    ];

    public function scopeFilter($query, AdminFilters $filters)
    {
        return $filters->apply($query);
    }
}
