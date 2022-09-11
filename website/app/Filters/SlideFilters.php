<?php

namespace App\Filters;

class SlideFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'to',

    ];

    protected function to($to)
    {
        return $this->builder->where('to', 'LIKE', "%{$to}%");
    }


}
