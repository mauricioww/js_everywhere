import React from 'react';
import { View, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const Settings = props => {
    const signOut = () => {
        SecureStore.deleteItemAsync('token').then(
            props.navigation.navigate('Auth')
        );
    };
    return (
        <View>
            <Button title="Sign Out" onPress={signOut}/>
        </View>
    );
};

Settings.navigationOptions = {
    title: 'Settings',
    headerTitleStyle: {
        textAlign: "center",
        flex: 1
    }
}

export default Settings;