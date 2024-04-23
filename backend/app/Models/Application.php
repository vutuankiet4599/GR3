<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Application extends Model
{
    use HasFactory;

    protected $guarded = ['created_at', 'updated_at'];

    public function applicationJob(): BelongsTo {
        return $this->belongsTo(ApplicationJob::class);
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
