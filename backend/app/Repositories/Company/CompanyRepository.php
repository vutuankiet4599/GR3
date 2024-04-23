<?php

namespace App\Repositories\Company;

use App\Repositories\BaseRepository;

class CompanyRepository extends BaseRepository implements CompanyRepositoryInterface
{
    public function getModel()
    {
        return \App\Models\Company::class;
    }
}
