<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Room extends Model
{
    use HasFactory;

    protected $guarded = ['created_at', 'updated_at'];

    public function company() : BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
