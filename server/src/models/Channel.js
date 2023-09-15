const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
    channelName: String,
}, { timestamps: true })

const Channel = mongoose.model("channels", ChannelSchema)
module.exports = { Channel }