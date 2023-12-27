import {View, Image, 
    Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native";
import styles from "../All_Styles/LoginStyle";
import { TextInput } from "react-native-paper";
import { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { useNavigation } from "@react-navigation/native";
const headerImage = require('../Images/backImage.png')

export default function LoginScreen() {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [animation, setAnimation] = useState(false)

    async function loginUser(){
        await setAnimation(true)
        await signInWithEmailAndPassword(auth, email, password)
        .then(onAuthStateChanged(auth, (user) => {
            const Userid = user.uid
            setTimeout(() => {
                setAnimation(animation);
                Alert.alert("Success", "Login completed successfully", [{
                    text: "Continue",
                    onPress: () => {
                        navigation.navigate("Users", {
                            id: Userid
                        })
                    }
                }])
                
            }, 5000);
        })).catch((e) => {
            Alert.alert("Failed", `The following error has occurred ${e}`, [{
                text: 'Retry'
            }])
        })
    }

    const gotoSignUp = useCallback(() => {
        navigation.navigate("SignUp")
    })

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1, backgroundColor: "#FAF0E4"}}>
                <View>
                    <Image
                        source={headerImage}
                        resizeMode="stretch"
                        style={{height: 350, width: 500}}
                    />
                    <View style={{backgroundColor: '#FAF0E4', 
                        position: 'absolute', width: "100%", marginTop: "60%", paddingHorizontal: 10, 
                        borderTopLeftRadius: 100}}>
                        <View style={{marginTop: 30, marginHorizontal: 10}}>
                            <Text style={{fontSize: 36, alignSelf: 'center', color: '#EE7214', 
                                fontWeight: 900, marginBottom: 40}}>Login</Text>
                            <TextInput
                                style={{marginBottom: 40, backgroundColor: '#EEE2DE'}}
                                keyboardType="email-address"
                                label={"Email"}
                                value={email}
                                onChangeText={(emailText) => setEmail(emailText)}
                            />
                            <TextInput
                                style={{marginBottom: 40, backgroundColor: '#EEE2DE'}}
                                secureTextEntry
                                label={"Password"}
                                value={password}
                                onChangeText={(passwordText)=> setPassword(passwordText)}
                                right={<TextInput.Icon icon={"eye"}/>}
                            />
                            <TouchableOpacity 
                                onPress={loginUser}
                                style={{marginBottom: 40}}>
                                <View style={{backgroundColor: '#EE7214', height: 50, justifyContent: 'center', 
                                    borderRadius: 30, flexDirection: 'row'}}>
                                    <ActivityIndicator
                                    color={'white'}
                                    animating={animation}
                                    size={25}
                                    />
                                    <Text style={{alignSelf: 'center', color: 'white', fontSize: 20, fontWeight: 800}}>Login</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <Text style={{fontSize: 17}}>Don't have an account? </Text>
                                <TouchableOpacity onPress={gotoSignUp}>
                                    <Text style={{color: '#994D1C', fontWeight: 500, fontSize: 17}}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}