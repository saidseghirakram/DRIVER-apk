import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  View,
  Touchable,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import IP from "../Ip";

export default function Password({ navigation }) {
  const [curr, getCurr] = useState("");
  const [newPass, getNewPass] = useState("");
  const [confirmPass, getConfirmPass] = useState("");
  console.log(IP);
  const ChangePassword = async () => {
    if (newPass != confirmPass) {
      return alert("Password not match");
    }
    console.log(curr, newPass);
    await fetch(`http://${IP}:3000/user/updatePassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ curr: curr, newPass: newPass }),
    })
      .then((res) => {
        if (res.status === 400) {
          return alert("Password Entered Was not Correct!");
        }
        if (res.status === 200) {
          alert("Password Changed Successfully");
          return navigation.navigate("profile");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container_Pic}>
          <Image
            style={{ width: "95%", height: "95%", borderRadius: 100 }}
            source={require("./img/6374585-removebg-preview.png")}
          />
        </View>

        <View style={styles.items}>
          <View style={styles.item}>
            <Text style={styles.label}>Current Password</Text>
            <TextInput
              style={styles.input}
              placeholder="- - - - - - - - - -  "
              onChangeText={getCurr}
              value={curr}
              autoFocus
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={styles.input}
              placeholder="- - - - - - - - - -  "
              onChangeText={getNewPass}
              value={newPass}
              secureTextEntry
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.label}>Confirm new password</Text>
            <TextInput
              style={styles.input}
              placeholder="- - - - - - - - - -  "
              onChangeText={getConfirmPass}
              secureTextEntry
              value={confirmPass}
            />
          </View>

          <View style={styles.btn_Container}>
            <TouchableOpacity style={styles.btn} onPress={ChangePassword}>
              <Text style={styles.btn_text}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingHorizontal: 20,
    display: "flex",
    alignItems: "center",
  },
  container_Pic: {
    width: "100%",
    height: 300,
  },
  items: {
    flex: 1,
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    paddingTop: 20,
    paddingBottom: 40,
  },
  item: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    color: "#84CAE2",
    fontSize: 20,
  },
  input: {
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "#84CAE2",
    fontSize: 20,
    height: 40,
    marginTop: 10,
    paddingLeft: 30,
    marginLeft: 20,
  },
  btn_Container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  btn: {
    width: "60%",
    backgroundColor: "#84CAE2",
    // height:40,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 20,
  },
  btn_text: {
    color: "#fff",
    fontSize: 20,
  },
});
