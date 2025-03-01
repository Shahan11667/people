

import React from "react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Edit({ auth, language }) {
    const { data, setData, put, processing, errors } = useForm({
        name: language.name,
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route("languages.update", language.id), {
            onSuccess: () => {
                toast.success("Language updated successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            },
            onError: (err) => {
                if (err.name) {
                    toast.error("Error: " + err.name, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            },
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Edit Language</h2>}
        >
            <ToastContainer />
            <div className="min-h-screen bg-light p-4 d-flex align-items-center justify-content-center">
                <div className="container bg-white shadow-lg rounded-lg p-4" style={{ maxWidth: "500px" }}>
                    <h2 className="fw-bold text-center mb-4 text-dark">Edit Language</h2>
                    {errors.name && <div className="alert alert-danger">{errors.name}</div>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="mb-3">
                            <label className="form-label fw-bold">Language Name</label>
                            <input
                                type="text"
                                placeholder="Enter Language Name"
                                className="form-control"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100" disabled={processing}>
                            {processing ? "Updating..." : "Update Language"}
                        </button>
                    </form>

                    <div className="text-center mt-3">
                        
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
