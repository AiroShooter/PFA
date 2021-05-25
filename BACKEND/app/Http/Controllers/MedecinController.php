<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Carbon;
use App\Models\consultation;
use App\Models\medecin;
use App\Models\patient;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class MedecinController extends Controller
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
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        DB::insert('insert into medecins (user_id, spec_id, titre, nom, prenom, sexe, tarif, siteWeb, adresseCabinet, ville, teleCabinet, telePerso, duree,isSanteSpecialise) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [$request->user_id, $request->spec_id, $request->titre, $request->nom, $request->prenom, $request->sexe, $request->tarif, $request->siteWeb, $request->adresseCabinet, $request->ville, $request->teleCabinet, $request->telePerso, $request->duree,1]);

        $users = DB::select('select * from medecins where user_id = ?',[$request->user_id]);
        $spec = DB::select('select libelle from specialites where spec_id = ?',[$users[0]->spec_id]);
        if($users)
        {
           return response()->json([
               'hasError' => false,
               'success' => 'Done ',
               'error' => '',
               'spec' => $spec[0],
               'user' =>$users[0]]);
        }
        else{
            return response()->json([
                'hasError' => true,
                'success' => '',
                'error' => 'Error']);
        }
    }
    public function ConsultationCount(Request $request)
    {
        $count = DB::select("select count(*) as count from consultations c inner join medecins m on m.med_id = c.med_id inner join users u on u.user_id = m.user_id where u.user_id = ?",[$request->user_id]);
        return $count[0]->count;
    }
    
    public function showConsultations(Request $request)
    {
        $value = DB::select("SELECT up.email,p.patient_id,p.nom,p.prenom,p.sexe,p.telePerso,p.pays,p.dateNaiss,c.tarif,c.heure,c.etat,c.type,c.date,c.const_id,c.raison FROM `consultations` c inner join medecins m on m.med_id = c.med_id inner join patients p on p.patient_id = c.patient_id inner join users um on um.user_id = m.user_id inner join users up on up.user_id = p.user_id where um.user_id = (?)",[$request->user_id]); 
        return $value;
    }
    public function updateConsultations(Request $request)
    {
        $value = DB::update("update consultations set etat = ? where const_id = ?",[$request->etat,$request->const_id]); 
        return $value;
    }
    public function PatientInfo(Request $request)
    {
        $pat = DB::select("");
        return $pat;
    }
    public function DoctorInfoByUser(Request $request)
    {
        $user =  DB::select('select * from medecins where user_id = ?',[$request->user_id]);
        $spec = DB::select('select libelle from specialites where spec_id = ?',[$user[0]->spec_id]);

        if($user)
        {
           return response()->json([
               'hasError' => false,
               'success' => 'Done ',
               'error' => '',
               'spec' => $spec[0],
               'user' =>$user[0]]);
        }
        else{
            return response()->json([
                'hasError' => true,
                'success' => '',
                'error' => 'Error']);
        }
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Medecin  $medecin
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        return  DB::select('select * from medecins');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Medecin  $medecin
     * @return \Illuminate\Http\Response
     */
    public function edit(Medecin $medecin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Medecin  $medecin
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Medecin $medecin)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Medecin  $medecin
     * @return \Illuminate\Http\Response
     */
    public function destroy(Medecin $medecin)
    {
        //
    }
}
