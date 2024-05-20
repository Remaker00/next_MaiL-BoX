"use client"
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import DefaultLayout from '../Layouts/DefaultLayout';
import StarBorderIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailView from '../Components/EmailView';
import { setEmails } from '../lib/inboxSlice';
import { fetchEmails, handleDelete, handleStarred, formatDateString } from '../Components/LogicShare';

export default function page() {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const dispatch = useDispatch();
    const emails = useSelector((state) => state.inbox);
    const [loading, setLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetchEmails('http://localhost:4000/mail/get-star-mail', dispatch, setLoading);
    }, [dispatch]);

    const handleEmailClick = (email) => {
        setSelectedEmail(email);
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
                            <li
                                key={i}
                                className="email"
                                onClick={() => handleEmailClick(email)}
                            >
                                <div className="email-sender">{email.email}</div>
                                <div className="email-subject">{email.subject}</div>
                                <div className="email-message">{email.description}</div>
                                <div className="email-date">{formatDateString(email.sentDate)}</div>
                                <button className='Delete-btn' onClick={(e) => handleDelete(e, email, dispatch, emails)}><DeleteIcon /></button>
                                <button className='star-btn' onClick={(e) => handleStarred(e, email, dispatch, emails)}><StarBorderIcon /></button>
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
    )
}