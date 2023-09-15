const userResolver = require("./userResolver")
const messageResolver = require("./messageResolver")
const channelResolver = require("./channelResolver")
const channelMessageResolver = require("./channelMessageResolver")
const uploadResolver = require("./uploadResolver")
const customResolvers = require("./customResolvers")


module.exports = {
    Query: {
        ...userResolver.Query,
        ...messageResolver.Query,
        ...channelMessageResolver.Query,
        ...uploadResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation,
        ...messageResolver.Mutation,
        ...channelResolver.Mutation,
        ...channelMessageResolver.Mutation,
        ...uploadResolver.Mutation
    },
    Subscription: {
        ...messageResolver.Subscription,
        ...channelMessageResolver.Subscription

    },
    Upload: {
        ...customResolvers.Upload
    }
}

