import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { loginProcedure } from '../redux/authFunctions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser, setToken } from '../redux/stateActions';
import { useNavigation } from '@react-navigation/native'
import RadioButton from './RadioButton';


function AuthWrapper(props: { children: React.ReactNode, user: user, token: string }) {
    const navigation = useNavigation()

    const [hasAccount, sethasAccount] = useState<boolean>(true)

    const [phoneNumber, setPhoneNumber] = useState<string>()
    const [password, setPassword] = useState<string>()

    function loginButton(phoneNumber: string, password: string) {
        loginProcedure(phoneNumber, password)
    }

    if (props.user) {
        return <View>
            {props.children}
        </View>
    } else
        return (

            <View style={{ backgroundColor: 'white', padding: 10 }}>
                <Text style={{ fontSize: 35 }}>مرحباً</Text>

                <View style={{
                    margin: 20, borderWidth: 0.3, borderRadius: 10
                }}>

                    <View

                    >
                        <View style={{ padding: 15, borderTopRightRadius: 12, borderTopLeftRadius: 12, backgroundColor: hasAccount ? '#F6EDEB' : 'white', flexDirection: 'row', alignItems: 'center' }}>

                            <RadioButton onClick={() => sethasAccount(false)} selected={!hasAccount} />

                            <Text style={{
                                textAlign: 'center',
                                color: 'black',
                                padding: 10,
                                fontSize: 20,
                                fontWeight: 'bold',
                            }}>
                                تسجيل حساب في المتجر؟
                            </Text>

                        </View>
                        {
                            !hasAccount ? <View style={{ padding: 15 }}>
                                <View style={{ marginVertical: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>الإسم</Text>
                                    <TextInput
                                        style={{ borderWidth: 0.5, padding: 5, fontSize: 15, }}

                                        value={phoneNumber}
                                        keyboardType='phone-pad'
                                        onChangeText={setPhoneNumber}
                                    />
                                </View>
                                <View style={{ marginVertical: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>رقم الهاتف</Text>
                                    <TextInput
                                        style={{ borderWidth: 0.5, padding: 5, fontSize: 15, }}

                                        value={phoneNumber}
                                        keyboardType='phone-pad'
                                        onChangeText={setPhoneNumber}
                                    />
                                </View>
                                <View style={{ marginVertical: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>البريد الالكتروني</Text>
                                    <TextInput
                                        style={{ borderWidth: 0.5, padding: 5, fontSize: 15, }}

                                        value={phoneNumber}
                                        keyboardType='email-address'
                                        onChangeText={setPhoneNumber}
                                    />
                                </View>
                                <View style={{ marginVertical: 5 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>كلمة المرور</Text>
                                    <TextInput
                                        style={{ borderWidth: 0.5, padding: 5, fontSize: 15, }}
                                        textContentType='password'

                                        value={password}
                                        onChangeText={setPassword}
                                    />
                                </View>

                                <TouchableOpacity
                                    style={{ alignSelf: 'center', backgroundColor: '#f0c14b', borderColor: '#a8873', borderWidth: 0.5, height: 50, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                                    onPress={() => {
                                        // login(phoneNumber, password)
                                        // loginButton(phoneNumber, password)
                                    }
                                    }
                                >
                                    <Text style={{ color: '#111' }}>
                                        تسجيل
                                    </Text>
                                </TouchableOpacity>
                            </View> : null
                        }
                    </View>

                    <View style={{}}>

                        <View style={{ padding: 15, backgroundColor: hasAccount ? 'white' : '#F6EDEB', flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton onClick={() => sethasAccount(true)} selected={hasAccount} />

                            <Text style={{
                                textAlign: 'center',
                                color: 'black',
                                paddingHorizontal: 10,
                                fontSize: 20,
                                fontWeight: 'bold',
                            }}>
                                تسجيل الدخول. مسجل بالفعل كزبون
                            </Text>

                        </View>

                        {
                            hasAccount ? <View style={{ padding: 10 }}>
                                <View style={{ marginVertical: 5 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>رقم الهاتف</Text>
                                    <TextInput
                                        style={{ borderWidth: 0.5, padding: 5, fontSize: 15, }}
                                        value={phoneNumber}
                                        onChangeText={setPhoneNumber}
                                    />
                                </View>
                                <View style={{ marginVertical: 5 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>كلمة المرور</Text>
                                    <TextInput
                                        style={{ borderWidth: 0.5, padding: 5, fontSize: 15, }}
                                        value={password}
                                        onChangeText={setPassword}
                                    />
                                </View>

                                <TouchableOpacity
                                    style={{ alignSelf: 'center', backgroundColor: '#f0c14b', borderColor: '#a8873', borderWidth: 0.5, height: 50, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                                    onPress={() => {
                                        // login(phoneNumber, password)
                                        loginButton(phoneNumber, password)
                                    }
                                    }
                                >
                                    <Text style={{ color: '#111' }}>
                                        دخول
                                    </Text>
                                </TouchableOpacity>
                            </View> : null
                        }

                    </View>
                </View>


            </View>

        )
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