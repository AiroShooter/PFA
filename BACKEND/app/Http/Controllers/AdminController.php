<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use App\Models\Medecin;
use App\Models\Patient;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Crypt;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        
        $count = User::where('email','=',$request->email)->count();

        if($count == 1)
        {
            return response()->json([
                'hasError' => true,
                'success' => '',
                'error' => 'Cet e-mail existe déjà, veuillez en essayer un autre'
            ]);
        }
        if($count == 0){

            $encrypted = Crypt::encryptString($request->password);  
            DB::insert('insert into users (email, password, type) values (?, ?, ?)', [$request->email, $encrypted, 'patient']);
            $users = DB::select('select * from users where email = ?',[$request->email]);
            if($users){
                return response()->json([
                    'hasError' => false,
                    'success' => 'Done',
                    'error' => '',
                    'user' =>$users[0]
                    ]);
            }
            DB::insert('insert into admins (`user_id`, `nom`, `prenom`) values (?, ?, ?)', [$users[0]->user_id, $request->nom, $request->prenom]);
            $admin = DB::select('select * from admins where user_id = ?',[$users[0]->user_id]);
            
            if($admin){
                return response()->json([
                    'hasError' => false,
                    'success' => 'Done',
                    'error' => '',
                    'user' =>$admin[0]
                    ]);
            }
            
            return response()->json([
                    'hasError' => false,
                    'success' => 'Done ',
                    'error' => ''
                ]);
        
        }
 
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $value = Admin::where('user_id', '<=', $request->user_id)->get();
        return response()->json([
            'hasError' => false,
            'success' => 'Done',
            'admin' => $value
            ]);
    }
    public function showDoctors()
    {
        $value = DB::select("SELECT u.user_id,m.med_id,u.isActive,m.nom,m.prenom,m.tarif as tarifs,s.libelle FROM `medecins` m inner join users u on u.user_id = m.med_id inner join specialites s on m.spec_id = s.spec_id"); 
        return $value;
    }
    public function showPatients()
    {
        $value = DB::select("SELECT u.user_id,u.isActive,p.patient_id,p.nom,p.prenom,p.sexe,p.telePerso,p.dateNaiss,c.const_id,c.date,sum(c.tarif) as tarifs FROM `consultations` c inner join patients p on c.patient_id = c.patient_id inner join users u on u.user_id = p.user_id GROUP BY  u.user_id,u.isActive,p.patient_id,p.nom,p.prenom,p.sexe,p.telePerso,p.dateNaiss,c.const_id,c.date"); 
        return $value;
    }
    public function showConsultations()
    {
        $value = DB::select("SELECT c.const_id, m.nom as medecinnom,m.prenom as medecinprenom,p.nom,p.prenom,c.tarif,c.etat,c.date,s.libelle from `consultations` c inner join patients p on c.patient_id = p.patient_id inner join medecins m on m.med_id = c.med_id inner join specialites s on s.spec_id = m.spec_id"); 
        return $value;
    }
    public function consultationCount()
    {
        $query = DB::table('consultations');
        $conscount = $query->count();
        return $conscount;
    }
    public function patientCount()
    {
        $query = DB::table('patients');
        $patcount = $query->count();
        return $patcount;
    }
    public function doctorsCount()
    {
        $query = DB::table('medecins');
        $medcount = $query->count();
        return $medcount;
    }
    public function allRevenue()
    {
        $query = DB::select('SELECT sum(tarif) as tarifs FROM `consultations`');
       
        return $query;
    }
    public function changeEtat(Request $request)
    {
        $query = DB::update("update consultations set etat = (?) where const_id = (?)",[$request->etat, $request->id]);
       
        return $query;
    }
    public function lockAccounts(Request $request)
    {
        $query = DB::update("update users set isActive = (?) where user_id = (?)",[$request->isActive, $request->user_id]);
       
        return $query;
    }
    

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function edit(Admin $admin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Admin $admin)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function destroy(Admin $admin)
    {
        //
    }
}
