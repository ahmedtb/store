import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { loginProcedure } from '../redux/authFunctions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser, setToken } from '../redux/stateActions';
import { useNavigation } from '@react-navigation/native'

function AuthWrapper(props: { children: React.ReactNode, user: user }) {
    const navigation = useNavigation()

    const [phoneNumber, setPhoneNumber] = useState<string>()
    const [password, setPassword] = useState<string>()

    function loginButton(phoneNumber: string, password: string) {
        loginProcedure(phoneNumber, password)
    }

    if (props.user)
        return <div>
            {props.children}
        </div>
    else
        return (

            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{
                        textAlign: 'center',
                        color: 'black',
                        padding: 10,
                        fontSize: 20,
                        fontWeight: 'bold',
                        borderBottomWidth: 1
                    }}>
                        يرجى تسجيل الدخول
                    </Text>

                </View>


                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <Text style={{ fontSize: 20 }}>رقم الهاتف</Text>
                    <TextInput
                        style={{ flex: 1 }}
                        value={phoneNumber}
                        keyboardType='phone-pad'
                        onChangeText={setPhoneNumber}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 20 }}>كلمة المرور</Text>
                    <TextInput
                        style={{ flex: 1 }}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <TouchableOpacity
                    style={{ alignSelf: 'center', backgroundColor: 'red', height: 50, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                    onPress={() => {
                        // login(phoneNumber, password)
                        loginButton(phoneNumber, password)
                    }
                    }
                >
                    <Text style={{ color: 'white' }}>
                        دخول
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ alignSelf: 'center', backgroundColor: 'red', height: 50, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                    onPress={() => {

                    }}
                >
                    <Text style={{ color: 'white' }}>
                        تسجيل حساب
                    </Text>
                </TouchableOpacity>


            </View>

        )
}



const mapStateToProps = (state: { state: storeState }) => {
    return {
        user: state.state.user
    }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setUser,
        setToken
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);

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