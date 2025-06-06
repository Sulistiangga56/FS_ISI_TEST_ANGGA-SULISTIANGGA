<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['title', 'is_done'];

    protected $casts = [
        'is_done' => 'boolean',
    ];

    public function getIsDoneAttribute($value)
    {
        return (bool) $value;
    }
}
