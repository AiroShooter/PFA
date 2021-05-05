<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{
    //
    public static function index(){
        $users = DB::select('select * from users');

        return $users;
    }
    public static function register(Request $request){

       // if($request->isPatient == "true")
        //   DB::insert('insert into users (`email`, `password`, `type`) values (?, ?, ?)', [$request->email, $request->password, 'patient']);
       // elseif($request->isPatient == "false")
         //   DB::insert('insert into users (`email`, `password`, `type`) values (?, ?, ?)', [$request->email, $request->password, 'medecin']);
        return "fvrtgrtgrtgrtgrethe5he5jhtyhryh6";
    }
}
