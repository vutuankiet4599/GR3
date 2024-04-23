<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Application>
 */
class ApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $userCount = 30;
        $applicationJobCount = 100;

        $applications = [];
        
        for ($i = 1; $i <= $userCount; $i++) {
            for ($j = 1; $j <= $applicationJobCount; $j++) {
                array_push($applications, $i . "-" . $j);
            }
        }

        $application = fake()->unique()->randomElement($applications);

        $application = explode('-', $application);
        $userId = $application[0];
        $applicationJobId = $application[1];

        return [
            'user_id' => $userId,
            'application_job_id' => $applicationJobId,
            'status' => fake()->randomElement(['pending', 'accepted', 'rejected']),
        ];
    }
}
