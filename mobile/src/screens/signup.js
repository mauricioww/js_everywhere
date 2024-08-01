import React from 'react';
import { Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useMutation, gql } from '@apollo/client';

import UserForm from '../components/UserForm';
import Loading from '../components/Loading';

const SIGNUP_USER = gql`
    mutation SignUp ($email: String!, $username: String!, $password: String!) {
            signUp(email: $email, username: $username, password: $password)
    }
`;

const SignUp = props => {
    const storeToken = token => {
        SecureStore.setItemAsync('token', token).then(
            props.navigation.navigate('App')
        )
    };

    const [SingUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            console.log('New user with token ' + data.signUp);
            storeToken(data.signUp);
        }
    })

    if(loading) return <Loading/>;
    return (
        <React.Fragment>
            {error && <Text>Error Siging In!</Text>}
            <UserForm
                action={SingUp}
                formType="SignUp"
                navigation={props.navigation}
            />
        </React.Fragment>
    )
}

SignUp.navigationOptions = {
    title: 'Register',
    headerTitleStyle: {
        textAlign: "center",
        flex: 1
    }
}

export default SignUp;