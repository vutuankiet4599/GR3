<?php

namespace App\Repositories\Quiz;

use App\Repositories\BaseRepository;

class QuizRepository extends BaseRepository implements QuizRepositoryInterface
{
    public function getModel()
    {
        return \App\Models\Quiz::class;
    }
}
