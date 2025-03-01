// import React, { useState } from "react";
// import { Link, useForm } from "@inertiajs/react";

// export default function Create() {
//     const { data, setData, post, errors } = useForm({
//         name: "",
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         post(route("languages.store"));
//     };

//     return (
//         <div className="container mx-auto mt-5">
//             <h2 className="text-2xl font-bold mb-4">Add New Language</h2>

//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label className="block">Language Name:</label>
//                     <input
//                         type="text"
//                         className="border p-2 w-full"
//                         value={data.name}
//                         onChange={(e) => setData("name", e.target.value)}
//                     />
//                     {errors.name && <p className="text-red-500">{errors.name}</p>}
//                 </div>

//                 <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-3">
//                     Save
//                 </button>
//             </form>

//             <Link href={route("languages.index")} className="block mt-3 text-blue-500">
//                 Back to List
//             </Link>
//         </div>
//     );
// }


import React from "react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("languages.store"), {
            onSuccess: () => {
                toast.success("Language added successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                reset(); // Clear the form after submission
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
            header={<h2 className="font-semibold text-xl text-white leading-tight">Create Language</h2>}
        >
            <ToastContainer />
            <div className="min-h-screen bg-light p-4 d-flex align-items-center justify-content-center">
                <div className="container bg-white shadow-lg rounded-lg p-4" style={{ maxWidth: "500px" }}>
                    <h2 className="fw-bold text-center mb-4 text-dark">Add New Language</h2>
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
                            {processing ? "Saving..." : "Save Language"}
                        </button>
                    </form>

                    <div className="text-center mt-3">
                        
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
