import React from 'react';
import { Text } from 'react-native';
import { useQuery, gql } from '@apollo/client';

import Note from '../components/Note';
import Loading from '../components/Loading';

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

const NoteScreen = props => {
    const id = props.navigation.getParam('id');
    const { data, loading, error } = useQuery(GET_NOTE, { variables: { id } });
    if(loading) return  <Loading/>;
    if(error) return <Text>Error note query</Text>;
    return <Note note={data.note}/>
};

export default NoteScreen;