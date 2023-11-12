import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const CustomBottomBar = () => {
  const navigation = useNavigation();
  const [activeIcon, setActiveIcon] = useState("Home"); // state variable to keep track of the active icon

  const handleIconPress = (iconName) => {
    setActiveIcon(iconName); // set the active icon
    navigation.navigate(iconName); // navigate to the screen
  };

  return (
    <View style={styles.all}>
      <TouchableOpacity
        style={[styles.icon, activeIcon === "Home" && styles.activeIcon]} // apply active style if activeIcon is "Home"
        onPress={() => handleIconPress("Home")}
      >
        <MaterialIcons name="home" size={35}  color={activeIcon === "Home" ? "#84CAE2" : "#B1BDC5"} />
        <Text style={[{ color: activeIcon === "Home" ? "#84CAE2" : "#B1BDC5" },{fontWeight:'bold'},{fontSize:15}]}>Home</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={[styles.icon, activeIcon === "Map" ]} // apply active style if activeIcon is "Map"
        onPress={() => handleIconPress("Map")}
      >
        <MaterialIcons name="place" size={35}  color={activeIcon === "Map" ? "#84CAE2" : "#B1BDC5"} />
        <Text style={[{ color: activeIcon === "Map" ? "#84CAE2" : "#B1BDC5" },{fontWeight:'bold'},{fontSize:15}]}>Map</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={[styles.icon, activeIcon === "Account"]} // apply active style if activeIcon is "Account"
        onPress={() => handleIconPress("profile")}
      >
        
                <MaterialIcons name="person" size={35}  color={activeIcon === "profile" ? "#84CAE2" : "#B1BDC5"} />
                <Text style={[{ color: activeIcon === "profile" ? "#84CAE2" : "#B1BDC5" } ,{fontWeight:'bold'},{fontSize:15}]}>User</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  all: {
   /*  height: 60, */
    width: "100%",
    backgroundColor: "#fff",
    borderTopColor:'#212121',
    borderTopWidth:2,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    
  },
  icon: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
 
});

export default CustomBottomBar;
