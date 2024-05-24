<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Question extends Model
{
    use HasFactory;
    
    protected $guarded = ['created_at', 'updated_at'];
    
    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }
}
