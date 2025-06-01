<?php

namespace App\Http\Controllers\Api;

use App\Contracts\IGenerateFilenameService;
use App\Http\Controllers\Controller;
use App\Models\blog_comments;
use App\Models\blog_likes;
use App\Models\blogs;
use DB;
use Illuminate\Http\Request;

class BlogControllers extends Controller
{
    protected $generateFilename;



    public function __construct(IGenerateFilenameService $generateFilename)
    {
        $this->generateFilename = $generateFilename;
    }



    // GET
    public function GetAllBlogs()
    {
        return response()->json(blogs::with(["comments", "user", "admin", "category", "likes"])
        ->orderBy("created_at", "desc")->get());
    }



    // POST
    public function CreateBlog(Request $request)
    {
        $blogIn = json_decode($request->input("blogIn"));
        $photo = $request->file("blogPic");

        try
        {
            DB::beginTransaction();

            $newFilename = null;

            if($photo)
            {
                $targetDirectory = base_path("../client/public/media/blogs");
                $newFilename = $this->generateFilename->generate($photo, $targetDirectory);

                $photo->move($targetDirectory, $newFilename);
            }

            blogs::Create([
                "caption" => $blogIn->caption ?? null,
                "photo" => $newFilename,
                "user_id" => $blogIn->user ?? null,
                "admin_id" => $blogIn->admin ?? null,
                "category_id" => $blogIn->category
            ]);

            DB::commit();

            return response()->json([
                "status" => 200,
                "message" => "Blog posted sucessfully",
                "blogs" => $this->GetAllBlogs()->original
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
    public function EditBlog(Request $request)
    {
        $editBlogIn = json_decode($request->input("editBlogIn"));
        $photo = $request->file("blogPic");

        try
        {
            DB::beginTransaction();

            $newFilename = null;

            if($photo)
            {
                $targetDirectory = base_path("../client/public/media/blogs");
                $newFilename = $this->generateFilename->generate($photo, $targetDirectory);

                $photo->move($targetDirectory, $newFilename);
            }

            $updateBlog = blogs::find($editBlogIn->id);
            $updateBlog->caption = $editBlogIn->caption;
            $updateBlog->category_id = $editBlogIn->category;
            if($newFilename)
            {
                $updateBlog->photo = $newFilename;
            }
            $updateBlog->save();

            DB::commit();

            return response()->json([
                "status" => 200,
                "message" => "Blog posted sucessfully",
                "blogs" => $this->GetAllBlogs()->original
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
    public function PublishBlog(Request $request)
    {
        blogs::find($request->blogId)->update([
            "status" => "Published"
        ]);

        return response()->json([
            "status" => 200,
            "message" => "Success"
        ]);
    }

    public function LikeUnlikeBlog(Request $request)
    {
        try
        {
            DB::beginTransaction();

            $likeExist = blog_likes::where("blog_id", $request->blogId)
            ->where("user_id", $request->user)
            ->first();

            $blog = blogs::find($request->blogId);

            if($likeExist)
            {
                $blog->decrement("likes_count");
                $likeExist->delete();

                DB::commit();

                return response()->json([
                    "status" => 200,
                    "message" => "Like removed",
                    "mode" => "unlike",
                    "blogs" => $this->GetAllBlogs()->original
                ]);
            }

            $blog->increment('likes_count');
            $like = blog_likes::Create([
                "blog_id" => $request->blogId,
                "admin_id" => $request->admin ?? null,
                "user_id" => $request->user ?? null
            ]);

            DB::commit();

            return response()->json([
                "status" => 200,
                "message" => "Liked",
                "blogs" => $this->GetAllBlogs()->original,
                "mode" => "like",
                "like" => $like
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

    public function DeleteBlog(Request $request)
    {
        blogs::find($request->blogId)->delete();

        return response()->json([
            "status" => 200,
            "message" => "Success"
        ]);
    }

    public function DeleteComment(Request $request)
    {
        blog_comments::find($request->commentId)->delete();

        return response()->json([
            "status" => 200,
            "message" => "Success"
        ]);
    }
}
