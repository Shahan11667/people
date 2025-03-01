<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Interest;
use Illuminate\Support\Facades\Log;

class InterestController extends Controller
{
    
    public function index()
    {
        return response()->json(Interest::all(), 200);
    }

    // Store a new interest
    public function store(Request $request)
    {
        Log::info('🟢 Interest Created:', $request->all());
        $request->validate([
            'name' => 'required|max:255',
        ]);
       
        $interest = Interest::create(['name' => $request->name]);
        Log::info('🟢 Interest Created:', $request->all());
        return response()->json(['message' => 'Interest created successfully!', 'interest' => $interest], 201);
    }

    // Get a single interest by ID
    public function show($id)
    {
        $interest = Interest::find($id);

        if (!$interest) {
            return response()->json(['message' => 'Interest not found!'], 404);
        }

        return response()->json($interest, 200);
    }

    // Update an interest
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|unique:interests,name,' . $id . '|max:255',
        ]);

        $interest = Interest::find($id);

        if (!$interest) {
            return response()->json(['message' => 'Interest not found!'], 404);
        }

        $interest->update(['name' => $request->name]);

        return response()->json(['message' => 'Interest updated successfully!', 'interest' => $interest], 200);
    }

    // Delete an interest
    public function destroy($id)
    {
        $interest = Interest::find($id);

        if (!$interest) {
            return response()->json(['message' => 'Interest not found!'], 404);
        }

        $interest->delete();

        return response()->json(['message' => 'Interest deleted successfully!'], 200);
    }
}
