import React from 'react';
import { View, Button, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useMutation, gql } from '@apollo/client'

import UseForm from '../components/UserForm';
import Loading from '../components/Loading';

const SIGNIN_USER = gql`
    mutation SignIn($email: String, $password: String!) {
        signIn(email: $email, password: $password)
    }
`;

const SignIn = props => {
    const storeToken = token => {
        SecureStore.setItemAsync('token', token).then(
            props.navigation.navigate('App')
        );
    };

    const [SignIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            console.log('User logged with token ' + data.signIn);
            storeToken(data.signIn);
        }
    });
    if(loading) return <Loading/>;
    return (
        <React.Fragment>
            {error && <Text>Error signin in!</Text>}
            <UseForm
                action={SignIn}
                formType="SignIn"
                navigation={props.navigation}
            />
        </React.Fragment>
    );
}


SignIn.navigationOptions = {
    title: 'Sign In',
    headerTitleStyle: {
        textAlign: "center",
        flex: 1
    }
};

export default SignIn;