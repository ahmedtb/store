import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { loginProcedure } from '../redux/authFunctions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser, setToken } from '../redux/stateActions';
import { useNavigation } from '@react-navigation/native'
import RadioButton from './RadioButton';


function LoggedIn(props: { children: React.ReactNode, user: user, token: string }) {

    if (props.user) {
        return <View>
            {props.children}
        </View>
    } else
        return null
}



const mapStateToProps = (state: { state: storeState }) => {
    return {
        user: state.state.user,
        token: state.state.token

    }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setUser,
        setToken
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn);

const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.9)',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#b2a9a7",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});