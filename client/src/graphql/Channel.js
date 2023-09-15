import { gql } from "@apollo/client";

const CHANNEL_FIELDS = gql`
    fragment ChannelFields on Channel {
        id
        channelName
        createdAt
        updatedAt
    }
`

export const CREATE_CHANNEL = gql`
${CHANNEL_FIELDS}
    mutation CreateChannel($input: CreateChannelInput) {
        createChannel(input: $input) {
          ...ChannelFields
        }
    }
`