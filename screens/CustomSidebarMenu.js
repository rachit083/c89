import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image} from "react-native";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import { DrawerContentScrollView,DrawerItemList } from "@react-navigation/drawer";

export default class Logout extends Component {
    constructor(props){
        super(props)
        this.state={
            light_theme: true
        }
    }
  componentDidMount() {
    let theme;
    firebase
        .database()
        .ref("/users/"+ firebase.auth().currentUser.uid)
        .on("value" , function(snapshot){
            theme= snapshot.val().current_theme
        })
        this.setState({light_theme:theme=== "light"})
    
  }
  render() {
    return (
      <View style={styles.container}>
        <Image 
        source={require("../assets/logo.png")}
        style= {styles.sideMenuProfileIcon}>

        </Image>
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props}/>
        </DrawerContentScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: this.state.light_theme ? "white" : "#15193c"
    },
  sideMenuProfileIcon: {
   width: RFValue(140),
   height: RFValue(140),
   borderRadius:RFValue(70),
   alignSelf:"center",
   marginTop: RFValue(60),
   resizeMode:"contain"
  }
});
