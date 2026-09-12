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
     * Get dashboard data with counts, trends and monthly inquiry statistics
     */
    public function getDashboardData(): array
    {
        return [
            'packages' => $this->getPackagesTrend(),
            'destinations' => $this->getDestinationsTrend(),
            'inquiries' => $this->getInquiriesTrend(),
            'collections' => $this->getCollectionsTrend(),
            'bookings' => $this->getBookingsTrend(),
            'monthly_inquiries' => $this->getMonthlyInquiries(),
        ];
    }

    /**
     * Calculate trend data (current count, trend percentage, trend type)
     */
    private function calculateTrend(int $totalCount, int $currentCount, int $previousCount): array
    {
        $trendValue = 0;
        $trendType = 'neutral';

        // If no current count, treat as neutral (new month with no data yet)
        if ($currentCount == 0) {
            return [
                'count' => $totalCount,
                'trend_value' => $trendValue,
                'trend_type' => $trendType,
            ];
        }

        if ($previousCount > 0) {
            $trendValue = (($currentCount - $previousCount) / $previousCount) * 100;
            $trendType = $trendValue > 0 ? 'up' : ($trendValue < 0 ? 'down' : 'neutral');
            $trendValue = abs(round($trendValue, 1));
        } else {
            // If previous count is 0 but current count > 0, it's a new item
            $trendValue = 100;
            $trendType = 'up';
        }

        return [
            'count' => $totalCount,
            'trend_value' => $trendValue,
            'trend_type' => $trendType,
        ];
    }

    /**
     * Get packages count with trend comparison to previous month
     */
    private function getPackagesTrend(): array
    {
        $currentMonth = now()->startOfMonth();
        $previousMonth = now()->subMonth()->startOfMonth();
        $totalPackages = Package::count();

        $currentCount = Package::whereBetween('created_at', [
            $currentMonth,
            $currentMonth->copy()->endOfMonth(),
        ])->count();

        $previousCount = Package::whereBetween('created_at', [
            $previousMonth,
            $previousMonth->copy()->endOfMonth(),
        ])->count();

        return $this->calculateTrend($totalPackages, $currentCount, $previousCount);
    }

    /**
     * Get destinations count with trend comparison to previous month
     */
    private function getDestinationsTrend(): array
    {
        $currentMonth = now()->startOfMonth();
        $previousMonth = now()->subMonth()->startOfMonth();

        $currentCount = Destination::whereBetween('created_at', [
            $currentMonth,
            $currentMonth->copy()->endOfMonth(),
        ])->count();

        $previousCount = Destination::whereBetween('created_at', [
            $previousMonth,
            $previousMonth->copy()->endOfMonth(),
        ])->count();

        $totalDestinations = Destination::count();

        return $this->calculateTrend($totalDestinations, $currentCount, $previousCount);
    }

    /**
     * Get inquiries count with trend comparison to previous month
     */
    private function getInquiriesTrend(): array
    {
        $currentMonth = now()->startOfMonth();
        $previousMonth = now()->subMonth()->startOfMonth();

        $currentCount = Inquiry::whereBetween('created_at', [
            $currentMonth,
            $currentMonth->copy()->endOfMonth(),
        ])->count();

        $previousCount = Inquiry::whereBetween('created_at', [
            $previousMonth,
            $previousMonth->copy()->endOfMonth(),
        ])->count();

        $totalInquiries = Inquiry::count();

        return $this->calculateTrend($totalInquiries, $currentCount, $previousCount);
    }

    /**
     * Get collections count with trend comparison to previous month
     */
    private function getCollectionsTrend(): array
    {
        $currentMonth = now()->startOfMonth();
        $previousMonth = now()->subMonth()->startOfMonth();

        $currentCount = PackageGroup::whereBetween('created_at', [
            $currentMonth,
            $currentMonth->copy()->endOfMonth(),
        ])->count();

        $previousCount = PackageGroup::whereBetween('created_at', [
            $previousMonth,
            $previousMonth->copy()->endOfMonth(),
        ])->count();

        $totalCollections = PackageGroup::count();

        return $this->calculateTrend($totalCollections, $currentCount, $previousCount);
    }

    /**
     * Get bookings count with trend comparison to previous month
     */
    private function getBookingsTrend(): array
    {
        $currentMonth = now()->startOfMonth();
        $previousMonth = now()->subMonth()->startOfMonth();

        $currentCount = Booking::whereBetween('created_at', [
            $currentMonth,
            $currentMonth->copy()->endOfMonth(),
        ])->count();

        $previousCount = Booking::whereBetween('created_at', [
            $previousMonth,
            $previousMonth->copy()->endOfMonth(),
        ])->count();

        $totalBookings = Booking::count();

        return $this->calculateTrend($totalBookings, $currentCount, $previousCount);
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
