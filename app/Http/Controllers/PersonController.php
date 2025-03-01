<?php

namespace App\Http\Controllers;

use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use App\Models\Language;
use App\Models\Interest;

use App\Events\PersonCreated;


class PersonController extends Controller
{
    public function index()
    {
        return inertia('People/Index', [
            'people' => Person::all()
        ]);
    }

    // public function create()
    // {
    //     return inertia('People/Create');
    // }


    public function create()
    {
        return inertia('People/Create', [
            'languages' => Language::select('id', 'name')->get(),
            'interests' => Interest::select('id', 'name')->get(),
        ]);
    }



// public function store(Request $request)
// {
//     Log::info('📥 Incoming Request Data:', $request->all());

//     try {
//         $validated = $request->validate([
//             'name' => 'required|max:255',
//             'surname' => 'required|max:255',
//             'sa_id_number' => 'required|',
//             'mobile_number' => ['required', ''],
//             'email' => 'required|email|unique:people,email',
//             'birth_date' => 'required|date',
//             'language' => 'required|string',
//             'interests' => 'required|array',
//         ]);

//         Log::info('✅ Validated Data:', $validated);

//         $person = Person::create($validated);
        
//         Log::info('✅ Person Created Successfully:', $person->toArray());

//         // Dispatch Event
//         event(new PersonCreated($person));

//         return redirect()->route('people.index')->with('success', 'Person added successfully! Email sent.');
//     } catch (ValidationException $e) {
//         Log::error('❌ Validation Error:', $e->errors());

//         return back()->withErrors($e->errors());
//     } catch (\Exception $e) {
//         Log::error('❌ Error Creating Person:', [
//             'message' => $e->getMessage(),
//             'trace' => $e->getTraceAsString()
//         ]);

//         return back()->withErrors(['error' => 'An error occurred while adding the person.']);
//     }
// }


public function store(Request $request)
{
    Log::info('📥 Incoming Request Data:', $request->all());

    try {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'surname' => 'required|max:255',
            'sa_id_number' => 'required',
            'mobile_number' => 'required',
            'email' => 'required|email|unique:people,email',
            'birth_date' => 'required|date',
            'language_id' => 'required|exists:languages,id',
            'interests' => 'required|array',
            'interests.*' => 'exists:interests,id',
        ]);

        Log::info('✅ Validated Data:', $validated);

        $person = Person::create([
            'name' => $validated['name'],
            'surname' => $validated['surname'],
            'sa_id_number' => $validated['sa_id_number'],
            'mobile_number' => $validated['mobile_number'],
            'email' => $validated['email'],
            'birth_date' => $validated['birth_date'],
            'language_id' => $validated['language_id'],
        ]);

        
        $person->interests()->attach($validated['interests']);

        Log::info('✅ Person Created Successfully:', $person->toArray());
        event(new PersonCreated($person));


        return redirect()->route('people.index')->with('success', 'Person added successfully!');

    } catch (ValidationException $e) {
        Log::error('❌ Validation Error:', $e->errors());
        return back()->withErrors($e->errors());
    } catch (\Exception $e) {
        Log::error('❌ Error Creating Person:', [
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);

        return back()->withErrors(['error' => 'An error occurred while adding the person.']);
    }
}



public function edit(Person $person)
{
    return inertia('People/Edit', [
        'person' => $person->load('interests'), // Load related interests
        'languages' => Language::select('id', 'name')->get(),
        'interests' => Interest::select('id', 'name')->get(),
    ]);
}


public function update(Request $request, Person $person)
{
    Log::info('📥 Incoming Update Request Data:', $request->all());

    try {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'surname' => 'required|max:255',
            'sa_id_number' => ['required', Rule::unique('people')->ignore($person->id)],
            'mobile_number' => 'required',
            'email' => ['required', 'email', Rule::unique('people')->ignore($person->id)],
            'birth_date' => 'required|date',
            'language_id' => 'required|exists:languages,id', // Fixed validation
            'interests' => 'required|array',
            'interests.*' => 'exists:interests,id',
        ]);

        Log::info('✅ Validated Update Data:', $validated);

        $person->update([
            'name' => $validated['name'],
            'surname' => $validated['surname'],
            'sa_id_number' => $validated['sa_id_number'],
            'mobile_number' => $validated['mobile_number'],
            'email' => $validated['email'],
            'birth_date' => $validated['birth_date'],
            'language_id' => $validated['language_id'],
        ]);

        // Sync interests to update the many-to-many relationship
        $person->interests()->sync($validated['interests']);

        Log::info('✅ Person Updated Successfully:', $person->toArray());


        return redirect()->route('people.index')->with('success', 'Person updated successfully!');

    } catch (ValidationException $e) {
        Log::error('❌ Validation Error:', $e->errors());
        return back()->withErrors($e->errors());
    } catch (\Exception $e) {
        Log::error('❌ Error Updating Person:', [
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);

        return back()->withErrors(['error' => 'An error occurred while updating the person.']);
    }
}


    public function destroy(Person $person)
    {
        $person->delete();
        return redirect()->route('people.index')->with('success', 'Person deleted successfully!');
    }
}
