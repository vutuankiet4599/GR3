<?php

namespace App\Http\Controllers\Api\V1\Dev;

use App\Http\Controllers\Controller;
use App\Repositories\Tag\TagRepository;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class TagController extends Controller
{
    use ResponseTrait;

    protected $repository;

    public function __construct(TagRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll(Request $request)
    {
        try {
            $userTags = [];
            $user = $request->user('users');
            if ($user) {
                $userTags = $user->tags;
            }
            $tags = $this->repository->getAll();
            return $this->success([
                'tags' => $tags,
                'user_tags' => $userTags,
            ]);
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }
}
