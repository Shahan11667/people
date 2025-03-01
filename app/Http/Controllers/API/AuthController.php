<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;
class AuthController extends Controller
{
    // User Login API
    // public function login(Request $request)
    // {
    //     Log::info("login:", $request->all());
    //     $request->validate([
    //         'email' => 'required|email',
    //         'password' => 'required',
    //     ]);

    //     $user = User::where('email', $request->email)->first();

    //     if (!$user || !Hash::check($request->password, $user->password)) {
    //         throw ValidationException::withMessages([
    //             'email' => ['Invalid credentials!'],
    //         ]);
    //     }

    //     return response()->json([
    //         'token' => $user->createToken('auth_token')->plainTextToken,
    //         'user' => $user
    //     ]);
    // }
    // public function login(Request $request)
    // {
    //     Log::info("Login Attempt:", $request->all());
    
    //     $request->validate([
    //         'email' => 'required|email',
    //         'password' => 'required',
    //     ]);
    
    //     $user = User::where('email', $request->email)->first();
    
    //     if (!$user || !Hash::check($request->password, $user->password)) {
    //         throw ValidationException::withMessages([
    //             'email' => ['Invalid credentials!'],
    //         ]);
    //     }
    
    //     $token = $user->createToken('auth_token')->plainTextToken;
    
    //     return response()->json([
    //         'message' => 'You have been successfully logged in!',
    //         'token' => $token,
    //         'user' => $user
    //     ], 200);
    // }
    
    public function login(Request $request)
{
    Log::info("📥 Login Attempt:", $request->all());

    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    Log::info("✅ Validation Passed for email: {$request->email}");

    $user = User::where('email', $request->email)->first();

    if (!$user) {
        Log::warning("❌ User not found for email: {$request->email}");
        throw ValidationException::withMessages([
            'email' => ['Invalid credentials!'],
        ]);
    }

    if (!Hash::check($request->password, $user->password)) {
        Log::warning("❌ Password mismatch for email: {$request->email}");
        throw ValidationException::withMessages([
            'email' => ['Invalid credentials!'],
        ]);
    }

    $token = $user->createToken('auth_token')->plainTextToken;

    Log::info("🔑 Token Generated Successfully:", ['user_id' => $user->id, 'token' => $token]);

    return response()->json([
        'message' => 'You have been successfully logged in!',
        'token' => $token,
        'user' => $user
    ], 200);
}



    // User Logout API
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    // Register User API
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'token' => $user->createToken('auth_token')->plainTextToken,
            'user' => $user
        ]);
    }
}
