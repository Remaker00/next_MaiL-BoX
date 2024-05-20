const Mail = require('../model/mail');
const User = require('../model/user');

exports.addmail = async (req, res) => {
    try {
        const sender_mail = req.user.email;
        const { email, subject, description } = req.body;
        const existingMail = await User.findOne({ email });

        if (!existingMail) {
            return res.status(404).json({ error: "Email doesn't exist" });
        }
        const newMail = new Mail({
            sender_mail,
            email,
            subject,
            description,
        });
        const savedMail = await newMail.save();

        return res.status(200).json({ message: 'Email sent successfully', email: savedMail });

    } catch (error) {
        console.error('Error adding mail:', error);
        return res.status(500).json({ message: 'Failed to send email' });
    }
};

exports.receivedmail = async (req, res) => {
    try {
        const email = req.user.email;
        const receivedEmails = await Mail.find({ email, starred: { $ne: true } });

        const unreadmail = await Mail.find({ read: false });
        const unreadCount = unreadmail.length-1;

        return res.status(200).json({ receivedEmails, unreadCount });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve received emails' });
    }
}

exports.getstarmail = async (req, res) => {
    try {
        const email = req.user.email;
        const starredEmails = await Mail.find({ email, starred: { $ne: false } });

        return res.status(200).json({ starredEmails });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve received emails' });
    }
}

exports.sentmail = async (req, res) => {
    try {
        const email = req.user.email;
        const sentEmails = await Mail.find({ sender_mail: email });

        return res.status(200).json({ sentEmails });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve received emails' });
    }

}

exports.markedmail = async (req, res) => {
    try {
        const emailId = req.params.id;
        const email = await Mail.findById(emailId);

        if (!email) {
            return res.status(404).json({ message: 'Email not found' });
        }

        email.read = true;
        await email.save();

        return res.status(200).json({ message: 'Email marked as read' });
    } catch (error) {
        console.error('Failed to mark email as read:', error);
        return res.status(500).json({ error: 'Failed to mark email as read' });
    }
}

exports.starmail = async (req, res) => {
    try {
        const emailId = req.params.id;
        const email = await Mail.findById(emailId);

        if (!email) {
            return res.status(404).json({ message: 'Email not found' });
        }

        email.starred = !email.starred;
        await email.save();

        const message = email.starred ? 'Email marked as Starred' : 'Email unmarked as Starred';
        return res.status(200).json({ message: 'Email marked as Starred' });
    } catch (error) {
        console.error('Failed to mark email as Starred:', error);
        return res.status(500).json({ error: 'Failed to mark email as Starred' });
    }
}

exports.deletemail = async (req, res) => {
    const emailId = req.params.id;

    try {
        const deletedEmail = await Mail.findByIdAndDelete(emailId);

        if (!deletedEmail) {
            return res.status(404).json({ message: 'Email not found' });
        }

        return res.status(200).json({ message: 'Email deleted successfully' });
    } catch (error) {
        console.error('Error deleting email:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

}