const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Customer = require("../models/form");
const nodemailer = require('nodemailer');
const sendgrid = require('nodemailer-sendgrid-transport');
require('dotenv').config();

const transporter = nodemailer.createTransport(sendgrid({
    auth: {
        api_key: process.env.api_key
    }
}));

router.post("/", async(req, res) => {
    let customer = await Customer.findOne({ email: req.body.email });
    const text = `Email: ${req.body.email}, Phone: ${req.body.phone}, Name: ${req.body.name}, Message: ${req.body.message}`;
    const user = ` ${req.body.email}`;
    if (customer) {
        customer.message.push(req.body.message);
    } else {
        customer = new Customer({
            email: req.body.email,
            name: req.body.name,
            phone: req.body.phone,
            message: req.body.message
        });
    }
    try {
        await customer.save();
    } catch (ex) {
        console.log(ex);
    }
    sendmail(text);
    customermail(user);
    res.redirect('/');
})
const sendmail = (data) => {
    const mailoptions = {
        from: "magictray.in@gmail.com",
        to: "magictray.in@gmail.com",
        subject: "new customer request",
        text: data
    };
    transporter.sendMail(mailoptions, (err, data) => {
        if (err)
            console.log(err)
    });
}
const customermail = (user) => {
    const mailoptions = {
        from: "magictray.in@gmail.com",
        to: user,
        subject: "Order successfully placed",
        text: "Thanks for placing the order we will contact you soon"
    };
    transporter.sendMail(mailoptions, (err, data) => {
        if (err)
            console.log(err)
    });
}
module.exports = router;