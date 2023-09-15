const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    content: String,
    senderId: String,
    receiverId: String
}, { timestamps: true })

const Message = mongoose.model("messages", MessageSchema)
module.exports = { Message }