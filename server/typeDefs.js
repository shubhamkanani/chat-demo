const { gql } = require('apollo-server-express')

const typeDefs = gql`

    scalar Upload

    type Query {
        userLogin(input: UserLoginInput): LoginPayload
        userAuth: User
        getAllUsers: [User]
        messageForUser(input: MessageForUserInput!): [Message] 
        getChannelMessages(input: GetChannelMessagesInput): [ChannelMessage]
        greetings: String
    }


    type Mutation {
        userSignUp(input: UserSignUpInput): User
        sendMessage(input: SendMessageInput): Message!
        createChannel(input: CreateChannelInput): Channel
        sendMessageToChannel(input: SendMessageToChannelInput): ChannelMessage
        singleUpload(file: Upload!): SuccessMessage
        multipleUpload(file: [Upload]!): SuccessMessage
    }

    type Subscription {
        newMessage(input: NewMessageInput): Message
        newChannelMessage(input: NewChannelMessageInput): ChannelMessage
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String!
        phoneNo: String!
        email: String!
        password: String!
    }

    type Channel {
        id: ID!
        channelName: String!
    }

    type Message {
        id: ID!
        content: String!
        senderId: String!
        receiverId: String!
    }

    type ChannelMessage {
        id: ID!
        content: String!
        senderId: String!
    }


    type LoginPayload {
        user: User!
        token: String!
    }

    type SuccessMessage {
        message: String
    }

    input UserLoginInput {
        email: String!
        password: String!
    }
    
    input UserSignUpInput {
        firstName: String!
        lastName: String!
        phoneNo: String!
        email: String!
        password: String!
    }


    input SendMessageInput {
        content: String!
        receiverId: String!
    }

    input MessageForUserInput {
        receiverId: String!
    }

    input NewMessageInput {
        receiverId: String!
        authId: String!
    }

    input CreateChannelInput {
        channelName: String!
    }

    input GetChannelMessagesInput {
        channelId: String!
    }

    input SendMessageToChannelInput{
        content: String!
        channelId: String!
    }

    input NewChannelMessageInput {
        channelId: String!
    }

`

module.exports = typeDefs