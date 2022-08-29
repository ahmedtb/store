<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Admin;
use App\Models\OrderItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create(['phone' => '0914354173', 'password' => Hash::make('password')]);
        \App\Models\Product::factory(150)->create();
        \App\Models\Brand::factory(5)->create();
        // \App\Models\Order::factory(100)->create();
        // OrderItem::factory(200)->create();
        Admin::factory(5)->create();
    }
}
