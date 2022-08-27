<?php

namespace App\Filters;

class UserFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'user_id',

    ];

    protected function user_id($user_id)
    {
        return $this->builder->where('user_id', 'LIKE', "%{$user_id}%");
    }

    protected function with($with)
    {
        return $this->builder->with($with);
    }

}
