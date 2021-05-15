<?php

namespace App\Http\Controllers;

use App\Models\Specialite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class SpecialiteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $spec = DB::select('select * from specialites');
        if($spec)
        {
           return $spec;
               
        }
        else{
            return response()->json([
                'hasError' => true,
                'success' => '',
                'error' => 'Error']);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        DB::insert('INSERT INTO `specialites`(`libelle`) VALUES (?)', [$request->libelle]);

        $spec = DB::select('select * from specialites where libelle = ?',[$request->libelle]);
        if($spec)
        {
           return response()->json([
               'hasError' => false,
               'success' => 'Done ',
               'error' => '']);
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
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Specialite  $specialite
     * @return \Illuminate\Http\Response
     */
    

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Specialite  $specialite
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
    $spec = Specialite::where('spec_id', $request->oldlibelle)
      ->update(['libelle' => $request->newlibelle]);
       
        if($spec)
        {
           return response()->json([
               'hasError' => false,
               'success' => 'Done ',
               'error' => '']);
               
        }
        else{
            return response()->json([
                'hasError' => true,
                'success' => '',
                'error' => 'Error']);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Specialite  $specialite
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Specialite $specialite)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Specialite  $specialite
     * @return \Illuminate\Http\Response
     */
    public function destroy(Specialite $specialite)
    {
        //
    }
}
