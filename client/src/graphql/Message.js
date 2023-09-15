import { gql } from "@apollo/client";

const MESSAGE_FIELDS = gql`
    fragment MessageFields on Message {
        id
        content
        receiverId
        senderId
        createdAt
        updatedAt
    }
`

export const GET_MESSAGES = gql`
${MESSAGE_FIELDS}
    query MessageForUser($input: MessageForUserInput!) {
        messageForUser(input: $input) {
            ...MessageFields
        }
    }
`

export const SEND_MESSAGE = gql`
${MESSAGE_FIELDS}
    mutation SendMessage($input: SendMessageInput) {
        sendMessage(input: $input) {
            ...MessageFields
        }
    }
`

export const NEW_MESSAGE_SUBSCRIPTION = gql`
${MESSAGE_FIELDS}
    subscription NewMessage($input: NewMessageInput) {
        newMessage(input: $input) {
            ...MessageFields
        }
    }
`