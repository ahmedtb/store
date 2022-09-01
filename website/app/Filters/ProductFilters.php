<?php

namespace App\Filters;

class ProductFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'name',
        'with',
        'inRandomOrder',

    ];

    protected function name($name)
    {
        return $this->builder->where('name', 'LIKE', "%{$name}%");
    }

    protected function with($with)
    {
        return $this->builder->with($with);
    }

    protected function inRandomOrder()
    {
        return $this->builder->inRandomOrder();
    }

}
