<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BlogCategoryControllers;
use App\Http\Controllers\Api\BlogCommentControllers;
use App\Http\Controllers\Api\BlogControllers;
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





/*
|----------------------------------------
| BLOGS 
|----------------------------------------
*/
Route::get("/get-all-blogs", [BlogControllers::class, "GetAllBlogs"]);

Route::post("/create-blog", [BlogControllers::class, "CreateBlog"]);
Route::post("/publish-blog", [BlogControllers::class, "PublishBlog"]);
Route::post("/edit-blog", [BlogControllers::class, "EditBlog"]);
Route::post("/like-unlike-blog", [BlogControllers::class, "LikeUnlikeBlog"]);
Route::post("/delete-blog", [BlogControllers::class, "DeleteBlog"]);
Route::post("/delete-comment", [BlogControllers::class, "DeleteComment"]);





/*
|----------------------------------------
| BLOG CATEGORIES
|----------------------------------------
*/
Route::get("/get-all-blog-categories", [BlogCategoryControllers::class, "GetAllBlogCategories"]);

Route::post("/add-category", [BlogCategoryControllers::class, "AddCategory"]);





/*
|----------------------------------------
| BLOG COMMENTS
|----------------------------------------
*/
Route::post("/create-blog-comment", [BlogCommentControllers::class, "CreateBlogComment"]);