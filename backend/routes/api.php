<?php

use App\Http\Controllers\Api\V1\Auth\CompanyAuthController;
use App\Http\Controllers\Api\V1\Dev\ProfileController;
use App\Http\Controllers\Api\V1\Auth\DevAuthController;
use App\Http\Controllers\Api\V1\Company\CompanyController;
use App\Http\Controllers\Api\V1\Dev\ApplicationJobController;
use App\Http\Controllers\Api\V1\Dev\TagController;
use App\Http\Controllers\TestController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('/v1')->group(function () {
    Route::prefix('/auth')->group(function () {
        Route::prefix('/devs')->group(function () {
            Route::post('/register', [DevAuthController::class, 'register']);
            Route::post('/login', [DevAuthController::class, 'login']);
            Route::get('/confirm/{encryptedMail}', [DevAuthController::class, 'confirm']);
            Route::post('/logout', [DevAuthController::class, 'logout'])->middleware('auth:users');
            Route::get('/user', [DevAuthController::class, 'user'])->middleware('auth:users');
        });

        Route::prefix('/companies')->group(function () {
            Route::post('/register', [CompanyAuthController::class, 'register']);
            Route::post('/login', [CompanyAuthController::class, 'login']);
            Route::get('/confirm/{encryptedMail}', [CompanyAuthController::class, 'confirm']);
            Route::post('/logout', [CompanyAuthController::class, 'logout'])->middleware('auth:companies');
            Route::get('/user', [CompanyAuthController::class, 'user'])->middleware('auth:companies');
        });
    });

    Route::prefix('/devs')->group(function () {
        Route::middleware('auth:users')->group(function () {
            Route::prefix('/profile')->group(function () {
                Route::post('/cv', [ProfileController::class, 'uploadCv']);
                Route::get('/applications', [ProfileController::class, 'getCurrentUserApplications']);
                Route::put('/tags', [ProfileController::class, 'updateTags']);
            });
        });
        Route::get('/jobs/hot', [ApplicationJobController::class, 'hotJob']);
        Route::get('/jobs/search', [ApplicationJobController::class, 'search']);
        Route::post('/jobs/apply', [ApplicationJobController::class, 'apply']);
        Route::get('/jobs/best-fit', [ApplicationJobController::class, 'bestFitJobs']);
        Route::get('/jobs/{id}', [ApplicationJobController::class, 'find']);
    });

    Route::prefix('/companies')->group(function () {
        Route::get('/outstanding', [CompanyController::class, 'outstanding']);
        Route::middleware('auth:companies')->group(function () {
            Route::post('/jobs', [ApplicationJobController::class, 'create']);
            Route::get('/jobs', [ApplicationJobController::class, 'companyJobs']);
            Route::get('/jobs/{id}', [ApplicationJobController::class, 'companyJob']);
            Route::put('/applications/{id}/status', [ApplicationJobController::class, 'changeStatusApplication']);
        });
    });
    
    Route::prefix('/tags')->group(function () {
        Route::get('/', [TagController::class, 'getAll']);
    });
});

Route::get("/test", [TestController::class, 'test']);