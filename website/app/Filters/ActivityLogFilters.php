<?php

namespace App\Filters;

use App\Models\Admin;
use App\Models\User;

class ActivityLogFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'with',
        'description',
        'user_name',
        'admin_name',
        'latest',
        'subject_type',
        'from_date',
        'to_date',

    ];
    protected function with($with)
    {
        return $this->builder->with($with);
    }
    protected function subject_type($subject_type)
    {
        return $this->builder->where('subject_type', $subject_type);
    }
    protected function description($description)
    {
        return $this->builder->where('description', 'LIKE', "%{$description}%");
    }

    protected function user_name($user_name)
    {
        if (!$user_name)
            return $this->builder;
        return $this->builder->where('causer_type', User::class)->whereHas('causer', function ($query) use ($user_name) {
            return $query->where('name', 'LIKE', "%{$user_name}%");
        });
    }

    protected function admin_name($admin_name)
    {
        if (!$admin_name)
            return $this->builder;
        return $this->builder->where('causer_type', Admin::class)->whereHas('causer', function ($query) use ($admin_name) {
            return $query->where('name', 'LIKE', "%{$admin_name}%");
        });
    }

    protected function latest()
    {
        return $this->builder->latest();
    }

    
    protected function from_date($date)
    {
        return $this->builder->where('created_at', '>=', $date);
    }

    protected function to_date($date)
    {
        return $this->builder->where('created_at', '<=', $date);
    }
}