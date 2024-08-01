import { gql } from '@apollo/client';

const GET_NOTES = gql`
    query NoteFeed($cursor: String) {
        noteFeed(cursor: $cursor) {
            cursor
            hasNextPage
            notes {
                id
                createdAt
                content
                favoriteCount
                author {
                    username
                    id
                    avatar
                }
            }
        }
    }
`;

const GET_NOTE = gql`
    query Note($id: ID!) {
        note(id: $id) {
            id
            createdAt
            content
            favoriteCount
            author {
                username
                id
                avatar
            }
        }
    }
`;

const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

// author field can be omitted
const GET_MY_NOTES = gql`
    query Me {
        me {
            id
            username
            notes {
                id
                content
                createdAt
                favoriteCount
                author { 
                    username
                    id
                    avatar
                }
            }
        }
    }
`;

const GET_MY_FAVORITES = gql`
    query Me {
        me {
            id
            username
            favorites {
                id
                createdAt
                content
                favoriteCount
                author {
                    username
                    id
                    avatar
                }
            }
        }
    }
`;

const GET_ME = gql`
    query Me {
        me {
            id
            favorites {
                id
            }
        }
    }
`;

export { 
    GET_NOTES, 
    GET_NOTE, 
    GET_MY_NOTES, 
    GET_MY_FAVORITES,
    GET_ME,
    IS_LOGGED_IN
};