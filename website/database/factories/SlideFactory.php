<?php

namespace Database\Factories;

use App\Models\Slide;
use Illuminate\Database\Eloquent\Factories\Factory;

class SlideFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'image' => Slide::defaultImage(rand(0, 3)),
            'to' => '/'
        ];
    }
}
