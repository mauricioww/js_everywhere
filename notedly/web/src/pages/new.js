import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import NoteForm from '../components/NoteForm';
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';
import { NEW_NOTE } from '../gql/mutation';

const NewNote = props => {
    useEffect(() => {
        document.title = 'New Note - Notedly';
    })

    const [NewNote, { loading, error }] = useMutation(NEW_NOTE, {
        refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
        onCompleted: data => {
            props.history.push(`note/${data.newNote.id}`);
        }
    });
    
    return (
        <React.Fragment>
            {loading && <p>Loading...</p>}
            {error && <p>Error saving note!</p>}
            <NoteForm action={NewNote}/>
        </React.Fragment>
    );
};

export default NewNote;