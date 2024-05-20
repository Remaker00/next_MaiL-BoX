import axios from "axios";
import { setEmails } from '../lib/inboxSlice';

export const fetchEmails = async (url, dispatch, setLoading) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: token,
            },
        });
        dispatch(setEmails(response.data.receivedEmails || response.data.sentEmails || response.data.starredEmails));
    } catch (error) {
        console.error('Failed to fetch email data:', error);
    } finally {
        setLoading(false);
    }
};


export const handleDelete = async (e, email, dispatch, emails) => {
    e.stopPropagation();
    try {
        const response = await axios.delete(`https://next-mail-backend.vercel.app/mail/deletemail/${email._id}`);
        if (response.status === 200) {
            const update = emails.filter((e) => e._id !== email._id);

            dispatch(setEmails(update));
        } else {
            alert('Failed to delete email');
        }
    } catch (error) {
        alert('An error occurred while deleting the email:', error);
    }
};


export const handleStarred = async (e, email, dispatch, emails) => {
    e.stopPropagation();
    try {
        const response = await axios.post(`https://next-mail-backend.vercel.app/mail/star_mail/${email._id}`);
        if (response.status === 200) {
            console.log('Email Starred successfully');
            const update = emails.filter((e) => e._id !== email._id);
            dispatch(setEmails(update));
        } else {
            alert('Failed to Starred email');
        }
    } catch (error) {
        console.log(error);
        alert('Failed to Starred email:', error);
    }
};


// export const handleSearch = (query, setEmails, emails) => {
//     const filteredResults = emails.filter(result =>
//         result.subject.toLowerCase().includes(query.toLowerCase()) ||
//         result.description.toLowerCase().includes(query.toLowerCase()) ||
//         result.sender_mail.toLowerCase().includes(query.toLowerCase())
//     );
//     setEmails(filteredResults);
// };


export const formatDateString = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString();
};
