import React from 'react'
import { Pressable, Text } from 'react-native';
import { logoutProcedure } from '../redux/authFunctions';


export default function LogoutButton() {

    const logout = () => {
        logoutProcedure()
    }


    return <Pressable onPress={logout}>
        <Text>خروج</Text>
    </Pressable>
}
