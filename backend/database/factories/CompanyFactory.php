<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => Carbon::now(),
            'password' => Hash::make('123456'),
            'address' => fake()->address(),
            'description' => fake()->text(),
            'logo' => fake()->imageUrl(),
            'size' => fake()->randomElement(['small', 'medium', 'big']),
            'nationality' => fake()->country(),
            'business' => fake()->word(),
            'website' => fake()->domainName(),
            'treatment' => json_encode(fake()->sentences()),
            'is_active' => true,
        ];
    }
}
