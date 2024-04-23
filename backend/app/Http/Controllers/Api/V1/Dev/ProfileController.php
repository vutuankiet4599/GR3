<?php

namespace App\Http\Controllers\Api\V1\Dev;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dev\Profile\UpdateUserTagRequest;
use App\Http\Requests\Dev\Profile\UploadCvRequest;
use App\Models\Application;
use App\Repositories\User\UserRepository;
use App\Services\FirebaseService;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    use ResponseTrait;

    protected $fileService;
    protected $repository;

    public function __construct(FirebaseService $fileService, UserRepository $repository)
    {
        $this->fileService = $fileService;
        $this->repository = $repository;
    }

    public function uploadCv(UploadCvRequest $request)
    {
        try {
            $data = $request->validated();
            $user = $request->user('users');
            $cv = $this->fileService->uploadImage($data['cv'], '/devs/profile');
            $response = $this->repository->update($user->id, ["cv" => $cv]);
            return $this->success($response, "Successfully uploaded");
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }

    public function getCurrentUserApplications(Request $request)
    {
        try {
            $userId = $request->user('users')->id;
            $applications = Application::with(['applicationJob.company'])
                ->where('user_id', $userId)
                ->get();
            return $this->success($applications);
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }

    public function updateTags(UpdateUserTagRequest $request)
    {
        try {
            $data = $request->validated();
            $user = $request->user('users');
            $user->tags()->detach();
            $user->tags()->attach($data['tags']);
            return $this->success([], 'Update tags successfully');
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }
}
