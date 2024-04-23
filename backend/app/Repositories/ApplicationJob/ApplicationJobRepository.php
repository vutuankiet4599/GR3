<?php

namespace App\Repositories\ApplicationJob;

use App\Repositories\BaseRepository;

class ApplicationJobRepository extends BaseRepository implements ApplicationJobRepositoryInterface
{
    public function getModel()
    {
        return \App\Models\ApplicationJob::class;
    }
}
