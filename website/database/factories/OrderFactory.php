<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => rand(0, 5) == 1 || User::count() == 0 ? User::factory()->create()->id : User::inRandomOrder()->first()->id,
        ];
    }
}
