<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use App\Models\calendrier;
use Illuminate\Http\Request;

class CalendrierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

        $inserted = DB::insert('INSERT INTO `calendriers`(`med_id`, `date`, `jour`, `heureDebut`, `heureFin`, `patient_id`) VALUES (?,?,?,?,?,?)', [$request->med_id,NULL, $request->jour, $request->heureDebut, $request->heureFin, NULL]);
             
                if($inserted)
                {
                    return response()->json([
                        'hasError' => false,
                        'success' => 'Done',
                        'error' => '']);
                        
                }
                else
                {
                    return response()->json([
                        'hasError' => true,
                        'success' => '',
                        'data' => 'empty',
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
     * @param  \App\Models\calendrier  $calendrier
     * @return \Illuminate\Http\Response
     */
    public function show(calendrier $calendrier)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\calendrier  $calendrier
     * @return \Illuminate\Http\Response
     */
    public function edit(calendrier $calendrier)
    {
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\calendrier  $calendrier
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $upda = DB::update('update calendrier set patient_id = (?) where med_id',[$request->patient_id, $request->med_id]);
        if($upda)
        {
           return response()->json([
               'hasError' => false,
               'success' => 'Done',
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
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\calendrier  $calendrier
     * @return \Illuminate\Http\Response
     */
    public function destroy(calendrier $calendrier)
    {
        //
    }
}
