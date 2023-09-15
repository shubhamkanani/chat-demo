import { gql } from "@apollo/client";

const CHANNEL_MESSAGE_FIELDS = gql`
    fragment ChannelMessageFiels on ChannelMessage {
        id
        content
        senderId
        channelId
        createdAt
        updatedAt
    }
`

export const GET_CHANNEL_MESSAGES = gql`
${CHANNEL_MESSAGE_FIELDS}
    query GetChannelMessages($input: GetChannelMessagesInput) {
        getChannelMessages(input: $input) {
            ...ChannelMessageFiels
        }
    }
`

export const SEND_MESSAGE_TO_CHANNEL = gql`
${CHANNEL_MESSAGE_FIELDS}
    mutation SendMessageToChannel($input: SendMessageToChannelInput) {
        sendMessageToChannel(input: $input) {
            ...ChannelMessageFiels
        }
    }
`

export const NEW_CHANNEL_MESSAGE_SUBSCRIPTION = gql`
${CHANNEL_MESSAGE_FIELDS}
subscription NewChannelMessage($input: NewChannelMessageInput) {
    newChannelMessage(input: $input) {
        ...ChannelMessageFiels
    }
  }
`
