<?php

namespace Database\Seeders;

use App\Enums\Tour\Category;
use App\Enums\Tour\ItineraryType;
use App\Enums\Tour\State;
use App\Enums\Tour\TourType;
use App\Enums\Tour\Visibility;
use App\Models\Tour;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TourSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::transaction(function(){
            foreach ($this->data() as $tour) {
                Tour::create($tour);
            }
        });
    }


    private function data(): array
    {
        return [
            [
                'name' => 'Japan Golden Route Tour',
                'category' => Category::OUTBOUND->value,
                'itinerary_type' => ItineraryType::ROUND_TRIP->value,
                'tour_type' => TourType::GROUP->value,
                'state' => State::PUBLISHED->value,
                'visibility' => Visibility::PUBLIC->value,
                'duration' => 5,

                'highlights' => json_encode('
                    <ul>
                        <li>Tokyo city tour</li>
                        <li>Mount Fuji and Lake Kawaguchi</li>
                        <li>Traditional Asakusa and Senso-ji Temple</li>
                        <li>Shibuya Crossing</li>
                        <li>Shopping at Ginza and Akihabara</li>
                    </ul>
                '),

                'inclusions' => json_encode('
                    <ul>
                        <li>Round-trip economy airfare Manila–Tokyo–Manila</li>
                        <li>4 nights hotel accommodation</li>
                        <li>Daily breakfast</li>
                        <li>Airport and land transfers</li>
                        <li>English-speaking local tour guide</li>
                        <li>Entrance fees as indicated in the itinerary</li>
                        <li>Travel insurance</li>
                    </ul>
                '),

                'exclusions' => json_encode('
                    <ul>
                        <li>Japan visa fee and processing expenses</li>
                        <li>Personal expenses</li>
                        <li>Lunch and dinner unless specifically stated</li>
                        <li>Excess baggage</li>
                        <li>Optional tours and activities</li>
                        <li>Tips for guides and drivers</li>
                    </ul>
                '),

                'terms_and_conditions' => json_encode('
                    <ul>
                        <li>Tour package rates are subject to availability and change without prior notice.</li>
                        <li>Passport must be valid for at least 6 months from the date of departure.</li>
                        <li>Visa approval is subject to the decision of the Japanese Embassy.</li>
                        <li>Final itinerary may be adjusted due to weather, local conditions, or operational requirements.</li>
                        <li>Booking confirmation is subject to payment and availability.</li>
                    </ul>
                '),

                'description' => 'Experience Japan through the highlights of Tokyo and the iconic Mount Fuji area.',

                'badge' => 'Popular',
                'booking_deadline' => null,
                'notes' => null,
            ],

            [
                'name' => 'Korea Seoul & Nami Island Tour',
                'category' => Category::OUTBOUND->value,
                'itinerary_type' => ItineraryType::ROUND_TRIP->value,
                'tour_type' => TourType::GROUP->value,
                'state' => State::PUBLISHED->value,
                'visibility' => Visibility::PUBLIC->value,
                'duration' => 4,

                'highlights' => json_encode('
                    <ul>
                        <li>Seoul city sightseeing</li>
                        <li>Nami Island</li>
                        <li>Gyeongbokgung Palace</li>
                        <li>Bukchon Hanok Village</li>
                        <li>Myeongdong shopping district</li>
                        <li>Korean cultural experience</li>
                    </ul>
                '),

                'inclusions' => json_encode('
                    <ul>
                        <li>Round-trip economy airfare Manila–Seoul–Manila</li>
                        <li>3 nights hotel accommodation</li>
                        <li>Daily breakfast</li>
                        <li>Airport transfers</li>
                        <li>Transportation throughout the tour</li>
                        <li>English-speaking local tour guide</li>
                        <li>Entrance fees mentioned in the itinerary</li>
                        <li>Travel insurance</li>
                    </ul>
                '),

                'exclusions' => json_encode('
                    <ul>
                        <li>Korea visa fee and processing expenses</li>
                        <li>Personal expenses</li>
                        <li>Lunch and dinner unless specified</li>
                        <li>Optional activities</li>
                        <li>Excess baggage charges</li>
                        <li>Guide and driver gratuities</li>
                    </ul>
                '),

                'terms_and_conditions' => json_encode('
                    <ul>
                        <li>Package rates are subject to airline, hotel, and tour availability.</li>
                        <li>Passport must be valid for at least 6 months from the date of departure.</li>
                        <li>Visa approval is subject to the decision of the Korean immigration authorities.</li>
                        <li>Hotel check-in and check-out times are subject to hotel policy.</li>
                        <li>Tour sequence may change depending on local conditions and operational requirements.</li>
                        <li>Booking is confirmed only upon receipt of the required payment.</li>
                    </ul>
                '),

                'description' => 'Discover Seoul through a combination of Korean culture, historic landmarks, scenic destinations, and shopping.',

                'badge' => 'Best Seller',
                'booking_deadline' => null,
                'notes' => null,
            ],
        ];
    }
}
