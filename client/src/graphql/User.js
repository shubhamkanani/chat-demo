import { gql } from "@apollo/client";

const USER_FIELDS = gql`
    fragment UserFields on User {
        id
        email
        firstName
        lastName
        phoneNo
        createdAt
        updatedAt
    }
`

export const LOGIN = gql`
${USER_FIELDS}
    query UserLogin($input: UserLoginInput) {
        userLogin(input: $input) {
            token
            user {
                ...UserFields
            }
        }
    }
`

export const USER_AUTH = gql`
${USER_FIELDS}
    query UserAuth {
        userAuth {
            ...UserFields
        }
    }
`

export const GET_ALL_USERS = gql`
${USER_FIELDS}
    query GetAllUsers {
        getAllUsers {
            ...UserFields
        }
    }
`

export const USER_SIGNUP = gql`
${USER_FIELDS}
mutation UserSignUp($input: UserSignUpInput) {
    userSignUp(input: $input){
        ...UserFields
    }
  }
`