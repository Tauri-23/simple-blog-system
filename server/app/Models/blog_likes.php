<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class blog_likes extends Model
{
    protected $fillable = [
        "blog_id",
        "admin_id",
        "user_id",
    ];
}
