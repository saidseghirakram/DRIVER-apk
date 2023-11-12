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
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
export default function ServicesAdmin({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.items}>
        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            navigation.navigate("ServicesEdit", { data: "parkings" })
          }
        >
          <Image style={styles.img} source={require("./ImG/Paking.png")} />
          <View style={styles.dark}></View>
          <Text style={styles.txt}>Paking</Text>
          <FontAwesome5 name="edit" size={40} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            navigation.navigate("ServicesEdit", { data: "hotels" })
          }
        >
          <Image style={styles.img} source={require("./ImG/Hotel.png")} />
          <View style={styles.dark}></View>
          <Text style={styles.txt}>Hotel</Text>
          <FontAwesome5 name="edit" size={40} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            navigation.navigate("ServicesEdit", { data: "mechanics" })
          }
        >
          <Image style={styles.img} source={require("./ImG/Mech.png")} />
          <View style={styles.dark}></View>
          <Text style={styles.txt}>Mechanical</Text>
          <FontAwesome5 name="edit" size={40} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          /* onPress={() => navigation.navigate("Update")} */
          onPress={() =>
            navigation.navigate("ServicesEdit", { data: "garages" })
          }
        >
          <Image style={styles.img} source={require("./ImG/Pieces.png")} />
          <View style={styles.dark}></View>
          <Text style={styles.txt}>Pieces</Text>
          <FontAwesome5 name="edit" size={40} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            navigation.navigate("ServicesEdit", { data: "restaurants" })
          }
        >
          <Image style={styles.img} source={require("./ImG/Rest.png")} />
          <View style={styles.dark}></View>
          <Text style={styles.txt}>Restaurant</Text>
          <FontAwesome5 name="edit" size={40} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            navigation.navigate("ServicesEdit", { data: "deppanages" })
          }
        >
          <Image style={styles.img} source={require("./ImG/Dep.png")} />
          <View style={styles.dark}></View>
          <Text style={styles.txt}>Recovery truck</Text>
          <FontAwesome5 name="edit" size={40} color="white" />
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
