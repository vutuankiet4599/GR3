<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ApplicationJob>
 */
class ApplicationJobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->jobTitle(),
            'description' => fake()->text(),
            'salary' => "Thương lượng",
            'welfare' => json_encode(fake()->sentences()),
            'experience' => fake()->randomFloat(1, 0, 10),
            'interview' => json_encode(fake()->sentences()),
            'type' => fake()->randomElement(['in office', 'remote', 'hybrid']),
            'contract' => fake()->randomElement(['parttime', 'fulltime', 'freelance']),
            'work' => json_encode(fake()->sentences()),
            'skill' => json_encode(fake()->sentences()),
            'level' => fake()->randomElement(['intern', 'fresher', 'junior', 'middle', 'senior', 'leader', 'manager']),
            'company_id' => fake()->numberBetween(1, 10),
            'city_id' => fake()->numberBetween(1, 4),
            'status' => 'opening',
        ];
    }
}
