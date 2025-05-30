<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware("auth:sanctum")
->group(function() {
    Route::get('/user', [AuthController::class, "GetUser"]);
    Route::post('/logout', [AuthController::class, "Logout"]);
});





/*
|----------------------------------------
| Auth 
|----------------------------------------
*/
Route::post("/login", [AuthController::class, "Login"]);
Route::post("/signup", [AuthController::class, "Signup"]);