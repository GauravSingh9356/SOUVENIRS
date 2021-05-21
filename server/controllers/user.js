const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const createToken = (result) => {
  const emailToken = crypto.randomBytes(32).toString('hex');

  result.emailToken = emailToken;
  result.save();

  // console.log(emailToken, result.emailToken);

  return emailToken;
};

const sendEmail = async (options) => {
  //1. Craete transposter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gauravsingh9356me@gmail.com',
      pass: '#gauravsingh9356',
    },
  });

  // define mailOptions

  const mailOptions = {
    from: 'Souvenirs <gauravsingh9356me@gmail.com>',
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  //send the email
  // console.log('in send emailer');

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({ message: 'User does not exist' });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.json({ message: "Password Doesn't match!" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      'UNIQUEKEYFORMEMORIESPROOJECT',
      { expiresIn: '1h' }
    );
    res.status(200).json({ result: existingUser, token: token });
  } catch (error) {
    res.json({ message: 'Something went wrong!' });
  }
};

const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName, confirmPassword } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.json({ message: 'User already exist!. Please signIn.' });
    }
    if (password != confirmPassword) {
      return res.json({ message: "Password didn't match." });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const emailToken = createToken(result);
    console.log(result, emailToken);

    const url = `${req.protocol}://${req.get(
      'host'
    )}/users/verifyEmail/${emailToken}`;

    const message = `<h2>Thanks ${result.name} for joining to Souvenirs!</h2>.<p>Please verify your email by clicking on this link ${url}</p>. <h4>Gaurav Singh</h4><p>Souvenirs 2021</p>`;

    // console.log('beforree sending email');
    await sendEmail({
      email: result.email,
      subject: 'This is email Confirmation message from Souvenirs!',
      message,
    });
    // console.log('Email sent successfully', ans);

    const token = jwt.sign(
      { email: result.email, id: result._id },
      'UNIQUEKEYFORMEMORIESPROOJECT',
      { expiresIn: '1h' }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    res.json({ message: 'Something went wrong!' });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    console.log(token + 'line 124');
    const user = await User.findOne({ emailToken: `${token}` });
    console.log(user);
    if (user) {
      const message = `<h2>Congratulations! ${user.name}. Thanks for joining to Souvenirs!</h2>. <p>Create your posts, Read and Share with your friends!</p><h4>Gaurav Singh</h4><p>Souvenirs 2021</p>`;
      await sendEmail({
        email: user.email,
        subject: 'This is Email Verification Success message from Souvenirs!',
        message,
      });
    }
    res.redirect('https://memoriesbygs.netlify.app');
  } catch (error) {
    console.log('here ' + error);
  }
};

module.exports = {
  signin,
  signup,
  verifyEmail,
};
