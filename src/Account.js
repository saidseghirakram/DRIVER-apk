import React, { useEffect, useCallback, forwardRef } from "react";
import { useState } from "react";
import { Avatar } from "react-native-paper";
import {
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  View,
  Touchable,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as SecureStore from "expo-secure-store";
import { ScrollView, RefreshControl } from "react-native-gesture-handler";
// store function to get the value of the cookie
import IP from "./Ip";
async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    JSON.stringify(result);
    return result;
  } else {
    // alert("No values stored under that key.");
    console.log("no Cookie");
  }
}
const unsetItem = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log("Item unset successfully");
  } catch (error) {
    console.log("Error unsetting item:", error);
  }
};

export default function Account({ navigation }) {
  // const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [Admin, SetAdmin] = useState(false);
  const [logged, setAuth] = useState(false);
  const [user, setUser] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    const cookie = await getValueFor("authCookie");
    const ID = await getValueFor("Id");
    if (cookie) {
      setAuth(true);
    }
    if (
      ID === "646b34bdf0423aa26fd12f2c" ||
      ID === "646b34bdf0423aa26fd12f2d" ||
      ID === "646b34bdf0423aa26fd12f2e"
    ) {
      SetAdmin(true);
      return setUser("Admin");
    }
    const name = await getValueFor("username");
    if (name) {
      setUser(name);
    } else {
      setUser("Guest");
    }
  };

  const refreshScreen = useCallback(() => {
    setRefreshing(true);
    fetchData();

    setRefreshing(false);
  });

  useEffect(() => {
    if (isFocused) {
      refreshScreen();
    }
  }, [isFocused, refreshScreen]);

  getValueFor("authCookie")
    .then((value) => {
      if (value) {
        setAuth(true);
      }
    })
    .catch((err) => console.log(err));
  const handlelogout = () => {
    fetch("http://" + IP + ":3000/auth/logout");
    unsetItem("authCookie");
    unsetItem("username");
    unsetItem("Id");
    setAuth(false);
    SetAdmin(false);
    navigation.navigate("Home");
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshScreen} />
      }
    >
      <View style={styles.container}>
        <View style={styles.profile_Pic}>
          <Avatar.Text
            size={50}
            label={user}
            color="#fff"
            style={{
              backgroundColor: "#84CAE2",
              width: "97%",
              height: "97%",
              borderRadius: 100,
              fontSize: 20,
            }}
          />
          <TouchableOpacity style={styles.edit_icon}>
            <MaterialIcons name="create" size={35} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.items}>
          {!logged && (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate("LogIn")}
            >
              <View style={styles.icon}>
                <MaterialIcons name="login" size={35} color="#fff" />
              </View>
              <Text style={styles.label}>Login</Text>
            </TouchableOpacity>
          )}

          {logged && (
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                navigation.navigate("Edit_Profile")
              } /* onPress={navigation.navigate(Edit)} */
            >
              <View style={styles.icon}>
                <MaterialIcons name="create" size={35} color="#fff" />
              </View>
              <Text style={styles.label}>Edit Profile</Text>
            </TouchableOpacity>
          )}
          {logged && (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate("Change Password")}
            >
              <View style={styles.icon}>
                <MaterialIcons name="lock" size={35} color="#fff" />
              </View>
              <Text style={styles.label}>Change Password</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("InfoApp")}
          >
            <View style={styles.icon}>
              <MaterialIcons name="info" size={35} color="#fff" />
            </View>
            <Text style={styles.label}>Information</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("Update")}
          >
            <View style={styles.icon}>
              <MaterialIcons name="update" size={35} color="#fff" />
            </View>
            <Text style={styles.label}>Update</Text>
          </TouchableOpacity>

          {Admin && (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate("AdminSpace")}
            >
              <View style={styles.icon}>
                <MaterialIcons name="group" size={35} color="#fff" />
              </View>
              <Text style={styles.label}>Admin Space</Text>
            </TouchableOpacity>
          )}
          {logged && (
            <TouchableOpacity style={styles.item} onPress={handlelogout}>
              <View style={styles.icon}>
                <MaterialIcons name="logout" size={35} color="#fff" />
              </View>
              <Text style={styles.label}>Log out</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    zIndex: -1,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  profile_Pic: {
    height: 150,
    width: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#84CAE2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 20,
  },
  edit_icon: {
    position: "absolute",
    bottom: -5,
    right: 0,
    backgroundColor: "#84CAE2",
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 5,
  },
  items: {
    flex: 1,
    width: "100%",
    paddingBottom: 50,
    display: "flex",
    alignItems: "center",
  },
  item: {
    flex: 1,
    width: "90%",
    marginBottom: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomColor: "#84CAE2",
    borderBottomWidth: 1,
  },
  icon: {
    backgroundColor: "#84CAE2",
    width: 50,
    height: 50,
    borderRadius: 50,
    padding: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    padding: "auto",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
