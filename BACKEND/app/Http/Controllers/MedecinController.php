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
        $value = DB::select("SELECT up.email,p.patient_id,p.nom,p.prenom,p.sexe,p.telePerso,p.pays,p.dateNaiss,c.tarif,c.heure,c.etat,c.type,c.date,c.const_id,c.raison,c.desc FROM `consultations` c inner join medecins m on m.med_id = c.med_id inner join patients p on p.patient_id = c.patient_id inner join users um on um.user_id = m.user_id inner join users up on up.user_id = p.user_id where um.user_id = (?)",[$request->user_id]); 
        return $value;
    }
    public function showDossiers(Request $request)
    {
        $value = DB::select("SELECT * FROM `consultations` c inner join dossier_medicals d on c.doss_id = d.doss_id inner join medecins m on c.med_id = m.med_id inner JOIN specialites s on s.spec_id = m.spec_id where c.patient_id = ?",[$request->patient_id]);
        return $value;
    }
    public function updateConsultations(Request $request)
    {
        if($request->desc){
            return DB::update("UPDATE `consultations` SET `desc`= ? WHERE `const_id`= ?",[$request->desc,$request->const_id]);
        }
        if($request->etat == "Annuler"){
            DB::update("update consultations set etat = ?, Echanger = 'medecin' where const_id = ?",[$request->etat,$request->const_id]);
            $val = DB::select("select * from consultations where const_id = ?",[$request->const_id]);
            DB::update('UPDATE `calendriers` SET `date`= ?,`patient_id`= ? WHERE `date`= ? and `heureDebut` = ?', [NULL,NULL,$val[0]->date,$val[0]->heure]);
            return response()->json([
                'success' => 'update Consultation and calendar',
                'data' =>$val,
                'request'=>$request]);
        }
        else if($request->etat == "Accepter"){

            DB::update("update consultations set etat = ?, Echanger = 'medecin' where const_id = ?",[$request->etat,$request->const_id]);
            DB::insert("insert into dossier_medicals(doss_lib) values(?)",[$request->nom.' '.$request->prenom]);
            $dossier = DB::select("select * from dossier_medicals where doss_lib = ?",[$request->nom.' '.$request->prenom]);
            DB::update("update consultations set doss_id = ? where const_id = ?",[$dossier[0]->doss_id,$request->const_id]);
            return response()->json([
            'success' => 'update Consultation only']);
        }
      /*  else if($request->desc){
            return DB::update("update consultations set desc = ? where const_id = ?",[$request->desc,$request->const_id]);
        }*/
    }
    public function PatientInfo(Request $request)
    {
        $pat = DB::select("");
        return $pat;
    }
    public function DoctorInfoByUser(Request $request)
    {
        $user =  DB::select('select * from medecins where user_id = ?',[$request->user_id]);
        if($user)
        {
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
    }

    public function DoctorInfoById(Request $request)
    {
        return DB::select('select m.med_id, m.telePerso,m.nom,m.sexe,m.prenom,m.ville,m.tarif,m.adresseCabinet,s.libelle from medecins m inner join specialites s on s.spec_id = m.spec_id where med_id = ?',[$request->med_id]);
         
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
    public function cityshow()
    {
        return  DB::select('select distinct ville from medecins');
    }

    public function getCons(Request $request)
    {
        return  DB::select('select * from consultations c inner join patients p on p.patient_id = c.patient_id where c.date = ? and c.med_id = ?',[$request->date, $request->med_id]);
    }

    public function Replace(Request $request)
    {
        return  DB::update('UPDATE `consultations` SET `med_id`= ? WHERE `const_id`= ?',[$request->med_id,$request->const_id]);
    }
    public function showReplace(Request $request)
    {
        $med =  DB::select('SELECT * FROM `medecins` WHERE `med_id`= ?',[$request->med_id]);
      return response()->json([
            'nom' => $med[0]->nom,
            'prenom' => $med[0]->prenom
            ]);
    }


    

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Medecin  $medecin
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $query = DB::select("UPDATE `medecins` SET `spec_id`=?,`titre`=?,`nom`=?,`prenom`=?,`sexe`=?, `tarif`=?, `siteWeb`=?, `adresseCabinet`=?, `ville`=?, `teleCabinet`=?,`telePerso`=?, `duree`=? WHERE `user_id` = ?",[$request->spec_id,$request->titre,$request->nom,$request->prenom,$request->sexe,$request->tarif,$request->siteWeb,$request->adresseCabinet,$request->ville,$request->teleCabinet,$request->telePerso,$request->duree,$request->user_id]);
        $user = DB::select('select * from medecins where user_id = ?',[$request->user_id]);
        $spec = DB::select('select * from specialites where spec_id = ?',[$request->spec_id]);

        return response()->json([
            'hasError' => true,
            'success' => '',
            'spec' => $spec[0],
            'user' => $user[0]
            ]);
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
