import React from 'react';
import { Text } from 'react-native';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import Loading from '../components/Loading';

const GET_NOTES = gql`
    query Notes {
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
`;

const Feed = props => {
    const { loading, error, data } = useQuery(GET_NOTES);
    if(loading) return <Loading/>;
    if(error) return <Text>Bullshit!!!!</Text>;
    return <NoteFeed notes={data.notes} navigation={props.navigation}/>;
};

Feed.navigationOptions = {
    title: 'Feed',
    headerTitleStyle: {
        textAlign: "center",
        flex: 1
    }
};

export default Feed;