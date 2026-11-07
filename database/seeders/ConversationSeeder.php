<?php

namespace Database\Seeders;

use App\Enums\Convo\Type;
use App\Services\Convo\ConvoService;
use App\Services\Convo\MessageService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ConversationSeeder extends Seeder
{

    public function __construct(protected ConvoService $convoService, protected MessageService $messageService) {}

    public function run(): void
    {

        $convoData = [
            [
                'id' => 1,
                'name' => 'Japan Group 2027',
                'type' => Type::GROUP,
                'creatorID' => 1,
                'participants' => [1, 2, 3, 4, 5],
                'firstMessage' => 'Hello guys',
            ],
            [
                'id' => 2,
                'name' => null,
                'type' => Type::PRIVATE,
                'creatorID' => 1,
                'participants' => [1, 2],
                'firstMessage' => 'Hi Ms. Dhel!',
            ],
            [
                'id' => 3,
                'name' => null,
                'type' => Type::PRIVATE,
                'creatorID' => 1,
                'participants' => [1, 3],
                'firstMessage' => 'Hello Client!.',
            ],
            [
                'id' => 4,
                'name' => null,
                'type' => Type::PRIVATE,
                'creatorID' => 1,
                'participants' => [1, 4],
                'firstMessage' => 'Welcome client!',
            ],
            [
                'id' => 5,
                'name' => null,
                'type' => Type::PRIVATE,
                'creatorID' => 1,
                'participants' => [1, 5],
                'firstMessage' => 'I\'ll contact you here!',
            ],
            [
                'id' => 6,
                'name' => 'Visa Korea Only',
                'type' => Type::GROUP,
                'creatorID' => 1,
                'participants' => [1, 2, 6, 7],
                'firstMessage' => 'Hello Everyone. Let\'s talk here.',
            ],
            [
                'id' => 7,
                'name' => 'Reliable Agents',
                'type' => Type::GROUP,
                'creatorID' => 1,
                'participants' => [1, 2],
                'firstMessage' => 'This convo is for agent only',
            ],
        ];

        foreach ($convoData as $convo) {
            $newConvo = $this->convoService->create(
                $convo['participants'],
                $convo['type'],
                $convo['creatorID'],
                $convo['name']
            );

            $this->messageService->createTextMessage(
                $newConvo,
                $convo['firstMessage'],
                $convo['creatorID'],
            );
        }
    }
}
