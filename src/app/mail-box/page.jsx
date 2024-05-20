import React from 'react';
import DefaultLayout from '../Layouts/DefaultLayout';

const Mailbox = () => {
    return (
        <DefaultLayout className='default-layout'>
            <div className='backimage'>
                <img src='/mailLogo.webp' alt='Background Logo' width={150} />
                <h2>Wlecome To MaiL-BoX Service</h2>
                <h5>Only for Display</h5>
                <p>Download our app from Playstore for Free.</p>
                <button>Go To Playstore</button>
            </div>
        </DefaultLayout>
    );
}

export default Mailbox;
