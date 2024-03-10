const express = require('express');
const router = express.Router();
const Offer = require('../models/offerSchema');
const nodemailer = require('nodemailer');

// Route to create a new coupon
router.post('/createOffer', async (req, res) => {
  try {
    // Destructure request body to extract necessary fields
    const { title, description, discount, isActive } = req.body;

    // Create a new offer object
    const newOffer = new Offer({
      title,
      description,
      discount,
      isActive
    });

    // Save the offer to the database
    const savedOffer = await newOffer.save();

    res.status(201).json(savedOffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/mailOffers', async (req, res) => {
    try {
      // Get email address from request body
      const { email } = req.body;
  
      // Fetch all available offers
      const offers = await Offer.find({ isActive: true });
  
      if (offers.length === 0) {
        return res.status(404).json({ message: 'No active offers available' });
      }
  
      // Compose email body with offer details
      let emailBody = 'Available Offers:\n\n';
      offers.forEach(offer => {
        emailBody += `Title: ${offer.title}\n`;
        emailBody += `Description: ${offer.description}\n`;
        emailBody += `Discount: ${offer.discount}%\n\n`;
      });
  
      // Set up Nodemailer transporter
      const transporter = nodemailer.createTransport({
        // You need to provide your email service credentials here
        service: 'gmail', // e.g., 'gmail'
        auth: {
          user: 'dishashar121ma@gmail.com',
          pass: 'cjze fwmr mioy sxac'
        }
      });
  
      // Define mail options
      const mailOptions = {
        from: 'dishashar121ma@gmail.com',
        to: email,
        subject: 'Available Offers',
        text: emailBody
      };
  
      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: 'Failed to send email' });
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({ message: 'Email sent successfully' });
        }
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

module.exports = router;
