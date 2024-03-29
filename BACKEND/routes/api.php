<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SpecialiteController;
use App\Http\Controllers\CalendrierController;
use App\Http\Controllers\NotificationEventController;
use App\Http\Controllers\MedecinController;
use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\MessageController;




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


                        ######### MessageController ###########

Route::any('/messages/send',[MessageController::class, 'store'] );  
Route::any('/messages/show',[MessageController::class, 'show'] );  
//                       ######### UserController ###########
Route::any('/users',[UserController::class, 'index'] );
Route::any('/register',[UserController::class, 'register'] );
Route::any('/login',[UserController::class, 'login'] );
Route::any('/verifyPass',[UserController::class, 'verifyPass'] );
Route::any('/ForgetPass',[UserController::class, 'ForgetPass'] );



//                       ######### MedecinController ###########
Route::any('/doctor/start',[MedecinController::class, 'store'] );
Route::any('/doctor/getSingle',[MedecinController::class, 'DoctorInfoByUser'] );
Route::any('/doctor/consultationCount',[MedecinController::class, 'consultationCount'] );
Route::any('/doctor/PatientCount',[MedecinController::class, 'PatientCount'] );
Route::any('/doctor/PatientTodayCount',[MedecinController::class, 'PatientTodayCount'] );
Route::any('/doctor/showConsultations',[MedecinController::class, 'showConsultations'] );
Route::any('/doctor/updateConsultations',[MedecinController::class, 'updateConsultations'] );
Route::any('/doctor/show',[MedecinController::class, 'show'] );
Route::any('/doctor/showExeptID',[MedecinController::class, 'showExeptID'] );
Route::any('/doctor/getCons',[MedecinController::class, 'getCons'] );
Route::any('/doctor/Replace',[MedecinController::class, 'Replace'] );
Route::any('/doctor/showReplace',[MedecinController::class, 'showReplace'] );
Route::any('/doctor/update',[MedecinController::class, 'edit'] );
Route::any('/doctor/cityshow',[MedecinController::class, 'cityshow'] );
Route::any('/doctor/showStatsByMed',[MedecinController::class, 'showStatsByMed'] );
Route::any('/doctor/showStatsByMedA',[MedecinController::class, 'showStatsByMedA'] );
Route::any('/doctor/showStatsByMedP',[MedecinController::class, 'showStatsByMedP'] );




Route::any('/doctor/DoctorInfoById',[MedecinController::class, 'DoctorInfoById'] );



//                       ######### PatientController ###########
Route::any('/patients/getSingle',[PatientController::class, 'PatientInfoByUser'] );
Route::any('/patients/showDossiers',[MedecinController::class, 'showDossiers'] );
Route::any('/patients/start',[PatientController::class, 'create'] );
Route::any('/patients/updateConsultations',[PatientController::class, 'updateConsultations'] );
Route::any('/patients/addCons',[ConsultationController::class, 'create'] );

// ========================== Filtre backend ================================
Route::any('/patients/showDoctors',[PatientController::class, 'showDoctors'] );
Route::any('/patients/showDoctorsbySexeSpecStatus',[PatientController::class, 'showDoctorsbySexeSpecStatus'] );
Route::any('/patients/showDoctorsbySexe',[PatientController::class, 'showDoctorsbySexe']);
Route::any('/patients/showDoctorsbySpec',[PatientController::class, 'showDoctorsbySpec']);
Route::any('/patients/showDoctorsbyTitre',[PatientController::class, 'showDoctorsbyTitre'] );
Route::any('/patients/showDoctorsbySexeStatus',[PatientController::class, 'showDoctorsbySexeStatus'] );
Route::any('/patients/showDoctorsbySexeSpec',[PatientController::class, 'showDoctorsbySexeSpec'] );
Route::any('/patients/showDoctorsbySpecStatus',[PatientController::class, 'showDoctorsbySpecStatus'] );

Route::any('/patients/update',[PatientController::class, 'edit'] );




//                       ######### AdminController ###########
Route::any('/admin/getSingle',[AdminController::class, 'AdminInfoByUser'] );
Route::any('/admin/doctorsCount',[AdminController::class, 'doctorsCount'] );
Route::any('/admin/showDoctors',[AdminController::class, 'showDoctors'] );
Route::any('/admin/showPatients',[AdminController::class, 'showPatients'] );
Route::any('/admin/patientCount',[AdminController::class, 'patientCount'] );
Route::any('/admin/consultationCount',[AdminController::class, 'consultationCount'] );
Route::any('/admin/allRevenue',[AdminController::class, 'allRevenue'] );
Route::any('/admin/showConsultations',[AdminController::class, 'showConsultations'] );
Route::any('/admin/changeEtat',[AdminController::class, 'changeEtat'] );
Route::any('/admin/lockAccounts',[AdminController::class, 'lockAccounts'] );

//                       ######### SpecialiteController ###########
Route::any('/specialities/show',[SpecialiteController::class, 'show'] );
Route::any('admin/specialities/add',[SpecialiteController::class, 'create'] );
Route::any('/admin/insertSpec',[SpecialiteController::class, 'create'] );
Route::any('admin/specialities/show',[SpecialiteController::class, 'show'] );
Route::any('admin/specialities/edit',[SpecialiteController::class, 'edit'] );
Route::any('admin/specialities/delete',[SpecialiteController::class, 'delete'] );

//                       ######### CalendrierController ###########
Route::any('/doctor/schedule',[CalendrierController::class, 'create'] );
Route::any('/doctor/schedule/check',[CalendrierController::class, 'check'] );
Route::any('/doctor/schedule/delete',[CalendrierController::class, 'delete'] );
Route::any('/doctor/schedule/checkQuery',[CalendrierController::class, 'checkQuery'] );
Route::any('/doctor/schedule/deleteAll',[CalendrierController::class, 'deleteAll'] );
Route::any('/doctor/schedule/deleteSingle',[CalendrierController::class, 'deleteSingle'] );
Route::any('/doctor/consultationCount',[MedecinController::class, 'consultationCount'] );
Route::any('/doctor/showConsultations',[MedecinController::class, 'showConsultations'] );
Route::any('/doctor/showPatients',[MedecinController::class, 'showPatients'] );
Route::any('/patients/showConsultations',[PatientController::class, 'showConsultations'] );
Route::any('/doctor/updateConsultations',[MedecinController::class, 'updateConsultations'] );
Route::any('/patient/book',[CalendrierController::class, 'book'] );
Route::any('/patient/bookCancel',[CalendrierController::class, 'bookCancel'] );
Route::any('/patient/bookCheck',[CalendrierController::class, 'bookCheck'] );





//                       ######### NotificationEventController ###########
Route::any('/notif',[NotificationEventController::class, 'show'] );
Route::any('/showUserNotifs',[NotificationEventController::class, 'showUserNotifs'] );
Route::any('/UPNotifs',[NotificationEventController::class, 'UPNotifs'] );