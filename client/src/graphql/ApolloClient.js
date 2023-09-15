import { ApolloClient, InMemoryCache, ApolloProvider, gql, HttpLink, split } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";

import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from '@apollo/client/utilities';

const link = new HttpLink({
    uri: "http://localhost:8080/graphql"
    // Additional options
});

const wsLink = new GraphQLWsLink(
    createClient({
        url: "ws://localhost:8080/graphql",
    }),
);

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ""
        }
    }
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(link),
);

export const HELLO = gql`
    query Query {
        hello
    }
`

export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});