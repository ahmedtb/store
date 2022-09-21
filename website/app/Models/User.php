<?php

namespace App\Models;

use App\Traits\Notifiable;
use Illuminate\Support\Str;
use App\Filters\UserFilters;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Sanctum\NewAccessToken;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
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

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'phone_verified_at' => 'datetime',

    ];


    public function scopeFilter($query, UserFilters $filters)
    {
        return $filters->apply($query);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function cart()
    {
        $count = $this->orders()->where('status', 'new')->count();
        if ($count > 1 && $count != 0) {
            $this->orders()->where('status', 'new')->latest()->limit($count - 1)->delete();
        }
        // return null;
        return $this->orders()->where('status', 'new')->first();
    }

    public function createToken(string $name, string $expo_token, array $abilities = ['*'])
    {
        $token = $this->tokens()->forceCreate([
            'tokenable_id' => $this->id,
            'tokenable_type' => static::class,
            'name' => $name,
            'token' => hash('sha256', $plainTextToken = Str::random(40)),
            'expo_token' => $expo_token,
            'abilities' => $abilities,
        ]);

        return new NewAccessToken($token, $token->getKey() . '|' . $plainTextToken);
    }
    
    public function routeNotificationForExpoApp()
    {
        return $this->expoTokens();
    }

    public function expoTokens()
    {
        return $this->tokens()->pluck('expo_token')->unique();
    }

    
}
