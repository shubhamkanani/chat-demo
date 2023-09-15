const { Channel } = require("../models/Channel")

const channelResolver = {
    Mutation: {
        createChannel: async(_, args) => {
            const { channelName } = args.input;
            const newChannel = new Channel({
                channelName
            }) 
            await newChannel.save()
            return newChannel;
        }
    }
}

module.exports = channelResolver;
