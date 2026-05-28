<?php

namespace App\Repository\Inquiry;

use App\Models\Inquiry;
use App\Models\Media;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class InquiryRepository
{
    public function createClientInquiry(array $inquiry)
    {
        return DB::transaction(function () use ($inquiry) {
            return Inquiry::create($inquiry);
        });
    }


    public function getAllInquiries()
    {
        return Inquiry::latest()->orderBy('created_at', 'desc')->get();
    }



    public function getInquiryById(int $id)
    {
        return Inquiry::findOrFail($id);
    }
}
