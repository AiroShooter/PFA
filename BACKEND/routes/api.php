<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MedecinController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SpecialiteController;
use App\Http\Controllers\CalendrierController;
use App\Http\Controllers\NotificationEventController;




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
Route::any('/admin/showConsultations',[AdminController::class, 'showConsultations'] );
Route::any('/admin/doctorsCount',[AdminController::class, 'doctorsCount'] );
Route::any('/admin/showDoctors',[AdminController::class, 'showDoctors'] );
Route::any('/admin/showPatients',[AdminController::class, 'showPatients'] );
Route::any('/admin/patientCount',[AdminController::class, 'patientCount'] );
Route::any('/admin/consultationCount',[AdminController::class, 'consultationCount'] );
Route::any('/admin/allRevenue',[AdminController::class, 'allRevenue'] );
Route::any('/admin/showConsultations',[AdminController::class, 'showConsultations'] );
Route::any('admin/specialities/add',[SpecialiteController::class, 'create'] );
Route::any('/admin/changeEtat',[AdminController::class, 'changeEtat'] );
Route::any('admin/specialities/add',[SpecialiteController::class, 'create'] );
Route::any('/doctor/schedule',[CalendrierController::class, 'create'] );
Route::any('/notif',[NotificationEventController::class, 'show'] );
