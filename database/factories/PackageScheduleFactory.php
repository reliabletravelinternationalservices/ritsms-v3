<?php

namespace Database\Factories;

use App\Models\Package;
use App\Models\PackageSchedule;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PackageSchedule>
 */
class PackageScheduleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $departureDate = fake()->dateTimeBetween('+1 week', '+2 months');
        $returnDate = fake()->dateTimeBetween($departureDate, '+3 months');

        return [
            'package_id' => Package::factory(),
            'departure_date' => $departureDate->format('Y-m-d'),
            'return_date' => $returnDate->format('Y-m-d'),
            'price' => fake()->randomFloat(2, 100, 5000),
            'is_available' => fake()->boolean(80),
            'is_limited' => fake()->boolean(30),
        ];
    }

    /**
     * Indicate that the schedule has no return date.
     */
    public function noReturnDate(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'return_date' => null,
            ];
        });
    }

    /**
     * Indicate that the schedule is available.
     */
    public function available(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'is_available' => true,
            ];
        });
    }

    /**
     * Indicate that the schedule is unavailable.
     */
    public function unavailable(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'is_available' => false,
            ];
        });
    }

    /**
     * Indicate that the schedule has limited slots.
     */
    public function limited(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'is_limited' => true,
            ];
        });
    }
}
