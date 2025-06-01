<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\blog_categories;
use Illuminate\Http\Request;

class BlogCategoryControllers extends Controller
{
    // GET
    public function GetAllBlogCategories()
    {
        return response()->json(blog_categories::all());
    }



    // POST
    public function AddCategory(Request $request) 
    {
        $categoryExist = blog_categories::where("category", $request->categoryIn)->exists();

        if($categoryExist)
        {
            return response()->json([
                "status" => 400,
                "message" => "Category $request->categoryIn already exists"
            ]);
        }

        blog_categories::Create([
            "category" => $request->categoryIn
        ]);

        return response()->json([
            "status" => 200,
            "message" => "Success",
            "categories" => $this->GetAllBlogCategories()->original
        ]);
    }
}
