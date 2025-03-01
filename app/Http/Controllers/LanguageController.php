<?php

namespace App\Http\Controllers;

use App\Models\Language;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    public function index()
    {
        $languages = Language::all();
        return inertia('Languages/Index', ['languages' => $languages]);
    }

    public function create()
    {
        return inertia('Languages/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:languages,name|max:255',
        ]);

        Language::create(['name' => $request->name]);

        return redirect()->route('languages.index')->with('success', 'Language added successfully!');
    }

    public function edit(Language $language)
    {
        return inertia('Languages/Edit', ['language' => $language]);
    }

    public function update(Request $request, Language $language)
    {
        $request->validate([
            'name' => 'required|unique:languages,name,' . $language->id . '|max:255',
        ]);

        $language->update(['name' => $request->name]);

        return redirect()->route('languages.index')->with('success', 'Language updated successfully!');
    }

    public function destroy(Language $language)
    {
        $language->delete();
        return redirect()->route('languages.index')->with('success', 'Language deleted successfully!');
    }
}
