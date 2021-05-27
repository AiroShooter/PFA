<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class PatientController extends Controller
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
        DB::insert('insert into patients (`user_id`, `nom`, `prenom`, `sexe`, `telePerso`, `pays`, `dateNaiss`) values (?, ?, ?, ?, ?, ?, ?)', [$request->user_id, $request->nom, $request->prenom, $request->sexe, $request->telePerso, $request->pays, $request->dateNaiss]);

        $users = DB::select('select * from patients where user_id = ?',[$request->user_id]);
        if($users)
        {
           return response()->json([
               'hasError' => false,
               'success' => 'Done ',
               'error' => '',
               'user' =>$users[0]]);
        }
        else{
            return response()->json([
                'hasError' => true,
                'success' => '',
                'error' => 'Error']);
        }
        

    }

    public function PatientInfoByUser(Request $request)
    {
        $user =  DB::select('select * from patients where user_id = ?',[$request->user_id]);
        if($user)
        {
           return response()->json([
               'hasError' => false,
               'success' => 'Done ',
               'error' => '',
               'user' =>$user[0]]);
        }
        else{
            return response()->json([
                'hasError' => true,
                'success' => '',
                'error' => 'Error']);
        }

    }

    public function showConsultations(Request $request)
    {
        $value = DB::select("SELECT s.libelle,up.email,p.patient_id,p.nom as pnom,p.prenom as pprenom,p.sexe,p.telePerso,p.pays,p.dateNaiss,m.nom,m.prenom,m.sexe as msexe,c.tarif,c.heure,c.etat,c.desc,c.type,c.date,c.const_id,c.raison FROM `consultations` c inner join medecins m on m.med_id = c.med_id inner join specialites s on s.spec_id = m.spec_id inner join patients p on p.patient_id = c.patient_id inner join users um on um.user_id = m.user_id inner join users up on up.user_id = p.user_id where up.user_id = (?)",[$request->user_id]); 
        return $value;
    } 
    public function updateConsultations(Request $request){
        $value = DB::update("update consultations set etat = ? where const_id = ?",[$request->etat,$request->const_id]); 
        return $value;
    }
    public function showDoctors(Request $request){
        $value = DB::select("select m.med_id, m.telePerso,m.nom,m.sexe,m.prenom,m.ville,m.tarif,m.adresseCabinet,s.libelle from medecins m inner join specialites s on s.spec_id = m.spec_id where m.ville like ?",[$request->ville]); 
        return $value;
        
    } 
     public function showDoctorsbySexeSpec(Request $request){
        $value = DB::select("select m.med_id, m.telePerso,m.nom,m.sexe,m.prenom,m.ville,m.tarif,m.adresseCabinet,s.libelle from medecins m inner join specialites s on s.spec_id = m.spec_id where s.spec_id = ? and m.sexe = ? and m.ville = ?",[$request->spec_id,$request->sexe,$request->ville]); 
        return $value;
    }
    public function showDoctorsbySexe(Request $request){
        $value = DB::select("select m.med_id, m.telePerso,m.nom,m.sexe,m.prenom,m.ville,m.tarif,m.adresseCabinet,s.libelle from medecins m inner join specialites s on s.spec_id = m.spec_id where m.sexe = ? and m.ville = ?",[$request->sexe,$request->ville]); 
        return $value;
    }
    public function showDoctorsbySpec(Request $request){
        $value = DB::select("select m.med_id, m.telePerso,m.nom,m.sexe,m.prenom,m.ville,m.tarif,m.adresseCabinet,s.libelle from medecins m inner join specialites s on s.spec_id = m.spec_id where s.spec_id = ? and m.ville = ?",[$request->spec_id,$request->ville]); 
        return $value;
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
     * @param  \App\Models\Patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function show(Patient $patient)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $query = DB::select("UPDATE patients SET nom=?, prenom=?, sexe=?, telePerso=?, pays=?, dateNaiss=? WHERE user_id =?",[$request->nom,$request->prenom,$request->sexe,$request->telePerso,$request->pays,$request->dateNaiss,$request->user_id]);
        $user = DB::select('select * from patients where user_id = ?',[$request->user_id]);

        return response()->json([
            'hasError' => true,
            'success' => '',
            'user' => $user[0]
            ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Patient $patient)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function destroy(Patient $patient)
    {
        //
    }
}
