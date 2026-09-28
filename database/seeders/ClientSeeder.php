<?php

namespace Database\Seeders;

use App\Enums\Client\Gender;
use App\Enums\Client\Source;
use App\Enums\Client\Status;
use App\Enums\Client\Type;
use App\Models\Client;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {   
        DB::transaction(function(){
            foreach ($this->data() as $client) {
                Client::create($client);
            }
        });
    }


    private function data(): array
    {
        return [
            [
                'name' => 'Maria Santos',
                'email' => 'maria.santos@gmail.com',
                'phone' => '+639171234567',
                'address' => 'General Trias, Cavite',
                'type' => Type::PERSONAL->value,
                'status' => Status::NEW->value,
                'source' => Source::WEBSITE->value,
                'gender' => Gender::FEMALE->value,
                'accept_marketing' => true,
                'website_link' => null,
                'facebook_link' => 'https://facebook.com/maria.santos',
                'last_contacted_at' => null,
                'notes' => 'Interested in Japan group tour. Asked about available departure dates and visa requirements.',
            ],

            [
                'name' => 'Mark Reyes',
                'email' => 'mark.reyes@gmail.com',
                'phone' => '+639181987654',
                'address' => 'Dasmarinas, Cavite',
                'type' => Type::PERSONAL->value,
                'status' => Status::QUOTATION_SENT->value,
                'source' => Source::FACEBOOK->value,
                'gender' => Gender::MALE->value,
                'accept_marketing' => false,
                'website_link' => null,
                'facebook_link' => 'https://facebook.com/mark.reyes',
                'last_contacted_at' => now()->subDays(2),
                'notes' => 'Interested in Korea Seoul & Nami Island tour. Quotation sent for 2 persons.',
            ],
        ];
    }
}
