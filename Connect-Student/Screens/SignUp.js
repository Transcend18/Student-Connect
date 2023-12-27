import { useCallback, useState } from "react";
import { View, Text, SafeAreaView, ActivityIndicator, ScrollView, Image, Alert, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import styles from "../All_Styles/LoginStyle";
import { auth, db } from "../Firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
const headerImage = require('../Images/backImage.png')

export default function SignUp(){
    const [firstname, setFirstname] = useState("")
    const [middlename, setMiddlename] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [matric, setMatric] = useState('')
    const [phone, setPhone] = useState('')
    const [animation, setAnimation] = useState(false)

    const navigation = useNavigation()

    async function CreateUser(){
        await setAnimation(true)
        if ((firstname.length, middlename.length, lastname.length, 
            email.length, password.length, matric.length, phone.length) == 0){
                await setTimeout(() => {
                    setAnimation(animation)
                    Alert.alert("Failed", "Complete all fields", [{
                        text: 'Retry'
                    }])
                }, 5000);
        } else {
            await addDoc(collection(db, 'Users'), {
                Firstname: firstname,
                Middlename: middlename,
                Lastname: lastname,
                Email: email,
                Password: password,
                Matric: matric,
                Phone: phone
            })
            .then(() => {
                createUserWithEmailAndPassword(auth, email, password)
                .then(onAuthStateChanged(auth, (user) => {
                    const userUid = user.uid
                    setTimeout(() => {
                        setAnimation(false)
                        Alert.alert("Success", "Login Successful", [{
                            text: 'Ok',
                            onPress: () => {
                                navigation.navigate("Users", {
                                    id: userUid,
                                    Fname: firstname,
                                    Mname: middlename,
                                    Lname: lastname,
                                    Email: email,
                                    MatNo: matric,
                                    Pnumber: phone  
                                })}
                        }])
                    }, 5000);
                    console.log(route)
                })).catch((e) => Alert.alert("Failed", "Unable to authenticate user", [{
                    text: 'Retry'
                }]))
            }).catch((e) => {
                Alert.alert("Failed", "Unable to create user account", [{
                    text: 'Retry',
                }])
                
            })
        }
    }
    const backToLogin = useCallback(() => {
        navigation.navigate("Login")
    })
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView alwaysBounceHorizontal>
                <View style={{flex: 1, backgroundColor: '#FAF0E4'}}>
                    <Image source={headerImage} style={{height: 350, width: 500}} resizeMode="stretch"/>
                    <View style={{paddingHorizontal: 20, position: 'relative', top: -100, 
                        backgroundColor: '#FAF0E4', borderTopLeftRadius: 100}}>
                        <Text style={{fontSize: 36, alignSelf: 'center', color: '#EE7214', 
                                fontWeight: 900, marginVertical: 30}}>Create an account</Text>
                        <TextInput
                        style={{marginBottom: 30, backgroundColor: '#EEE2DE'}}
                        label={'Firstname'}
                        value={firstname}
                        onChangeText={(text) => setFirstname(text)}
                        />
                        <TextInput
                        style={{marginBottom: 30, backgroundColor: '#EEE2DE'}}
                        label={'Middlename'}
                        value={middlename}
                        onChangeText={(text) => setMiddlename(text)}
                        />
                        <TextInput
                        style={{marginBottom: 30, backgroundColor: '#EEE2DE'}}
                        label={'Lastname'}
                        value={lastname}
                        onChangeText={(text) => setLastname(text)}
                        />
                        <TextInput
                        style={{marginBottom: 30, backgroundColor: '#EEE2DE'}}
                        label={'Email'}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                        />
                        <TextInput
                        style={{marginBottom: 30, backgroundColor: '#EEE2DE'}}
                        label={'Password'}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                        />
                        <TextInput
                        style={{marginBottom: 30, backgroundColor: '#EEE2DE'}}
                        label={'Matric'}
                        value={matric}
                        onChangeText={(text) => setMatric(text)}
                        />
                        <TextInput
                        style={{marginBottom: 30, backgroundColor: '#EEE2DE'}}
                        label={'Phone'}
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                        />
                       <TouchableOpacity 
                            style={{marginBottom: 30}}
                            onPress={CreateUser}
                            >
                            <View style={{backgroundColor: '#EE7214', height: 50, justifyContent: 'center', 
                                borderRadius: 30, flexDirection: 'row'}}>
                                <ActivityIndicator
                                color={'white'}
                                animating={animation}
                                size={25}
                                />
                                <Text style={{alignSelf: 'center', color: 'white', fontSize: 20, fontWeight: 800}}>Sign Up</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <Text style={{fontSize: 17}}>Already have an account? </Text>
                            <TouchableOpacity
                            onPress={backToLogin}
                            >
                                <Text style={{color: '#994D1C', fontWeight: 500, fontSize: 17}}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}