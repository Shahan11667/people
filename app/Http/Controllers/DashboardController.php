<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Person as People;
use App\Models\Language;
use App\Models\Interest;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'stats' => [
                'totalPeople' => People::count(),
                'totalLanguages' => Language::count(),
                'totalInterests' => Interest::count(),
            ]
        ]);
    }
}
