<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Str;

class blogs extends Model
{
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        "caption",
        "photo",
        "user_id",
        "admin_id",
        "category_id",
        "likes_count",
        "comments_count",
        "status",
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (!$model->getKey()) {
                $model->{$model->getKeyName()} = Str::random(20);
            }
        });
    }



    /**
     * Foereign Joins
     */
    public function comments()
    {
        return $this->hasMany(blog_comments::class, "blog_id", "id")->with(["user", "admin"])->orderBy("created_at", "desc");
    }

    public function likes()
    {
        return $this->hasMany(blog_likes::class, "blog_id", "id");
    }

    public function user()
    {
        return $this->belongsTo(users::class, "user_id", "id");
    }

    public function admin()
    {
        return $this->belongsTo(admins::class, "admin_id", "id");
    }

    public function category()
    {
        return $this->belongsTo(blog_categories::class, "category_id", "id");
    }
}
