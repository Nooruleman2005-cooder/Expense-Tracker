import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebaseconfig.js';
import { useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      alert('User Login Successfully');
      navigate("/profile");
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error.message);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handlePasswordReset = async () => {
    const resetEmail = prompt('Enter your email to reset password:');
    if (!resetEmail) {
      alert('Email is required');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert('Password reset email sent!');
    } catch (error) {
      console.error(error.message);
      alert('Failed to send password reset email');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-30 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full "
        >
          Login
        </button>
        <Link to="/signup"><p className='text'>Don't Have an Account</p></Link>
      </form>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePasswordReset}
          className="text-sm text-blue-500 "
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
};

export default Login;
