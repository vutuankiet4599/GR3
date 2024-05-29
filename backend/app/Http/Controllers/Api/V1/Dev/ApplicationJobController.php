<?php

namespace App\Http\Controllers\Api\V1\Dev;

use App\Events\DevReceiveNotificationFromCompanyEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\Company\Application\ChangeStatusApplicationRequest;
use App\Http\Requests\Company\Job\CreateJobRequest;
use App\Http\Requests\Dev\ApplicationJob\ApplyJobRequest;
use App\Models\Application;
use App\Models\ApplicationJob;
use App\Models\Tag;
use App\Repositories\ApplicationJob\ApplicationJobRepository;
use App\Traits\ResponseTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ApplicationJobController extends Controller
{
    use ResponseTrait;

    protected $repository;

    public function __construct(ApplicationJobRepository $repository)
    {
        $this->repository = $repository;
    }

    public function apply(ApplyJobRequest $request)
    {
        try {
            $data = $request->validated();
            $job = $this->repository->find($data['application_job_id']);
            if (empty($job) || $job->status == 'closed') {
                return $this->failure([], 'No job found or job is closed', '');
            }
            $userId = $request->user('users')->id;
            $application = Application::where([
                ['user_id', $userId],
                ['application_job_id', $job->id],
                ['status', 'pending'],
            ])->first();
            if (!empty($application)) {
                return $this->failure([], 'Your applied job is being handled', '');
            }
            Application::create([
                'user_id' => $userId,
                'application_job_id' => $job->id,
                'status' => 'pending',
            ]);
            return $this->success([], 'Apply successfully');
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }

    public function hotJob(Request $request)
    {
        try {
            $jobs = ApplicationJob::with('company')
                ->with('tags')
                ->withCount(['applications' => function ($q) {
                    $q->where('created_at', Carbon::today());
                }])->take(20)
                ->get();
            return $this->success($jobs);
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }

    public function find(Request $request, $id)
    {
        try {
            $data = $this->repository->find($id)->load(['company', 'tags', 'applications']);
            return $this->success($data);
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }
    
    public function search(Request $request)
    {
        try {
            $search = $request->query('query');
            $contract = $request->query('contract');
            $level = $request->query('level');
            $city = $request->query('city');
            $type = $request->query('type');
            $tags = $request->query('tags');
            if (!empty($tags) && is_string($tags)) {
                $tags = explode(',', $tags);
            }
            $jobs = ApplicationJob::search($search)
                ->when(!empty($contract), function ($q) use ($contract) {
                    $q->where('contract', $contract);
                })->when(!empty($city), function ($q) use ($city) {
                    $q->where('city_id', $city);
                })->when(!empty($type), function ($q) use ($type) {
                    $q->where('type', $type);
                })->when(!empty($level), function ($q) use ($level) {
                    $q->where('level', $level);
                })->when(!empty($tags), function ($q) use ($tags) {
                    $jobIds = ApplicationJob::whereHas('tags', function ($q) use ($tags) {
                            $q->whereIn('tags.id', $tags);
                        })->pluck('id')
                        ->all();
                    $q->whereIn('id', array_map('strval', $jobIds));
                })->paginate(config('app.items_per_page'));
            return $this->success([
                'jobs' => $jobs->load(['company', 'city', 'tags']),
                'totalPages' => $jobs->toArray()['last_page'],
            ]);
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }

    public function bestFitJobs(Request $request)
    {
        try {
            $user = $request->user('users');
            $data = null;
            if ($user === null) {
                $data = ApplicationJob::with(['company', 'tags'])
                    ->withCount('applications')
                    ->orderByDesc('applications_count')
                    ->orderBy('created_at')
                    ->take(10)
                    ->get();
            } else {
                $userTagsIds = $user->tags->pluck('tags.id');
                $data = ApplicationJob::with(['company', 'tags'])
                    ->withCount(['tags' => function($query) use ($userTagsIds) {
                        $query->whereIn('tags.id', $userTagsIds);
                    }])
                    ->withCount('applications')
                    ->orderBy('tags_count', 'desc')
                    ->orderBy('applications_count', 'desc')
                    ->take(10)
                    ->get();
            }

            return $this->success($data);
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }

    public function create(CreateJobRequest $request)
    {
        try {
            $data = $request->validated();
            $companyId = $request->user('companies')->id;
            $response = $this->repository->create(array_merge($data, ['company_id' => $companyId, 'status' => 'opening']));
            if (!$response) {
                return $this->failure([], "Can't create job", "");
            }
            
            if (!empty($data['tags'])) {
                $tagIds = array_map(function ($obj) {
                    return $obj['id'];
                }, $data['tags']);
                $tagIds = array_map('intval', $tagIds);
                $response->tags()->attach($tagIds);
            }
            
            return $this->success($response, "Job created successfully");
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }

    public function companyJobs(Request $request)
    {
        try {
            $companyId = $request->user('companies')->id;
            $jobs = ApplicationJob::withoutGlobalScopes()->where('company_id', $companyId)->get();
            return $this->success($jobs);
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }

    public function companyJob(Request $request, $id)
    {
        try {
            $job = ApplicationJob::withoutGlobalScopes()->find($id);
            if (!$job) {
                return $this->failure([], 'No record found', '', 404);
            }
            $job->load('applications.user');
            return $this->success($job);
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }

    public function changeStatusApplication(ChangeStatusApplicationRequest $request, $id)
    {
        try {
            $data = $request->validated();
            $application = Application::find($id);
            if (!$application) {
                return $this->failure([], 'Not found apply', '', 404);
            }
            $response = $application->update(['status' => $data['status']]);
            $notificationData = [];
            $company = $request->user('companies');
            $notificationData['company'] = $company->name;
            if ($data['status'] == 'accepted') {
                $notificationData['isAccepted'] = true;
            } else {
                $notificationData['isAccepted'] = false;
            }
            event(New DevReceiveNotificationFromCompanyEvent($notificationData, $application->user_id));
            return $this->success($response);
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }

    public function changeStatusJob(Request $request, $id)
    {
        try {
            $status = $request->input('status', '');
            if (!in_array($status, ['opening', 'closed'])) {
                return $this->failure([], 'Invalid status', 400);
            }
            
            $response = $this->repository->update($id, ['status' => $status]);
            if (!$response) {
                return $this->failure([], 'Update failed', '');
            }

            return $this->success($response, 'Updated successfully', 200);
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }
}
