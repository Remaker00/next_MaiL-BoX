"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../lib/authSlice";

const Page = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const route = useRouter();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSend = {
            email: formData.email,
            password: formData.password,
        };

        axios.post('http://localhost:4000/user/checkUser', { dataToSend })
            .then((response) => {
                localStorage.setItem('token', response.data.token);

                dispatch(loginSuccess(response.data.token));
                alert('Successfully Logged In: ');

                setFormData({
                    email: '',
                    password: '',
                });
                route.push('/mail-box');
            })
            .catch((error) => {
                dispatch(loginFailure());
                alert(error.response.data);
            });
    }

    if (isAuthenticated) {
        return <p>LOADING...</p>;
    }


    return (
        <div className='Container'>
            <div className='formContainer'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name='email'
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                        type="password"
                        name='password'
                        placeholder='Password'
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button type="submit">Login</button>
                </form>
                <p>
                    Don't have an account?{' '}
                    <Link href="/" className='toggleLink'>
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};


export default Page;
