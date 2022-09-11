<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->sentence(2),
            'price' => $this->faker->numberBetween(1, 100),
            'description' => $this->faker->text(100),
            'category_id' => Category::inRandomOrder()->first()->id ?? Category::factory()->create()->id,
            'quantity' => $this->faker->numberBetween(1, 500),
            'image' => Product::defaultImage()
        ];
    }
}
