const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const ChannelMessageSchema = new Schema({
    content: String,
    senderId: String,
    channelId: String
}, { timestamps: true })

const ChannelMessage = mongoose.model("channel_messages", ChannelMessageSchema)
module.exports = { ChannelMessage }