<?php

namespace App\Http\Controllers;

use App\Models\Interest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InterestController extends Controller
{
    // Show all interests
    public function index()
    {
        $interests = Interest::latest()->get();
        return Inertia::render('Interests/Index', ['interests' => $interests]);
    }

    // Show create form
    public function create()
    {
        return Inertia::render('Interests/Create');
    }

    // Store new interest
    public function store(Request $request)
    {
        $request->validate(['name' => 'required|unique:interests|max:255']);

        Interest::create(['name' => $request->name]);

        return redirect()->route('interests.index')->with('success', 'Interest created successfully.');
    }

    // Show edit form
    public function edit(Interest $interest)
    {
        return Inertia::render('Interests/Edit', ['interest' => $interest]);
    }

    // Update interest
    public function update(Request $request, Interest $interest)
    {
        $request->validate(['name' => 'required|unique:interests,name,' . $interest->id]);

        $interest->update(['name' => $request->name]);

        return redirect()->route('interests.index')->with('success', 'Interest updated successfully.');
    }

    // Delete interest
    public function destroy(Interest $interest)
    {
        $interest->delete();
        return redirect()->route('interests.index')->with('success', 'Interest deleted successfully.');
    }
}
