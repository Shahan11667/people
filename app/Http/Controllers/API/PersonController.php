<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;

use App\Models\Person;
use App\Models\Interest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Response;
use App\Events\PersonCreated;


class PersonController extends Controller
{



    public function index()
    {
        return response()->json(Person::with(['language', 'interests'])->get());
    }

 

    public function store(Request $request)
{
    Log::info('📥 Incoming Request Data:', $request->all());

    try {
        // Validate request data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'sa_id_number' => 'required|string|unique:people,sa_id_number',
            'mobile_number' => 'required|string|max:20',
            'email' => 'required|email|unique:people,email',
            'birth_date' => 'required|date',
            'language_id' => 'required|exists:languages,id',
            'interests' => 'required|array',
            'interests.*' => 'exists:interests,id',
        ]);

        Log::info('✅ Validated Data:', $validated);

        // Create the person
        $person = Person::create([
            'name' => $validated['name'],
            'surname' => $validated['surname'],
            'sa_id_number' => $validated['sa_id_number'],
            'mobile_number' => $validated['mobile_number'],
            'email' => $validated['email'],
            'birth_date' => $validated['birth_date'],
            'language_id' => $validated['language_id'],
        ]);

        // Attach interests
        $person->interests()->attach($validated['interests']);

        Log::info('✅ Person Created Successfully:', $person->toArray());

        // Dispatch event
        event(new PersonCreated($person));

        // Return success response with 201 status
        return response()->json([
            'status' => Response::HTTP_CREATED, // 201
            'message' => 'Person added successfully!',
            'data' => $person->load(['language', 'interests']),
        ], Response::HTTP_CREATED);

    } catch (ValidationException $e) {
        Log::error('❌ Validation Error:', $e->errors());

        return response()->json([
            'status' => Response::HTTP_UNPROCESSABLE_ENTITY, // 422
            'message' => 'Validation failed',
            'errors' => $e->errors(),
        ], Response::HTTP_UNPROCESSABLE_ENTITY);

    } catch (\Exception $e) {
        Log::error('❌ Error Creating Person:', [
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);

        return response()->json([
            'status' => Response::HTTP_INTERNAL_SERVER_ERROR, // 500
            'message' => 'An error occurred while adding the person.',
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}

    // Show a specific person
    public function show($id)
    {
        $person = Person::with(['language', 'interests'])->findOrFail($id);
        return response()->json($person);
    }

    // Update a person
    public function update(Request $request, $id)
    {
        $person = Person::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'sa_id_number' => "required|string|unique:people,sa_id_number,$id",
            'mobile_number' => 'required|string|max:20',
            'email' => "required|email|unique:people,email,$id",
            'birth_date' => 'required|date',
            'language_id' => 'required|exists:languages,id',
            'interests' => 'array',
            'interests.*' => 'exists:interests,id',
        ]);

        $person->update($request->except('interests'));

        if ($request->has('interests')) {
            $person->interests()->sync($request->interests);
        }

        return response()->json($person->load(['language', 'interests']));
    }

    // Delete a person
    public function destroy($id)
    {
        $person = Person::findOrFail($id);
        $person->interests()->detach();
        $person->delete();

        return response()->json(['message' => 'Person deleted successfully']);
    }
}
