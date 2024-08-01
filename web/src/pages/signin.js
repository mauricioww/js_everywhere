import React, { useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';

import UserForm from '../components/UserForm';
import { SIGNIN_USER } from '../gql/mutation';

const SignIn = props => {
    
    useEffect( () => {
        document.title = 'Sign In - Notedly';
    });

    const client = useApolloClient();
    const [SignIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            console.log(data.signIn);
            localStorage.setItem('token', data.signIn);
            client.writeData({ data: { isLoggedIn: true } });
            props.history.push('/');
        }
    });

    return (
        <React.Fragment>
            <UserForm action={SignIn} formType="signIn">
                {loading && <p>Loading...</p>}
                {error && <p>Error sign in!</p>}
            </UserForm>
        </React.Fragment>
    );
    
};

export default SignIn;