<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\CompanyRegisterRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Jobs\SendEmail;
use App\Models\Company;
use App\Repositories\Company\CompanyRepository;
use App\Services\FirebaseService;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;

class CompanyAuthController extends Controller
{
    use ResponseTrait;

    protected $repository;
    protected $service;

    public function __construct(CompanyRepository $repository, FirebaseService $service) {
        $this->repository = $repository;
        $this->service = $service;
    }

    public function register(CompanyRegisterRequest $request)
    {
        try {
            $data = $request->validated();
            $data['password'] = Hash::make($data['password']);
            if (isset($data['logo'])) {
                $image = $this->service->uploadImage($data['logo'], '/companies');
                $data['logo'] = $image;
            }
            $company = $this->repository->create($data);
            $encryptedMail = Crypt::encryptString($data['email']);
            $mailData = ['url' => env("APP_URL", "http://localhost:8000") . "/api/v1/auth/companies/confirm/" . $encryptedMail];
            SendEmail::dispatch($mailData, [$company])->afterCommit();
            return $this->success([
                // 'user' => $company,
                // 'token' => $company->createToken('api-token')->plainTextToken,
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
            $company = Company::where([
                ['email', $data['email']],
                ['is_active', true],
            ])->first();
            if (!$company || !Hash::check($data['password'], $company['password'])) {
                return $this->failure([], 'Authentication failed', 401);
            }
            return $this->success([
                'company' => $company,
                'token' => $company->createToken('api-token')->plainTextToken,
            ], 'Login successfully');
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }

    public function logout(Request $request)
    {
        try {
            $company = $request->user('companies');
            $company->tokens()->delete();
            return $this->success(['user' => $company], 'Logout successfully');
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }

    public function confirm(Request $request, $encryptedMail)
    {
        try {
            $mail = Crypt::decryptString($encryptedMail);
            $company = Company::where('email', '=', $mail)->first();
            $this->repository->update($company['id'], ['is_active' => true, 'email_verified_at' => now()]);
            return redirect()->to(env("FRONTEND_URL", "http://localhost:5173/"));
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }

    public function user(Request $request) {
        try {
            return $this->success($request->user('companies'));
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }
}
