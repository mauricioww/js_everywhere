import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';

const SIGNUP_USER = gql`
    mutation SignUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

const SignUp = props => {

    useEffect( () => {
        document.title = 'Sign Up - Notedly';
    });

    const client = useApolloClient();
    const [SignUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            console.log(data.signUp);
            localStorage.setItem('token', data.signUp); // JWT added to browser storage
            client.writeData({ data: { isLoggedIn: true } });
            props.history.push('/');
        }
    });

    return (
        <React.Fragment>
            <UserForm action={SignUp} formType="signup">
                {loading && <p>Loading...</p>}
                {error && <p>Error creating an account!</p>}
            </UserForm>
        </React.Fragment>
    );
};

export default SignUp;