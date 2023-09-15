const { withFilter, PubSub } = require("graphql-subscriptions");
const { Message } = require("../models/Message")

const pubsub = new PubSub()

const messageResolver = {
    Query: {
        messageForUser: async (_, args, { context }) => {
            const { user } = context;
            const receiverId = args.input.receiverId
            if (!user) {
                throw new Error("you have to login")
            }
            const messages = await Message.find({
                $or: [
                    { senderId: user.id, receiverId: receiverId },
                    { senderId: receiverId, receiverId: user.id }
                ]
            })
            return messages;
        }
    },
    Mutation: {
        sendMessage: async (_, args, { context }) => {
            const { user } = context;
            const { receiverId, content } = args.input;
            const userMessage = new Message({
                senderId: user.id,
                receiverId,
                content
            })
            await pubsub.publish("newMessage", {
                newMessage: userMessage
            })
            await userMessage.save()
            return userMessage;
        }
    },
    Subscription: {
        newMessage: {
            subscribe: withFilter(
                () => pubsub.asyncIterator("newMessage"),
                (payload, variables = {}) => {
                    const { newMessage } = payload;
                    const { receiverId, authId } = variables.input
                    const isAuthUserSenderOrReceiver = (newMessage.receiverId === receiverId) && (newMessage.senderId === authId)
                    const isUserSenderOrReceiver = newMessage.receiverId === authId && newMessage.sendMessage === receiverId
                    return isAuthUserSenderOrReceiver || isUserSenderOrReceiver
                }
            )
        }
    }
}

module.exports = messageResolver;