<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MedecinController;
<<<<<<< HEAD
use App\Http\Controllers\PatientController;
use App\Http\Controllers\SpecialiteController;

=======
>>>>>>> a4eb55192f6c646f99593d8101959e168758d7f3

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
<<<<<<< HEAD
Route::any('/specialities/show',[UserController::class, 'show'] );
Route::any('admin/specialities/add',[UserController::class, 'create'] );

=======
Route::any('/doctor/start',[MedecinController::class, 'create'] );
>>>>>>> a4eb55192f6c646f99593d8101959e168758d7f3

