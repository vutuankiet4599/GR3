<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $guard = "users";

    /**
     * The attributes that are not mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = ['created_at', 'updated_at'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function applications(): HasMany {
        return $this->hasMany(Application::class);
    }

    public function tags(): BelongsToMany {
        return $this->belongsToMany(Tag::class, 'user_tag');
    }

    public function jobs(): BelongsToMany {
        return $this->belongsToMany(ApplicationJob::class, 'applications');
    }

    public function quizzes(): BelongsToMany
    {
        return $this->belongsToMany(Quiz::class, 'user_quiz')->withPivot('score');
    }
}
