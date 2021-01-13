import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';

const SIGNIN_USER = gql`
    mutation SignIn($email: String, $password: String!) {
        signIn(email: $email, password: $password)
    }
`;

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