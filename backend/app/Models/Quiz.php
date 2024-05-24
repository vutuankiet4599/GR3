<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quiz extends Model
{
    use HasFactory;

    protected $guarded = ['created_at', 'updated_at'];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_quiz')->withPivot('score');
    }

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
