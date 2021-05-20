<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MedecinController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\SpecialiteController;
use App\Http\Controllers\CalendrierController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
    //return $request->user();
//});
Route::any('/users',[UserController::class, 'index'] );
Route::any('/register',[UserController::class, 'register'] );
Route::any('/login',[UserController::class, 'login'] );
Route::any('/doctor/start',[MedecinController::class, 'store'] );
Route::any('/patients/start',[PatientController::class, 'create'] );
Route::any('/specialities/show',[SpecialiteController::class, 'show'] );
Route::any('admin/specialities/add',[SpecialiteController::class, 'create'] );
Route::any('/doctor/schedule',[CalendrierController::class, 'create'] );