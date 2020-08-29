const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true
    },
    Author: {
        type: String,
        required: true,
    }
})


module.exports = mongoose.model("Book", booksSchema);