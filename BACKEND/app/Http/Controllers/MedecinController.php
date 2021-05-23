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
        $cons = consultation::where('med_id', '<=', $request->med_id)->get();
        $consCount = $cons->count();
        return response()->json([
            'hasError' => false,
            'success' => 'Done',
            'Consultcount' => $consCount
            ]);
    }
    public function ConsultationInfo(Request $request)
    {
        $cons = consultation::where('med_id', '<=', $request->med_id)->get();
        return response()->json([
            'hasError' => false,
            'success' => 'Done',
            'Consinfo' => $cons
            ]);
    }
    public function PatientInfo(Request $request)
    {
        $cons = consultation::where('med_id', '<=', $request->med_id)->get();
        return response()->json([
            'hasError' => false,
            'success' => 'Done',
            'patients' => $cons
            ]);
    }
    public function DoctorInfoByUser(Request $request)
    {
        $user =  DB::select('select * from medecins where user_id = ?',[$request->user_id]);

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
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Medecin  $medecin
     * @return \Illuminate\Http\Response
     */
    public function show(Medecin $medecin)
    {
        //
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
