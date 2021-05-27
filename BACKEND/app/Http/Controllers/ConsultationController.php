<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use App\Models\consultation;
use Illuminate\Http\Request;

class ConsultationController extends Controller
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
        $result_c = DB::select('SELECT * FROM `calendriers` WHERE `patient_id` = ?', [$request->patient_id]);
        $result_m = DB::select('SELECT * FROM `medecins` WHERE `med_id` = ?', [$result_c[0]->med_id]);
        return  DB::insert('INSERT INTO `consultations`(`patient_id`, `med_id`, `replace_id`, `doss_id`, `date`, `type`, `desc`, `etat`, `raison`, `heure`, `tarif`, `echanger`)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',[$request->patient_id,$result_c[0]->med_id,NULL,NULL,$result_c[0]->date,$request->type,NULL,'En attente',$request->raison,$result_c[0]->heureDebut, $result_m[0]->tarif,'patient']);
        
        
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
     * @param  \App\Models\consultation  $consultation
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $cons = DB::select('select * from consultations where med_id = (?) ',$request->med_id);
        if($cons)
        {
           return response()->json([
               'hasError' => false,
               'success' => 'Done',
               'data' => $cons,
               'error' => '']);
               
        }
        else{
            return response()->json([
                'hasError' => true,
                'success' => '',
                'data' => 'empty',
                'error' => 'Error']);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\consultation  $consultation
     * @return \Illuminate\Http\Response
     */
    public function edit(consultation $consultation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\consultation  $consultation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, consultation $consultation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\consultation  $consultation
     * @return \Illuminate\Http\Response
     */
    public function destroy(consultation $consultation)
    {
        //
    }
}
