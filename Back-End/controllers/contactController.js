require("dotenv").config();
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const Contact = require("../models/Contact");

const sendContactEmail = async (req, res) => {
  const { email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false, // Force SSL connection
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Save contact form submission to the database
    const newContact = new Contact({
      email,
      phone,
      message,
    });
    await newContact.save();

    // **1st Email: Notify Your Company**
    const companyMailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_USER}>`, // Use a generic sender name
      to: process.env.EMAIL_USER,  // Send to your email
      subject: "New Contact Form Submission",
      text: `Email: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    // **2nd Email: Thank You Email to the User**
    const userMailOptions = {
      from: `"Electroget" <${process.env.EMAIL_USER}>`, // Company email
      to: email, // Send to user's email
      subject: "Thank You for Contacting Us",
      text: `Thank you for reaching out! We have received your message and will get back to you soon.\n\nBest regards,\nElectroget`,
    };

    // Send both emails
    await transporter.sendMail(companyMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(200).send("Emails sent successfully!");
  } catch (error) {
    res.status(500).send("Failed to send email: " + error.toString());
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).send("Failed to retrieve contacts: " + error.toString());
  }
};

// New function to update the resolution status of a contact query
const updateResolutionStatus = async (req, res) => {
  const { id } = req.params;
  const { isResolved } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid contact ID format" });
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { isResolved },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact query not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: "Failed to update contact query", error: error.toString() });
  }
};

// New function to get contact query by ID
const getContactById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid contact ID format" });
  }

  try {
    const contact = await Contact.findById(id);
    
    if (!contact) {
      return res.status(404).json({ message: "Contact query not found" });
    }
    
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contact query", error: error.toString() });
  }
};

module.exports = { 
  sendContactEmail, 
  getAllContacts,
  updateResolutionStatus,
  getContactById
};