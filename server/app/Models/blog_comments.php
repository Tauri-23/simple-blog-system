<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class blog_comments extends Model
{
    protected $fillable = [
        "comment",
        "blog_id",
        "admin_id",
        "user_id",
    ];


    /**
     * Foreign Joins
     */
    public function blog()
    {
        return $this->belongsTo(blogs::class, "blog_id", "id");
    }

    public function user()
    {
        return $this->belongsTo(users::class, "user_id", "id");
    }

    public function admin()
    {
        return $this->belongsTo(admins::class, "admin_id", "id");
    }
}
