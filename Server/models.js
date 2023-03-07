const mongoose = require("mongoose")

const Schema = mongoose.model

const Task = Schema('Task', {
    Product_Code: String,
    Product_title: String,
    Description: String,
    Price: Number,
    Quantity: Number,
})

module.exports = Task