<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'vutuankiet4599@gmail.com',
        // ]);

        $cityData = [
            [ "id" => 1, "name" => "Hải Phòng" ],
            [ "id" => 2, "name" => "Hà Nội" ],
            [ "id" => 3, "name" => "Hồ Chí Minh" ],
            [ "id" => 4, "name" => "Đà Nẵng" ]
        ];

        \App\Models\User::factory(30)->create();
        \App\Models\Company::factory(10)->create();
        \App\Models\City::insert($cityData);
        \App\Models\ApplicationJob::factory(100)->create();
        \App\Models\Application::factory(200)->create();
    }
}
