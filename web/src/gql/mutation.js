import { gql } from '@apollo/client';

const SIGNIN_USER = gql`
    mutation SignIn($email: String, $password: String!) {
        signIn(email: $email, password: $password)
    }
`;

const SIGNUP_USER = gql`
    mutation SignUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

const EDIT_NOTE = gql`
    mutation UpdateNote($id: ID!, $content: String!) {
        updateNote(id: $id, content: $content) {
            id
            content
            createdAt
            favoriteCount
            favoritedBy {
                id
                username
            }
            author {
                id
                username
            }
        }
    }
`;

const NEW_NOTE = gql`
    mutation NewNote($content: String!) {
        newNote(content: $content) {
            id
            content
            createdAt
            favoriteCount
            favoritedBy {
                id
                username
            }
            author {
                username
                id
            }
        }
    }
`;

const DELETE_NOTE = gql`
    mutation DeleteNote($id: ID!) {
        deleteNote(id: $id) 
    }
`;

const TOGGLE_FAVORITE = gql`
    mutation ToggleFavorite($id: ID!) {
        toggleFavorite(id: $id) {
            id
            favoriteCount
        }
    }
`;

export {
    EDIT_NOTE,
    NEW_NOTE,
    SIGNIN_USER,
    SIGNUP_USER,
    DELETE_NOTE,
    TOGGLE_FAVORITE
};