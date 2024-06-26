<?php

namespace App\Http\Controllers\Api\V1\Company;

use App\Http\Controllers\Controller;
use App\Http\Requests\Company\User\ContactRequest;
use App\Jobs\SendContactMail;
use App\Models\Company;
use App\Models\Tag;
use App\Models\User;
use App\Repositories\Company\CompanyRepository;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    use ResponseTrait;
    protected $repository;

    public function __construct(CompanyRepository $repository) {
        $this->repository = $repository;
    }

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

    public function find(Request $request, $id)
    {
        try {
            $company = $this->repository->find($id);
            $company->loadCount('applicationJobs')->load('quizzes');
            return $this->success($company);
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode(), 500);
        }
    }

    public function findFitApplicants(Request $request)
    {
        try {
            $company = $request->user('companies');
            $jobIds = $company->applicationJobs()->pluck('id');

            $tagIds = Tag::whereHas('applicationJobs', function ($q) use ($jobIds) {
                $q->whereIn('application_jobs.id', $jobIds);
            })->pluck('id');

            $users = User::withCount(['tags' => function ($q) use ($tagIds) {
                $q->whereIn('tags.id', $tagIds);
            }])->orderBy('tags_count', 'desc')
            ->paginate(config('app.items_per_page'));

            return $this->success([
                'users' => $users->all(),
                'totalPages' => $users->toArray()['last_page'],

            ]);
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode(), 500);
        }
    }

    public function sendContactMailToUser(ContactRequest $request)
    {
        try {
            $data = $request->validated();
            $company = $request->user('companies');
            $user = User::find($data['user_id']);

            $data = [
                'username' => $user['name'],
                'company_name' => $company['name'],
                'user_email' => $user['email'],
                'body' => $data['body'],
            ];

            SendContactMail::dispatch($data)->afterCommit();

            return $this->success([], 'Send contact mail done');
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode(), 500);
        }
    }
}
