<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Crypt;

class AdminController extends Controller
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
        $count = User::where('email','=',$request->email)->count();

        if($count == 1)
        {
            return response()->json([
                'hasError' => true,
                'success' => '',
                'error' => 'Cet e-mail existe déjà, veuillez en essayer un autre'
            ]);
        }
        if($count == 0){

            $encrypted = Crypt::encryptString($request->password);  
            DB::insert('insert into users (email, password, type) values (?, ?, ?)', [$request->email, $encrypted, 'patient']);
            $users = DB::select('select * from users where email = ?',[$request->email]);
            if($users){
                return response()->json([
                    'hasError' => false,
                    'success' => 'Done',
                    'error' => '',
                    'user' =>$users[0]
                    ]);
            }
            DB::insert('insert into admins (`user_id`, `nom`, `prenom`) values (?, ?, ?)', [$users[0]->user_id, $request->nom, $request->prenom]);
            $admin = DB::select('select * from admins where user_id = ?',[$users[0]->user_id]);
            
            if($admin){
                return response()->json([
                    'hasError' => false,
                    'success' => 'Done',
                    'error' => '',
                    'user' =>$admin[0]
                    ]);
            }
            
            return response()->json([
                    'hasError' => false,
                    'success' => 'Done ',
                    'error' => ''
                ]);
        
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
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function show(Admin $admin)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function edit(Admin $admin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Admin $admin)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function destroy(Admin $admin)
    {
        //
    }
}
