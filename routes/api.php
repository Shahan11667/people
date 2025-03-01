<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LanguageController;
use App\Http\Controllers\API\InterestController;

use App\Http\Controllers\API\PersonController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



use App\Http\Controllers\API\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});



Route::get('/languages', [LanguageController::class, 'index']);
Route::post('/languages', [LanguageController::class, 'store']);
Route::get('/languages/{id}', [LanguageController::class, 'show']);
Route::put('/languages/{id}', [LanguageController::class, 'update']);

Route::get('/interests', [InterestController::class, 'index']);
Route::post('/interests', [InterestController::class, 'store']);
Route::get('/interests/{id}', [InterestController::class, 'show']);
Route::put('/interests/{id}', [InterestController::class, 'update']);
Route::delete('/interests/{id}', [InterestController::class, 'destroy']);


Route::get('/people', [PersonController::class, 'index']);

Route::post('/people', [PersonController::class, 'store']);
Route::get('/people/{id}', [PersonController::class, 'show']);
Route::put('/people/{id}', [PersonController::class, 'update']);
Route::delete('/people/{id}', [PersonController::class, 'destroy']);