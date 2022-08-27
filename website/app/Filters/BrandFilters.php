<?php

namespace App\Filters;

class BrandFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'name',
        'with',

    ];

    protected function name($name)
    {
        return $this->builder->where('name', 'LIKE', "%{$name}%");
    }

    protected function with($with)
    {
        return $this->builder->with($with);
    }

}
