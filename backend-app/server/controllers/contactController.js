
const Contact = require('../models/contact');

exports.createContact = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();
    return res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while submitting the form.' });
  }
};
