const http = require("http")
const express = require('express')
const { ApolloServer } = require("apollo-server-express")
const { WebSocketServer } = require("ws")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const { useServer } = require("graphql-ws/lib/use/ws")
const context = require("./middleware/auth")
const {graphqlUploadExpress} = require("graphql-upload");



const dotenv = require("dotenv")
const cors = require("cors")
const typeDefs = require("../typeDefs")
const resolvers = require("./resolvers")
const mongoose = require("mongoose")


dotenv.config()
const app = express()
app.use(cors())

const port = process.env.PORT || 8080
const httpServer = http.createServer(app)

const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql"
})

mongoose.connect(process.env.MONGODB_LOCAL_URL)

const schema = makeExecutableSchema({ typeDefs, resolvers })

const server = new ApolloServer({
    schema,
    context: context
})
const main = async () => {
    app.use(graphqlUploadExpress());
    useServer({ schema }, wsServer)
    await server.start()
    server.applyMiddleware({ app })
    httpServer.listen({ port: port }, () => {
        console.log(`server started at http://localhost:${port}${server.graphqlPath}`)
    })
}

main()