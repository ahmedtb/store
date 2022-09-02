<?php

namespace App\Filters;

class NotificationFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'name',
        'with',
        'status',

    ];

    protected function name($name)
    {
        return $this->builder->where('name', 'LIKE', "%{$name}%");
    }

    protected function status($status)
    {
        return $this->builder->where('status', $status);
    }

    protected function with($with)
    {
        return $this->builder->with($with);
    }
}
