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
        'q',
        'priceFrom',
        'priceTo',

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
    
    protected function q($q)
    {
        return $this->builder->where('name', 'LIKE', "%{$q}%");
    }
        
    protected function priceFrom($priceFrom)
    {
        return $this->builder->where('price', '>=', $priceFrom);
    }
        
    protected function priceTo($priceTo)
    {
        return $this->builder->where('price', '<=', $priceTo);
    }

}
