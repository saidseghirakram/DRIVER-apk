import React from "react";
import {
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  View,
  Touchable,
  TextInput,
} from "react-native";

export default function Update({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.container_Pic}>
        <Image
          style={{ width: "95%", height: "95%", borderRadius: 100 }}
          source={require("./img/20230602225957__fpdl.in__illustration-du-concept-mise-niveau_114360-2298_medium__1_-removebg-preview.png")}
        />
      </View>
      <View style={styles.items}>
        <Text style={styles.title}>your last version</Text>
        <Text style={styles.Date}>18-05-2023</Text>
        <TouchableOpacity style={styles.Date}>
            <Text style={styles.Btn}>Update</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingHorizontal: 20,
    display: "flex",
  },
  container_Pic: {
    width: "100%",
    height: 300,
  },
  items:{
    marginTop:30,
    width:'100%',
    padding:10,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  title:{
    fontSize:30,
    fontWeight:'bold',
    color:'#84CAE2',
    marginBottom:10
  },
    Date:{
    fontSize:20,
    fontWeight:'bold',
    color:'gray',
    marginBottom:20
    },
    Btn:{
        fontSize:20,
        fontWeight:'bold', 
        color:'#fff',
        backgroundColor:'#84CAE2',
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:10,
        
    }
});
