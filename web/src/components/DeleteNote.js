import React from 'react';
import { useMutation } from '@apollo/client';
import { withRouter } from 'react-router-dom';

import ButtonAsLink from './ButtonAsLink';
import { DELETE_NOTE } from '../gql/mutation';
import { GET_NOTES, GET_MY_NOTES } from '../gql/query';

const DeleteNote = props => {
    const [DeleteNote] = useMutation(DELETE_NOTE, {
        variables: {
            id: props.id
        },
        refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
        onCompleted: data => {
            props.history.push('/mynotes');
        }
    })
    return <ButtonAsLink onClick={DeleteNote}>Delete Note</ButtonAsLink>
}

export default withRouter(DeleteNote);