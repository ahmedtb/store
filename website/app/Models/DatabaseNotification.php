<?php

namespace App\Models;

use App\Filters\NotificationFilters;
use Illuminate\Notifications\DatabaseNotification as IlluminateDatabaseNotification;

class DatabaseNotification extends IlluminateDatabaseNotification
{
    
    public function scopeFilter($query, NotificationFilters $filters)
    {
        return $filters->apply($query);
    }
}
