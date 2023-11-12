import React from "react";
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


const GetStartedPage = () => {
    const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('Info');
  };

  return (
    <View style={styles.container}>
      <Image source={require("../img/logoApp/Capture_d_écran_2023-05-25_232646-removebg-preview.png")} style={styles.logo} />
      <Text style={styles.appName}>Driver</Text>
      <TouchableOpacity style={styles.btn}  onPress={handleGetStarted}>
        <Text>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#fff"
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 30,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  btn:{
    backgroundColor:'#84CAE2',
    width:'50%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height:60,
    borderRadius:100
  }
});

export default GetStartedPage;
