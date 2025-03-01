


import React, { useEffect } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import $ from "jquery";
import "datatables.net-bs5";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Index({ auth }) {
    const { languages, flash } = usePage().props;

    useEffect(() => {
        setTimeout(() => {
            $("#languagesTable").DataTable();
        }, 100);
    }, []);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this language?")) {
            router.delete(route("languages.destroy", id), {
                onSuccess: () => {
                    toast.success("Language deleted successfully!", {
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
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Languages</h2>}
        >
            <ToastContainer />
            <div className="min-h-screen bg-light p-4">
                <div className="container bg-white shadow-lg rounded-lg p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2 className="fw-bold text-dark">Languages</h2>
                        <Link href={route("languages.create")} className="btn btn-primary">
                            <FontAwesomeIcon icon={faPlus} className="me-2" />
                            Add New Language
                        </Link>
                    </div>

                  
                    <div className="table-responsive">
                        <table id="languagesTable" className="table table-striped table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {languages.map((language) => (
                                    <tr key={language.id}>
                                        <td>{language.id}</td>
                                        <td>{language.name}</td>
                                        <td className="text-center">
                                            <Link href={route("languages.edit", language.id)} className="btn btn-warning btn-sm me-2">
                                                <FontAwesomeIcon icon={faEdit} className="me-1" />
                                                Edit
                                            </Link>
                                            <button onClick={() => handleDelete(language.id)} className="btn btn-danger btn-sm">
                                                <FontAwesomeIcon icon={faTrash} className="me-1" />
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
