


import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import Select from "react-select";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

export default function Edit({ auth, person, languages, interests }) {
    const { data, setData, put, errors, setError, clearErrors } = useForm({
        name: person.name || "",
        surname: person.surname || "",
        sa_id_number: person.sa_id_number || "",
        mobile_number: person.mobile_number || "",
        email: person.email || "",
        birth_date: person.birth_date || "",
        language_id: person.language_id || "",
        interests: person.interests.map((interest) => interest.id) || [],
    });

    const [globalError, setGlobalError] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        clearErrors();

        put(`/people/${person.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setGlobalError(null);
                toast.success("Person updated successfully!", {
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

    const languageOptions = languages.map((lang) => ({ value: lang.id, label: lang.name }));
    const interestOptions = interests.map((interest) => ({ value: interest.id, label: interest.name }));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Edit Person</h2>}
        >
            <ToastContainer />
            <div className="min-h-screen bg-light p-4">
                <div className="container bg-white shadow-lg rounded-lg p-4">
                    <h1 className="mb-4 fw-bold text-dark">Edit Person</h1>

                    {globalError && <div className="alert alert-danger">{globalError}</div>}

                    <form onSubmit={handleSubmit} className="card p-4 shadow">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" value={data.name} onChange={(e) => setData("name", e.target.value)} />
                            {errors.name && <div className="text-danger">{errors.name}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Surname</label>
                            <input type="text" className="form-control" value={data.surname} onChange={(e) => setData("surname", e.target.value)} />
                            {errors.surname && <div className="text-danger">{errors.surname}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">South African ID Number</label>
                            <input type="text" className="form-control" value={data.sa_id_number} onChange={(e) => setData("sa_id_number", e.target.value)} />
                            {errors.sa_id_number && <div className="text-danger">{errors.sa_id_number}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Mobile Number</label>
                            <input type="text" className="form-control" value={data.mobile_number} onChange={(e) => setData("mobile_number", e.target.value)} />
                            {errors.mobile_number && <div className="text-danger">{errors.mobile_number}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={data.email} onChange={(e) => setData("email", e.target.value)} />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Birth Date</label>
                            <input type="date" className="form-control" value={data.birth_date} onChange={(e) => setData("birth_date", e.target.value)} />
                            {errors.birth_date && <div className="text-danger">{errors.birth_date}</div>}
                        </div>

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

                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
