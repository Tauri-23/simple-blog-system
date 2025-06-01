<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\blog_comments;
use App\Models\blogs;
use DB;
use Illuminate\Http\Request;

class BlogCommentControllers extends Controller
{
    // POST
    public function CreateBlogComment(Request $request)
    {
        $commentIn = json_decode($request->input("commentIn"));
        
        try
        {
            DB::beginTransaction();

            blogs::find($commentIn->blogId)->increment('comments_count');

            $comment = blog_comments::Create([
                "comment" => $commentIn->comment,
                "blog_id" => $commentIn->blogId,
                "admin_id" => $commentIn->admin ?? null,
                "user_id" => $commentIn->user ?? null,
            ]);

            DB::commit();

            return response()->json([
                "status" => 200,
                "message" => "Success",
                "blogs" => blogs::with(["comments", "user", "admin", "category", "likes"])->orderBy("created_at", "desc")->get(),
                "comment" => $comment
            ]);
        }
        catch(\Exception $e)
        {
            DB::rollBack();
            return response()->json([
                "status" => 500,
                "message" => $e->getMessage()
            ], 500);
        }
    }
}
