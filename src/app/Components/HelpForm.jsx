"use client"
import React, { useState } from 'react';

function HelpForm({onClose}) {
    const [email, setEmail] = useState('');
    const [query, setQuery] = useState('');

    const handleSubmit = (event) => {
        // event.preventDefault();
        // // Here you can implement your logic to handle the form submission
        // console.log('Form submitted with email:', email);
        // console.log('Query submitted:', query);
        // // Reset the email and query fields after submission
        // setEmail('');
        // setQuery('');
    };

    return (
        <div className="backdrop">
            <div className="form-container">
                <h2>Help Form</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="query">Type Query:</label>
                        <input
                            type="text"
                            id="query"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                    <button onClick={onClose}>Close</button>
                </form>
            </div>
        </div >
    );
}

export default HelpForm;
