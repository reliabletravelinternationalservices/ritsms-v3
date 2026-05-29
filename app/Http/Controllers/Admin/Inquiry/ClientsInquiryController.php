<?php

namespace App\Http\Controllers\Admin\Inquiry;

use App\Http\Controllers\Controller;
use App\Repository\Inquiry\InquiryRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientsInquiryController extends Controller
{
    public function __construct(protected InquiryRepository $repository){}
    public function index()
    {
        $inquiries = $this->repository->getAllInquiries();
        return Inertia::render('admin/inquiry/ClientsInquiry', compact('inquiries'));
    }



    public function patch(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,dismissed,resolved',
        ]);

        $this->repository->toggleStatus($id, $request['status']);
        return redirect()->back()->with('success', 'Inquiry updated successfully.');
    }


    public function destroy(int $id)
    {
        $this->repository->deleteInquiry($id);
        return redirect()->route('admin.inquiries')->with('success', 'Inquiry deleted successfully.');
    }
}
