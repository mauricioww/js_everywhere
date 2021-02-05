import React from 'react';
import { ImagePropTypes, Text, View } from 'react-native';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import Loading from '../components/Loading';

const GET_MY_NOTES = gql`
    query Me {
        me {
            id
            username,
            notes {
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

const MyNotes = () => {
    const { data, loading, error } = useQuery(GET_MY_NOTES);
    if(loading) return <Loading/>;
    if(error) return <Text>Error Loading Notes</Text>;
    if(data.me.notes.length !== 0){
        return <NoteFeed notes={data.me.notes} navigation={props.navigation}/>
    } else {
        return <Text>No notes yet!</Text>
    }
};

MyNotes.navigationOptions = {
    title: 'My Notes',
    headerTitleStyle: {
        textAlign: "center",
        flex: 1
    }
};

export default MyNotes;