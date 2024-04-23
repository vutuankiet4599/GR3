<?php

namespace App\Http\Controllers\Api\V1\Company;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    use ResponseTrait;

    public function outstanding(Request $request)
    {
        try {
            $companies = Company::withCount('applications')
                ->withCount('applicationJobs')
                ->with('applicationJobs.tags')
                ->orderBy('applications_count', 'desc')
                ->take(5)
                ->get();
            return $this->success($companies);
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode(), 500);
        }
    }
}
