"use client"
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import DefaultLayout from '../Layouts/DefaultLayout';
import { useSelector, useDispatch } from 'react-redux';
import { composeMailSuccess, composeMailFailure } from '../lib/composeSlice';

const page = () => {
    const [formData, setFormData] = useState({ email: '', subject: '', description: '' });
    const dispatch = useDispatch();

    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlemailsent = async () => {
        const token = localStorage.getItem("token");
        const dataToSend = {
            email: formData.email,
            subject: formData.subject,
            description: formData.description,
        };

        try {
            const response = await axios.post('https://next-mail-backend.vercel.app/mail/sent-mail', dataToSend, {
                headers: {
                    Authorization: token,
                },
            });

            if (response.status === 200) {
                alert(response.data.message);
                setFormData({
                    email: '',
                    subject: '',
                    description: '',
                });
                dispatch(composeMailSuccess(response.data));
            } else {
                alert(response.data.error);
                dispatch(composeMailFailure(response.data.error));
            }
        } catch (error) {
            console.log(error)
            alert(error);
            dispatch(composeMailFailure(error.message));
        }
    };

    const handleSearch = (query) => {
    };

    // if (isAuthenticated) {
    //     return <p>You are already logged in.</p>;
    // }

    return (
        <DefaultLayout onSearch={handleSearch}>
            <div className="email-editor1">
                <div className="email-editor">
                    <form onSubmit={handlemailsent}>
                        <label>To:</label>
                        <div className="mailbox">
                            <PersonIcon className="mailogo" />
                            <input
                                type="email"
                                name='email'
                                placeholder='Enter mail id...'
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='sub'>
                            <label>Subject:
                                <input
                                    type="text"
                                    name='subject'
                                    placeholder='Subject...'
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className='msg'>
                            <label>Message:
                                <textarea
                                    name='description'
                                    placeholder='Type here...'
                                    required
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <button type='submit'>Send Email</button>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default page;
