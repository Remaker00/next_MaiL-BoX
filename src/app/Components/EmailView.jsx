import React from 'react';

const EmailView = ({ selectedEmail, onClose }) => {
    return (
        <div className='email-list2'>
            <div className="email-view">
                <div className="date">{selectedEmail.sentDate}</div>
                <div className="sender">{selectedEmail.sender_mail}</div>
                <div className="subject">
                    <label>Subject:</label>
                    {selectedEmail.subject}
                </div>
                <div className="message">{selectedEmail.description}</div>
                <button onClick={onClose}>Close</button>
            </div>
        </div >
    );
};

export default EmailView;