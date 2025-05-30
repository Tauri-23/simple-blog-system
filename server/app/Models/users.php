<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Str;

class users extends Model
{
    use HasApiTokens;

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        "fname",
        "mname",
        "lname",
        "username",
        "email",
        "password",
        "pfp"
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
}
