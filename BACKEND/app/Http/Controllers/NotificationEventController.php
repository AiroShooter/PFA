<?php

namespace App\Http\Controllers;

use App\Models\notificationEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotificationEventController extends Controller
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
        //
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
     * @param  \App\Models\notificationEvent  $notificationEvent
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $value = DB::select("SELECT * from notification_events"); 
        return $value;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\notificationEvent  $notificationEvent
     * @return \Illuminate\Http\Response
     */
    public function edit(notificationEvent $notificationEvent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\notificationEvent  $notificationEvent
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, notificationEvent $notificationEvent)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\notificationEvent  $notificationEvent
     * @return \Illuminate\Http\Response
     */
    public function destroy(notificationEvent $notificationEvent)
    {
        //
    }
}
