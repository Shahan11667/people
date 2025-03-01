


// import React, { useState } from "react";
// import { useForm } from "@inertiajs/react";
// import Select from "react-select";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function Create({ languages, interests }) {
//     const { data, setData, post, errors, setError, clearErrors } = useForm({
//         name: "",
//         surname: "",
//         sa_id_number: "",
//         mobile_number: "",
//         email: "",
//         birth_date: "",
//         language_id: "", // Store ID instead of name
//         interests: [], // Store IDs instead of names
//     });

//     const [globalError, setGlobalError] = useState(null);

//     function handleSubmit(e) {
//         e.preventDefault();
//         clearErrors(); // Clear previous errors

//         post("/people", {
//             preserveScroll: true,
//             onSuccess: () => {
//                 setGlobalError(null);
//                 alert("Person added successfully!");
//             },
//             onError: (err) => {
//                 if (err.errors) {
//                     setError(err.errors);
//                 } else {
//                     setGlobalError(err.message || "Something went wrong. Please try again.");
//                 }
//             },
//         });
//     }

//     // Convert backend data into React-Select options
//     const languageOptions = languages.map(lang => ({ value: lang.id, label: lang.name }));
//     const interestOptions = interests.map(interest => ({ value: interest.id, label: interest.name }));

//     return (
//         <div className="container mt-5">
//             <h1 className="mb-4">Add New Person</h1>

//             {/* Global Error */}
//             {globalError && <div className="alert alert-danger">{globalError}</div>}

//             <form onSubmit={handleSubmit} className="card p-4 shadow">
//                 {/* Name */}
//                 <div className="mb-3">
//                     <label className="form-label">Name</label>
//                     <input type="text" className="form-control" value={data.name} onChange={e => setData("name", e.target.value)} />
//                     {errors.name && <div className="text-danger">{errors.name}</div>}
//                 </div>

//                 {/* Surname */}
//                 <div className="mb-3">
//                     <label className="form-label">Surname</label>
//                     <input type="text" className="form-control" value={data.surname} onChange={e => setData("surname", e.target.value)} />
//                     {errors.surname && <div className="text-danger">{errors.surname}</div>}
//                 </div>

//                 {/* SA ID Number */}
//                 <div className="mb-3">
//                     <label className="form-label">South African ID Number</label>
//                     <input type="text" className="form-control" value={data.sa_id_number} onChange={e => setData("sa_id_number", e.target.value)} />
//                     {errors.sa_id_number && <div className="text-danger">{errors.sa_id_number}</div>}
//                 </div>

//                 {/* Mobile Number */}
//                 <div className="mb-3">
//                     <label className="form-label">Mobile Number</label>
//                     <input type="text" className="form-control" value={data.mobile_number} onChange={e => setData("mobile_number", e.target.value)} />
//                     {errors.mobile_number && <div className="text-danger">{errors.mobile_number}</div>}
//                 </div>

//                 {/* Email */}
//                 <div className="mb-3">
//                     <label className="form-label">Email</label>
//                     <input type="email" className="form-control" value={data.email} onChange={e => setData("email", e.target.value)} />
//                     {errors.email && <div className="text-danger">{errors.email}</div>}
//                 </div>

//                 {/* Birth Date */}
//                 <div className="mb-3">
//                     <label className="form-label">Birth Date</label>
//                     <input type="date" className="form-control" value={data.birth_date} onChange={e => setData("birth_date", e.target.value)} />
//                     {errors.birth_date && <div className="text-danger">{errors.birth_date}</div>}
//                 </div>

//                 {/* Language Select */}
//                 <div className="mb-3">
//                     <label className="form-label">Language</label>
//                     <Select
//                         options={languageOptions}
//                         value={languageOptions.find(option => option.value === data.language_id)}
//                         onChange={selectedOption => setData("language_id", selectedOption ? selectedOption.value : "")}
//                         isClearable
//                         placeholder="Select Language"
//                     />
//                     {errors.language_id && <div className="text-danger">{errors.language_id}</div>}
//                 </div>

//                 {/* Interests Multi-Select */}
//                 <div className="mb-3">
//                     <label className="form-label">Interests</label>
//                     <Select
//                         options={interestOptions}
//                         isMulti
//                         value={interestOptions.filter(option => data.interests.includes(option.value))}
//                         onChange={selectedOptions => setData("interests", selectedOptions.map(option => option.value))}
//                         isClearable
//                         placeholder="Select Interests"
//                     />
//                     {errors.interests && <div className="text-danger">{errors.interests.join(", ")}</div>}
//                 </div>

