
import React, { useState } from 'react';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple hardcoded authentication
        if (username === 'admin' && password === 'password') {
            setError('');
            onLogin();
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
            <div className="absolute inset-0 -z-10 h-full w-full bg-gray-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700">
                <div className="text-center">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-blue-600 p-3 rounded-lg mr-4 shadow-lg border-2 border-blue-500">
                            <span className="font-bold text-white text-2xl tracking-wider">VTN</span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">VTN Motor</h1>
                            <p className="text-lg text-blue-200">Admin Login</p>
                        </div>
                    </div>
                </div>
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="username" className="text-sm font-bold text-gray-300 tracking-wide">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full mt-2 bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter 'admin'"
                        />
                    </div>
                    <div>
                        <label htmlFor="password"className="text-sm font-bold text-gray-300 tracking-wide">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-2 bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter 'password'"
                        />
                    </div>

                     {error && (
                        <p className="text-red-400 text-center text-sm">{error}</p>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-lg shadow-lg transition-colors duration-300"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
