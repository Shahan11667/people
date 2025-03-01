

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
    const { interests, success } = usePage().props;

    useEffect(() => {
        setTimeout(() => {
            $("#interestsTable").DataTable();
        }, 100);
    }, []);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this interest?")) {
            router.delete(route("interests.destroy", id), {
                onSuccess: () => {
                    toast.success("Interest deleted successfully!", {
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
            header={<h2 className="font-semibold text-xl text-white leading-tight">Interests</h2>}
        >
            <ToastContainer />
            <div className="min-h-screen bg-light p-4">
                <div className="container bg-white shadow-lg rounded-lg p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2 className="fw-bold text-dark">Interests</h2>
                        <Link href={route("interests.create")} className="btn btn-primary">
                            <FontAwesomeIcon icon={faPlus} className="me-2" />
                            Add Interest
                        </Link>
                    </div>

                    {success && <div className="alert alert-success">{success}</div>}

                    <div className="table-responsive">
                        <table id="interestsTable" className="table table-striped table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {interests.map((interest) => (
                                    <tr key={interest.id}>
                                        <td>{interest.id}</td>
                                        <td>{interest.name}</td>
                                        <td className="text-center">
                                            <Link href={route("interests.edit", interest.id)} className="btn btn-warning btn-sm me-2">
                                                <FontAwesomeIcon icon={faEdit} className="me-1" />
                                                Edit
                                            </Link>
                                            <button onClick={() => handleDelete(interest.id)} className="btn btn-danger btn-sm">
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
