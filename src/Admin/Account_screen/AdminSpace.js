import React from "react";
import {
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function AdminSpace({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.items}>
        <TouchableOpacity
          style={styles.item}
          /* onPress={() => navigation.navigate("user")} */
          onPress={() => navigation.navigate("UserAdmin")}
        >
          <Image style={styles.img} source={require("./img/User.png")} />
          <View style={styles.dark}></View>
          <Text style={styles.txt}>Users</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("ServicesAdmin")}
        >
          <Image style={styles.img} source={require("./img/Services.png")} />
          <View style={styles.dark}></View>
          <Text style={styles.txt}>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("Style_Map")}
        >
          <Image style={styles.img} source={require("./img/Map.png")} />
          <View style={styles.dark}></View>
          <Text style={styles.txt}>Map</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingHorizontal: 20,
    display: "flex",
  },
  items: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  item: {
    width: "90%",
    backgroundColor: "#84CAE2",
    height: 200,
    borderRadius: 30,
    overflow: "hidden",
    marginVertical: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  img: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    zIndex: -1,
  },
  txt: {
    zIndex: 1,
    color: "#ffff",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  dark: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "120%",
    zIndex: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  icon: {
    width: "80%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
