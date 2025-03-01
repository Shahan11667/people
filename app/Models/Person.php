<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    use HasFactory;



    protected $fillable = [
        'name',
        'surname',
        'sa_id_number',
        'mobile_number',
        'email',
        'birth_date',
        'language_id',
    ];

    public function language()
    {
        return $this->belongsTo(Language::class);
    }

    public function interests()
    {
        return $this->belongsToMany(Interest::class, 'interest_person');
    }
}
