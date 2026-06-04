<?php

namespace App\Repository\Dashboard;

use App\Models\Booking;
use App\Models\Destination;
use App\Models\Inquiry;
use App\Models\Package;
use App\Models\PackageGroup;

class DashboardRepository
{
    /**
     * Get dashboard data with counts and monthly inquiry statistics
     */
    public function getDashboardData(): array
    {
        return [
            'packages_count' => Package::count(),
            'destinations_count' => Destination::count(),
            'inquiries_count' => Inquiry::count(),
            'collections_count' => PackageGroup::count(),
            'bookings_count' => Booking::count(),
            'monthly_inquiries' => $this->getMonthlyInquiries(),
        ];
    }

    /**
     * Get monthly inquiry statistics for the chart
     */
    private function getMonthlyInquiries(): array
    {
        $monthlyData = Inquiry::selectRaw('
                MONTH(created_at) as month,
                YEAR(created_at) as year,
                COUNT(*) as count
            ')
            ->groupByRaw('YEAR(created_at), MONTH(created_at)')
            ->orderByRaw('YEAR(created_at) DESC, MONTH(created_at) DESC')
            ->limit(12)
            ->get();

        $months = [
            1 => 'Jan',
            2 => 'Feb',
            3 => 'Mar',
            4 => 'Apr',
            5 => 'May',
            6 => 'Jun',
            7 => 'Jul',
            8 => 'Aug',
            9 => 'Sep',
            10 => 'Oct',
            11 => 'Nov',
            12 => 'Dec',
        ];

        return $monthlyData->map(function ($item) use ($months) {
            return [
                'month' => $months[$item->month],
                'count' => $item->count,
                'dateKey' => (string) $item->year,
            ];
        })->reverse()->values()->toArray();
    }
}
