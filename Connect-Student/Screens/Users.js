import { useRoute } from "@react-navigation/native";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, View, Text, Image, StatusBar, TouchableOpacity } from "react-native";
import { auth, db } from "../Firebase/firebase";


export default function Users() {
    {/*Trying to get user data from the firebase */}
    const [user, setUser] = useState([])
    const route = useRoute()
    
    const handleUsergetDATA = async () => {
        const q = query(collection(db, "User"));

        const onSnapShot = await getDocs(q)
        onSnapShot.forEach( (doc) => {
            const {firstname} = doc.data()
            user.push({
                id: doc.id,
                firstname
                
            })
        })
        setUser(user)
        console.log(user)
        
    }

    const data = [
        {
            id: 2,
            Avatar: <Image source={require("../Images/LoginBackground.jpg")} 
            style={{height: 70, width: 70, borderRadius: 70}}/>,
            Username: "James michael"
        }
    ]
    return (
        <View style={{flex: 1, backgroundColor: '#FAF0E4', paddingHorizontal: 5, paddingVertical: StatusBar.currentHeight + 20}}>
            <FlatList
            data={data}
            renderItem={(items) => (
                <TouchableOpacity onPress={handleUsergetDATA}>
                    <View style={{flexDirection: "row", justifyContent: 'space-evenly', 
                    paddingRight: 130, paddingLeft: 10, marginBottom: 30}}>
                        {items.item.Avatar}
                        <View style={{alignItems: 'center', justifyContent: 'center', paddingLeft: 20}}>
                            <Text style={{fontSize: 22}}>{items.item.Username}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
            key={(item) => item.id}
            />
        </View>
    )
}