

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
    const { people } = usePage().props;

    useEffect(() => {
        setTimeout(() => {
            $("#peopleTable").DataTable();
        }, 100);
    }, []);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this person?")) {
            router.delete(`/people/${id}`, {
                onSuccess: () => {
                    toast.success("Person deleted successfully!", {
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
            header={<h2 className="font-semibold text-xl text-white leading-tight">People List</h2>}
        >
            <ToastContainer />
            <div className="min-h-screen bg-light p-4">
                <div className="container bg-white shadow-lg rounded-lg p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2 className="fw-bold text-dark">People</h2>
                        <Link href="/people/create" className="btn btn-primary">
                            <FontAwesomeIcon icon={faPlus} className="me-2" />
                            Add Person
                        </Link>
                    </div>

                    <div className="table-responsive">
                        <table id="peopleTable" className="table table-striped table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Email</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {people.map((person) => (
                                    <tr key={person.id}>
                                        <td>{person.name}</td>
                                        <td>{person.surname}</td>
                                        <td>{person.email}</td>
                                        <td className="text-center">
                                            <Link href={`/people/${person.id}/edit`} className="btn btn-warning btn-sm me-2">
                                                <FontAwesomeIcon icon={faEdit} className="me-1" />
                                                Edit
                                            </Link>
                                            <button onClick={() => handleDelete(person.id)} className="btn btn-danger btn-sm">
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
