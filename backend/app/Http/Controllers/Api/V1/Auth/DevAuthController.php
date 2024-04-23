<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Jobs\SendEmail;
use App\Models\User;
use App\Repositories\User\UserRepository;
use App\Services\FirebaseService;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;

class DevAuthController extends Controller
{
    use ResponseTrait;

    protected $repository;
    protected $service;

    public function __construct(UserRepository $repository, FirebaseService $service) {
        $this->repository = $repository;
        $this->service = $service;
    }

    public function register(RegisterRequest $request)
    {
        try {
            $data = $request->validated();
            $data['password'] = Hash::make($data['password']);
            if (isset($data['image'])) {
                $image = $this->service->uploadImage($data['image'], '/devs');
                $data['image'] = $image;
            }
            $user = $this->repository->create($data);
            $encryptedMail = Crypt::encryptString($data['email']);
            $mailData = ['url' => env("APP_URL", "http://localhost:8000") . "/api/v1/auth/devs/confirm/" . $encryptedMail];
            SendEmail::dispatch($mailData, [$user])->afterCommit();
            return $this->success([
                // 'user' => $user,
                // 'token' => $user->createToken('api-token')->plainTextToken,
                'message' => 'Your account has been created',
            ], 'Register successfully');
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }

    public function login(LoginRequest $request)
    {
        try {
            $data = $request->validated();
            $user = User::where([
                ['email', $data['email']],
                ['is_active', true],
            ])->first();
            if (!$user || !Hash::check($data['password'], $user['password'])) {
                return $this->failure([], 'Authentication failed', 401);
            }
            return $this->success([
                'user' => $user,
                'token' => $user->createToken('api-token')->plainTextToken,
            ], 'Login successfully');
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }

    public function logout(Request $request)
    {
        try {
            $user = $request->user('users');
            $user->tokens()->delete();
            return $this->success(['user' => $user], 'Logout successfully');
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }

    public function confirm(Request $request, $encryptedMail)
    {
        try {
            $mail = Crypt::decryptString($encryptedMail);
            $user = User::where('email', '=', $mail)->first();
            $this->repository->update($user['id'], ['is_active' => true, 'email_verified_at' => now()]);
            return redirect()->to(env("FRONTEND_URL", "http://localhost:5173/"));
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }

    public function user(Request $request) {
        try {
            return $this->success($request->user('users'));
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }
}
