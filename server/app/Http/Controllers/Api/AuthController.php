<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\admins;
use App\Models\users;
use Hash;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function Signup(Request $request)
    {
        $signupIn = json_decode($request->input("signupIn"));
        $isEmailExistsInUsersTable = users::where("email", $signupIn->email)->exists();
        $isUsernameExistsInUsersTable = users::where("username", $signupIn->username)->exists();

        if($isEmailExistsInUsersTable)
        {
            return response()->json([
                "status" => 400,
                "message" => "Email already taken"
            ]);
        }

        if($isUsernameExistsInUsersTable)
        {
            return response()->json([
                "status" => 400,
                "message" => "Username already taken"
            ]);
        }

        $user = users::Create([
            "fname" => $signupIn->fname,
            "mname" => $signupIn->mname,
            "lname" => $signupIn->lname,
            "username" => $signupIn->username,
            "email" => $signupIn->email,
            "password" => bcrypt($signupIn->password),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'status' => 200,
            'message' => 'Success',
            'user' => [
                "id" => $user->id,
                "fname" => $user->fname,
                "mname" => $user->mname,
                "lname" => $user->lname,
                "username" => $user->username,
                "email" => $user->email,
            ],
            'token' => $token,
            'userType' => "user"
        ]);
    }



    public function Login(Request $request)
    {
        $loginIn = json_decode($request->input("loginIn"));
        $user = users::where("username", $loginIn->username)->first();
        $admin = admins::where("username", $loginIn->username)->first();

        if($user && Hash::check($loginIn->password, $user->password))
        {
            $token = $user->createToken('main')->plainTextToken;

            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'user' => [
                    "id" => $user->id,
                    "fname" => $user->fname,
                    "mname" => $user->mname,
                    "lname" => $user->lname,
                    "username" => $user->username,
                    "email" => $user->email,
                ],
                'token' => $token,
                'userType' => "user"
            ]);
        }
        // else if($admin && Hash::check($loginIn->password, $admin->password))
        // {
        //     $token = $admin->createToken('main')->plainTextToken;

        //     return response()->json([
        //         'status' => 200,
        //         'message' => 'Success',
        //         'user' => [
        //             "id" => $admin->id,
        //             "username" => $admin->username,
        //             "email" => $admin->email,
        //         ],
        //         'token' => $token,
        //         'userType' => "admin"
        //     ]);
        // }
        else
        {
            return response()->json([
                'status' => 400,
                'message' => "Credentials don't match"
            ]);
        }
    }



    public function Logout(Request $request)
    {
        $user = $request->user();

        if ($user) 
        {
            $user->currentAccessToken()->delete();;

            return response()->json([
                'status' => 200,
                'message' => 'Logged out successfully.'
            ]);
        }

        return response()->json([
            'status' => 401,
            'message' => 'User not authenticated.'
        ], 401);
    }



    public function GetUser(Request $request)
    {
        $user = $request->user();

        $userType = $user instanceof users
            ? "user"
            : "";
        
        return response()->json([
            "user" => [
                "id" => $user->id,
                "fname" => $user->fname,
                "mname" => $user->mname,
                "lname" => $user->lname,
                "username" => $user->username,
                "email" => $user->email,
            ],
            "userType" => $userType
        ]);
    }
}
