<?php
// use Illuminate\Database\Migrations\Migration;
// use Illuminate\Database\Schema\Blueprint;
// use Illuminate\Support\Facades\Schema;

// return new class extends Migration {
//     public function up()
//     {
//         Schema::create('people', function (Blueprint $table) {
//             $table->id();
//             $table->string('name')->nullable();
//             $table->string('surname')->nullable();
//             $table->string('sa_id_number')->nullable();
//             $table->string('mobile_number')->nullable();
//             $table->string('email')->unique()->nullable();
//             $table->date('birth_date')->nullable();
//             $table->string('language')->nullable(); 
//             $table->json('interests')->nullable(); 
//             $table->timestamps();
//         });
//     }

//     public function down()
//     {
//         Schema::dropIfExists('people');
//     }
// };



use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('people', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('surname')->nullable();
            $table->string('sa_id_number')->nullable();
            $table->string('mobile_number')->nullable();
            $table->string('email')->unique()->nullable();
            $table->date('birth_date')->nullable();
            $table->foreignId('language_id')->nullable()->constrained('languages')->onDelete('set null'); // Foreign Key
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('people');
    }
};
