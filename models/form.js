const mongoose = require('mongoose');
const customerschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    message: [{
        type: String,
        required: true,
        minlength: 10
    }]
})

Customer = mongoose.model('customer', customerschema);
module.exports = Customer;