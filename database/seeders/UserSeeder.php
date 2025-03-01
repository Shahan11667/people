<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Shahan ',
            'email' => 'shahan@example.com',
            'password' => Hash::make('password123'),
        ]);

        // Create multiple users with Faker (Optional)
        User::factory(10)->create();
    }
}

