"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const Page = () => {
  const [formData, setFormData] = useState({ username:'', email: '', password: '', confirm_password: '' });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      alert('Password and Confirm Password do not match');
    }
    else {
      const dataToSend = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      axios.post('https://next-mail-backend.vercel.app/user/addUser', { dataToSend })
        .then(() => {
          alert('Account Successfully Created: ');
          setFormData({
            username: '',
            email: '',
            password: '',
            confirm_password: '',
          });
          router.push('/login-form');
        })
        .catch((error) => {
          alert(error.response.data);
        });
    }
  };

  return (
    <div className='Container'>
      <div className='formContainer'>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="username"
            name='username'
            placeholder="User name"
            required
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            name='email'
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name='password'
            placeholder='Password'
            required
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name='confirm_password'
            placeholder='Confirm Password'
            required
            value={formData.confirm_password}
            onChange={handleChange}
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account?{' '}
          <Link href="/login-form" className='toggleLink'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
