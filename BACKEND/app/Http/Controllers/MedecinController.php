<?php

namespace App\Http\Controllers;

use App\Models\Medecin;
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
    public function create(Request $request)
    {
        DB::insert('insert into medecins (`user_id`, `spec_id`, `titre`, `nom`, `prenom`, `tarif`, `siteWeb`, `adresseCabinet`, `ville`, `teleCabinet`, `telePerso`, `duree`) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [$request->spec_id, $request->titre, $request->nom, $request->prenom, $request->tarif, $request->siteWeb, $request->adresseCabinet, $request->ville, $request->teleCabinet, $request->telePerso, $request->duree]);

        $users = DB::select('select * from medecins where user_id = ?',[$request->user_id]);
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
