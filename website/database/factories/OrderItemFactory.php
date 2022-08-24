<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'order_id' => rand(0, 5) == 1 || Order::count() == 0 ? Order::factory()->create()->id : Order::inRandomOrder()->first()->id,
            'product_id' =>  rand(0, 5) == 1 || Product::count() == 0 ? Product::factory()->create()->id : Product::inRandomOrder()->first()->id,
            'quantity' => $this->faker->numberBetween(1, 5),
            'value' => $this->faker->numberBetween(1, 5000),
        ];
    }
}
