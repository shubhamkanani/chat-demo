const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNo: {
        type: String,
        maxLength: 10
    },
    email: {
        type: String,
        moinLength: 6,
        uniqe: true
    },
    password: String
}, { timestamps: true })

const User = mongoose.model("users", userSchema)
module.exports = { User }