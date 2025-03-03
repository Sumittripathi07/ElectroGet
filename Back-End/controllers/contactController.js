require("dotenv").config();
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const Contact = require("../models/Contact");

const sendContactEmail = async (req, res) => {
  const { username, email, phone, message } = req.body;

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
      username,
      email,
      phone,
      message,
    });
    await newContact.save();

    // **1st Email: Notify Your Company**
    const companyMailOptions = {
      from: `"${username}" <${process.env.EMAIL_USER}>`, // Display sender's name but use your email
      to: process.env.EMAIL_USER,  // Send to your email
      subject: "New Contact Form Submission",
      text: `Name: ${username}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    // **2nd Email: Thank You Email to the User**
    const userMailOptions = {
      from: `"Electroget" <${process.env.EMAIL_USER}>`, // Company email
      to: email, // Send to user's email
      subject: "Thank You for Contacting Us",
      text: `Hi ${username},\n\nThank you for reaching out! We have received your message and will get back to you soon.\n\nBest regards,\nElectroget`,
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

module.exports = { sendContactEmail, getAllContacts };