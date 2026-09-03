import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage() {
    // Task 4: Store credentials variables state configurations using hooks
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Task 5: Define target form validation logs event processing handler
    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Authentication Login Gateway Attempt Logs:", { email, password });
    };

    return (
        <div className="container mt-5 pt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="login-card p-4 border rounded shadow bg-white">
                        <h2 className="text-center mb-4 font-weight-bold">Login</h2>
                        <form onSubmit={handleLogin}>
                            {/* Task 6: Create input validation elements for email and password forms */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Email Address</label>
                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Password</label>
                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            {/* Task 7: Setup an explicit firing click button link hook mapping tool handler */}
                            <button type="submit" className="btn btn-success w-100 mt-2 rounded-pill fw-bold">Login</button>
                        </form>
                        <p className="mt-4 text-center">
                            New here? <a href="/app/register" className="text-decoration-none fw-semibold">Register here</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
