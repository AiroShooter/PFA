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
        return $spec;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        DB::insert('INSERT INTO `specialites`(`libelle`) VALUES (?)', [$request->libelle]);

        $spec = DB::select("select * from specialites");
        return $spec;
        
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
        $spec = DB::update("update specialites set libelle = ? where spec_id = ?", [$request->libelle,$request->spec_id]);
        $spec1 = DB::select("select * from specialites");
        return $spec1;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Specialite  $specialite
     * @return \Illuminate\Http\Response
     */
    public function delete(Request $request)
    {
        $spec = DB::update("delete from specialites where spec_id = ?",[$request->spec_id]);
        $spec1 = DB::select("select * from specialites");
        return $spec1;
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
