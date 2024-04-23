<?php

namespace App\Repositories\Tag;

use App\Repositories\BaseRepository;

class TagRepository extends BaseRepository implements TagRepositoryInterface
{
    public function getModel()
    {
        return \App\Models\Tag::class;
    }
}
