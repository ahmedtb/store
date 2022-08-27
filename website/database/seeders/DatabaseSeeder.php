<?php

namespace Database\Seeders;

use App\Models\OrderItem;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Product::factory(150)->create();
        \App\Models\Brand::factory(5)->create();
        \App\Models\Order::factory(100)->create();
        OrderItem::factory(200)->create();


    }
}
