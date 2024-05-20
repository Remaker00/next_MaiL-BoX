"use client"
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setEmails } from '../lib/inboxSlice';
import axios from 'axios';
import EmailView from '../Components/EmailView';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import DefaultLayout from '../Layouts/DefaultLayout';
import { fetchEmails, handleDelete, handleStarred, formatDateString } from '../Components/LogicShare';

const page = () => {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const dispatch = useDispatch();
    const emails = useSelector((state) => state.inbox);
    const [loading, setLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchEmails('https://next-mail-backend.vercel.app/mail/get-mail', dispatch, setLoading);
        };

        fetchData(); // Initial fetch

        const interval = setInterval(fetchData, 5000); // Fetch every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [dispatch]);


    const handleEmailClick = async (email) => {
        if (!email.read) {
            try {
                await axios.put(`https://next-mail-backend.vercel.app/mail/mark-read/${email._id}`);
                const updatedEmail = { ...email, read: true };
                dispatch(setEmails(emails.map(e => (e._id === email._id ? updatedEmail : e))));
                setSelectedEmail(updatedEmail);
            } catch (error) {
                console.error('Failed to mark as read:', error);
            }
        } else {
            setSelectedEmail(email);
        }
    };

    const handleSearch = (query) => {
        const filteredResults = emails.filter(result =>
            result.subject.toLowerCase().includes(query.toLowerCase()) ||
            result.description.toLowerCase().includes(query.toLowerCase()) ||
            result.sender_mail.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    const displayedEmails = searchResults.length > 0 ? searchResults : emails;

    return (
        <DefaultLayout onSearch={handleSearch}>
            <div className="email-list1">
                {loading ? (
                    <div className="loading-container">
                        <img src="/giphy.gif" alt="Loading..." />
                    </div>
                ) : (
                    <div className="email-list">
                        {displayedEmails.length === 0 ? (
                            <div className="no-mails">No mails to show</div>
                        ) : (displayedEmails.map((email, i) => (
                            <li key={i}
                                className={`email ${email.read ? 'read' : 'unread'}`}
                                onClick={() => handleEmailClick(email)}
                            >
                                {!email.read && <div className="blue-dot"></div>}
                                <div className="email-sender">{email.sender_mail}</div>
                                <div className="email-subject">{email.subject}</div>
                                <div className="email-message">{email.description}</div>
                                <div className="email-date">{formatDateString(email.sentDate)}</div>
                                <button className='Delete-btn' onClick={(e) => handleDelete(e, email, dispatch, emails)}><DeleteIcon /></button>
                                <button className='star' onClick={(e) => handleStarred(e, email, dispatch, emails)}><StarBorderIcon /></button>
                            </li>
                        ))
                        )}
                    </div>
                )}
                {selectedEmail && (
                    <div className="backdrop">
                        <EmailView
                            selectedEmail={selectedEmail}
                            onClose={() => setSelectedEmail(null)}
                        />
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
};

export default page;
