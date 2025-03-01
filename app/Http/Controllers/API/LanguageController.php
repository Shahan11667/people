<?php

namespace App\Http\Controllers\API;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Language;
use Illuminate\Support\Facades\Log;

class LanguageController extends Controller
{
    // 🟢 Get all languages
    public function index()
    {
        
        return response()->json(Language::all(), 200);
    }

    // 🟢 Store a new language
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:languages|max:255',
        ]);

        $language = Language::create(['name' => $request->name]);

        Log::info('✅ Language Created:', $language->toArray());

        return response()->json(['message' => 'Language added successfully!', 'data' => $language], 201);
    }

    // 🟢 Show single language
    public function show($id)
    {
        $language = Language::find($id);
        if (!$language) {
            return response()->json(['error' => 'Language not found'], 404);
        }
        return response()->json($language, 200);
    }

    // 🟢 Update an existing language
    public function update(Request $request, $id)
    {
        $language = Language::find($id);
        if (!$language) {
            return response()->json(['error' => 'Language not found'], 404);
        }

        $request->validate([
            'name' => 'required|unique:languages,name,' . $id . '|max:255',
        ]);

        $language->update(['name' => $request->name]);

        Log::info('✅ Language Updated:', $language->toArray());

        return response()->json(['message' => 'Language updated successfully!', 'data' => $language], 200);
    }
}
