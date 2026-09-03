import React, { useState } from 'react';
import './RegisterPage.css';

function RegisterPage() {
    // Task 4: Store all tracking attributes as states utilizing useState hooks
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Task 5: Define a method handleRegister to print target logs onto console
    const handleRegister = (e) => {
        e.preventDefault();
        console.log("Registration Attempt Profile Details:", { firstName, lastName, email, password });
    };

    return (
        <div className="container mt-5 pt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="register-card p-4 border rounded shadow bg-white">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>
                        <form onSubmit={handleRegister}>
                            {/* Task 6: Create controlled labeled text input forms elements */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">First Name</label>
                                <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Last Name</label>
                                <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Email Address</label>
                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Password</label>
                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            {/* Task 7: Add a submission button executing form handling functions */}
                            <button type="submit" className="btn btn-primary w-100 mt-2 rounded-pill fw-bold">Register</button>
                        </form>
                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login" className="text-decoration-none fw-semibold">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
