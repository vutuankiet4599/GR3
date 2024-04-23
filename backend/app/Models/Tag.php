<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    use HasFactory;

    protected $guarded = ['created_at', 'updated_at'];

    public function users(): BelongsToMany {
        return $this->belongsToMany(User::class);
    }

    public function applicationJobs(): BelongsToMany {
        return $this->belongsToMany(ApplicationJob::class);
    }
}
