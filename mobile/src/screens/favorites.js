import React from 'react';
import { Text, View } from 'react-native';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import Loading from '../components/Loading';


const GET_MY_FAV = gql`
    query Me {
        me {
            id
            username,
            favorites {
                id,
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

const Favorites = () => {
    const { data, loading, error } = useQuery(GET_MY_FAV);
    if(loading) return <Loading/>;
    if(error) return <Text>Error loading notes</Text>;
    if(data.me.favorites.length !== 0){
        return <NoteFeed notes={data.me.favorites} navigation={props.navigation}/>
    } else {
        return <Text>No notes yet!</Text>
    }
};

Favorites.navigationOptions = {
    title: 'Favorites',
    headerTitleStyle: {
        textAlign: "center",
        flex: 1
    }
};

export default Favorites;