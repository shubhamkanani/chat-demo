const { withFilter, PubSub } = require("graphql-subscriptions");
const { ChannelMessage } = require("../models/ChannelMessage")

const pubsub = new PubSub()


const channelMessageResolver = {
    Query: {
        getChannelMessages: async (_, args, { context }) => {
            const { user } = context;
            const { channelId } = args.input;
            if (!user) {
                throw new Error("you have to login")
            }
            const channelMessages = await ChannelMessage.find({channelId})
            return channelMessages;
        }
    },
    Mutation: {
        sendMessageToChannel: async (_, args, { context }) => {
            const { user } = context;
            const { channelId, content } = args.input;
            const userChannelMessage = new ChannelMessage({
                senderId: user.id,
                channelId,
                content
            })
            await pubsub.publish("newChannelMessage", {
                newChannelMessage: userChannelMessage
            })
            await userChannelMessage.save();
            return userChannelMessage;
        }
    },
    Subscription: {
        newChannelMessage: {
            subscribe: withFilter(
                () => pubsub.asyncIterator("newChannelMessage"),
                (payload, variables = {}) => {
                    const { newChannelMessage } = payload;
                    const { channelId } = variables.input
                    const isChannelOn = newChannelMessage.channelId === channelId
                    return isChannelOn  
                }
            )
        }
    }
}
module.exports = channelMessageResolver;