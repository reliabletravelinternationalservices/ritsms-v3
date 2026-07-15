<?php

namespace App\Console\Commands;

use App\Models\Destination;
use App\Models\Package;
use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate';

    protected $description = 'Generate sitemap.xml';

    public function handle(): int
    {
        $sitemap = Sitemap::create();

        /*
        |--------------------------------------------------------------------------
        | Static Pages
        |--------------------------------------------------------------------------
        */

        $pages = [
            route('client.landing'),
            route('client.about'),
            route('client.contact'),
            route('client.destination'),
            route('client.destination.countries'),
            route('client.outbound'),
            route('client.inbound'),
            route('client.inquiry.policy'),
        ];

        foreach ($pages as $page) {
            $sitemap->add(
                Url::create($page)
                    ->setPriority(1.0)
                    ->setLastModificationDate(now())
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Destination Countries
        |--------------------------------------------------------------------------
        */

        Destination::all()->each(function (Destination $destination) use ($sitemap) {

            $sitemap->add(
                Url::create(
                    route(
                        'client.destination.country',
                        $destination->id
                    )
                )
                ->setPriority(0.9)
                ->setLastModificationDate($destination->updated_at)
            );

        });

        /*
        |--------------------------------------------------------------------------
        | Outbound Packages
        |--------------------------------------------------------------------------
        */

        Package::where('is_foreign_only', true)
            ->each(function (Package $package) use ($sitemap) {

                $sitemap->add(
                    Url::create(
                        route(
                            'client.outbound.package.detail',
                            $package->slug
                        )
                    )
                    ->setPriority(0.9)
                    ->setLastModificationDate($package->updated_at)
                );

            });

        /*
        |--------------------------------------------------------------------------
        | Inbound Packages
        |--------------------------------------------------------------------------
        */

        Package::where('is_foreign_only', false)
            ->each(function (Package $package) use ($sitemap) {

                $sitemap->add(
                    Url::create(
                        route(
                            'client.inbound.package.detail',
                            $package->slug
                        )
                    )
                    ->setPriority(0.9)
                    ->setLastModificationDate($package->updated_at)
                );

            });

        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->info('Sitemap generated successfully.');

        return self::SUCCESS;
    }
}