const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && 
      !req.secure && 
      req.get('x-forwarded-proto') !== 'https') {
    const secureUrl = 'https://' + req.headers.host + req.url;
    return res.redirect(301, secureUrl);
  }
  next();
});

// Add security headers
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client')));

app.get('/', function (req, res) {
  console.log("HOMEPAGE");
  res.sendFile(path.join(__dirname, 'client', 'index.html')); 
});
app.get('/contact', function (req, res) {
  console.log("CONTACT");
  res.sendFile(path.join(__dirname, 'client', 'contact.html')); 
});
app.get('/rooms', function (req, res) {
  console.log("ROOMS");
  res.sendFile(path.join(__dirname, 'client', 'rooms.html')); 
});
app.get('/location', function (req, res) {
  console.log("LOCATION");
  res.sendFile(path.join(__dirname, 'client', 'location.html')); 
});
app.get('/rules', function (req, res) {
  console.log("RULES");
  res.sendFile(path.join(__dirname, 'client', 'rules.html')); 
});
app.listen(PORT, function() {
  console.log(`Server is running on port ${PORT}`);
});
// Import the necessary packages
const nodemailer = require('nodemailer');

// Create a transporter object
const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'Gmail'
  auth: {
    user: 'alexander21inn@gmail.com',
    pass: 'kfmi txwt xmfb ktvx',
  },
});

// ...

app.post('/contact-form-process', (req, res) => {
    const name = req.body.Name;
    const lastName = req.body.lastname;
    const email = req.body.Email;
    const contactNumber = req.body.contactnumber;
    const subject = req.body.subject;
    const mailOptions = {
    from: 'alexander21inn@gmail.com',
    to: 'barry.phasel235@gmail.com', // Replace with the recipient's email address
    subject: 'New form submission',
    text: `
      Name: ${name}
      Last Name: ${lastName}
      Email: ${email}
      Contact Number: ${contactNumber}
      Subject: ${subject}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Form submission successful');
    }
  });
});