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
    public function create()
    {
        
        
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
