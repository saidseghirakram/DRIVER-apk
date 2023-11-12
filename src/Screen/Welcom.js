import React, { useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View,Image, Text, ActivityIndicator, StyleSheet } from 'react-native';

const Welcome = () => {
  const navigation = useNavigation();
  useEffect(() => {
    // Simulating an asynchronous task
    const fakeAsyncTask = setTimeout(() => {
      navigation.navigate('MyTabs');
    }, 1500);

    return () => clearTimeout(fakeAsyncTask); // Clean up the timer on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      
      <Image source={require('../img/Welcom.jpg')} style={{width:'90%',height:300, resizeMode: "contain",}} />
      <Text style={styles.text}>Welcome</Text>
      <Image source={require('../img/Waves.png')} style={styles.img} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#fff"
  },
  text: {
    marginTop: 28,
    fontSize: 40,
    fontWeight: 'bold',
    color:'#84CAE2',
    marginBottom:100
  },
  img:{
    width:'100%',
    height:300,
    position:'absolute',
    bottom:-50,
    left:0
  }
});

export default Welcome;



