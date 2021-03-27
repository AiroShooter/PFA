<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $nbUsers = (int)$this->command->ask('How many users do you want to generate ');
        \App\Models\User::factory($nbUsers)->create();
    }
}