//                 {/* Submit Button */}
//                 <button type="submit" className="btn btn-primary">Save</button>
//             </form>
//         </div>
//     );
// }


import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import Select from "react-select";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

export default function Create({ auth, languages, interests }) {
    const { data, setData, post, errors, setError, clearErrors } = useForm({
        name: "",
        surname: "",
        sa_id_number: "",
        mobile_number: "",
        email: "",
        birth_date: "",
        language_id: "", // Store ID instead of name
        interests: [], // Store IDs instead of names
    });

    const [globalError, setGlobalError] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        clearErrors();

        post("/people", {
            preserveScroll: true,
            onSuccess: () => {
                setGlobalError(null);
                toast.success("Person added successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
            },
            onError: (err) => {
                if (err.errors) {
                    setError(err.errors);
                } else {
                    setGlobalError(err.message || "Something went wrong. Please try again.");
                }
            },
        });
    }

    // Convert backend data into React-Select options
    const languageOptions = languages.map((lang) => ({ value: lang.id, label: lang.name }));
    const interestOptions = interests.map((interest) => ({ value: interest.id, label: interest.name }));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Add New Person</h2>}
        >
            <ToastContainer />
            <div className="min-h-screen bg-light p-4">
                <div className="container bg-white shadow-lg rounded-lg p-4">
                    <h1 className="mb-4 fw-bold text-dark">Add New Person</h1>

                    {/* Global Error */}
                    {globalError && <div className="alert alert-danger">{globalError}</div>}

                    <form onSubmit={handleSubmit} className="card p-4 shadow">
                        {/* Name */}
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" value={data.name} onChange={(e) => setData("name", e.target.value)} />
                            {errors.name && <div className="text-danger">{errors.name}</div>}
                        </div>

                        {/* Surname */}
                        <div className="mb-3">
                            <label className="form-label">Surname</label>
                            <input type="text" className="form-control" value={data.surname} onChange={(e) => setData("surname", e.target.value)} />
                            {errors.surname && <div className="text-danger">{errors.surname}</div>}
                        </div>

                        {/* SA ID Number */}
                        <div className="mb-3">
                            <label className="form-label">South African ID Number</label>
                            <input type="text" className="form-control" value={data.sa_id_number} onChange={(e) => setData("sa_id_number", e.target.value)} />
                            {errors.sa_id_number && <div className="text-danger">{errors.sa_id_number}</div>}
                        </div>

                        {/* Mobile Number */}
                        <div className="mb-3">
                            <label className="form-label">Mobile Number</label>
                            <input type="text" className="form-control" value={data.mobile_number} onChange={(e) => setData("mobile_number", e.target.value)} />
                            {errors.mobile_number && <div className="text-danger">{errors.mobile_number}</div>}
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={data.email} onChange={(e) => setData("email", e.target.value)} />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>

                        {/* Birth Date */}
                        <div className="mb-3">
                            <label className="form-label">Birth Date</label>
                            <input type="date" className="form-control" value={data.birth_date} onChange={(e) => setData("birth_date", e.target.value)} />
                            {errors.birth_date && <div className="text-danger">{errors.birth_date}</div>}
                        </div>

                        {/* Language Select */}
                        <div className="mb-3">
                            <label className="form-label">Language</label>
                            <Select
                                options={languageOptions}
                                value={languageOptions.find((option) => option.value === data.language_id)}
                                onChange={(selectedOption) => setData("language_id", selectedOption ? selectedOption.value : "")}
                                isClearable
                                placeholder="Select Language"
                            />
                            {errors.language_id && <div className="text-danger">{errors.language_id}</div>}
                        </div>

                        {/* Interests Multi-Select */}
                        <div className="mb-3">
                            <label className="form-label">Interests</label>
                            <Select
                                options={interestOptions}
                                isMulti
                                value={interestOptions.filter((option) => data.interests.includes(option.value))}
                                onChange={(selectedOptions) => setData("interests", selectedOptions.map((option) => option.value))}
                                isClearable
                                placeholder="Select Interests"
                            required
                            />
                            {errors.interests && <div className="text-danger">{errors.interests.join(", ")}</div>}
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
