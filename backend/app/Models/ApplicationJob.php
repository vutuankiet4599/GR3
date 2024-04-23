<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use JeroenG\Explorer\Application\Explored;
use Laravel\Scout\Searchable;

class ApplicationJob extends Model implements Explored
{
    use HasFactory, Searchable;

    protected $guarded = ['created_at', 'updated_at'];

    protected $casts = [
        'welfare' => 'array',
        'interview' => 'array',
        'work' => 'array',
        'skill' => 'array',
    ];

    public function mappableAs(): array
    {
        return [
            'id' => 'keyword',
            'name' => 'text',
            'description' => 'text',
        ];
    }

    public function company(): BelongsTo {
        return $this->belongsTo(Company::class);
    }

    public function applications(): HasMany {
        return $this->hasMany(Application::class);
    }

    public function tags(): BelongsToMany {
        return $this->belongsToMany(Tag::class);
    }

    public function city(): BelongsTo {
        return $this->belongsTo(City::class);
    }

    public function users(): BelongsToMany {
        return $this->belongsToMany(User::class, 'applications');
    }
}
