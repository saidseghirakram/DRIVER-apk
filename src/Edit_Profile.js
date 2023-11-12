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
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as SecureStore from "expo-secure-store";
import { Picker } from "@react-native-picker/picker";
import IP from "./Ip";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export default function Edit({ navigation }) {
  const [update, setUpdate] = useState("");
  const [data, setData] = useState("");
  const profile = ["name", "email"];
  const handleSelect = (itemValue) => {
    setData(itemValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_Pic}>
        <View style={styles.profile_Pic}>
          <Image
            style={{ width: "95%", height: "95%", borderRadius: 100 }}
            source={require("./img/profile.png")}
          />
          <TouchableOpacity style={styles.edit_icon}>
            <MaterialIcons name="create" size={35} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          {!data && (
            <>
              <Text style={styles.label}>Select :</Text>
              <Picker selectedValue={data} onValueChange={handleSelect}>
                <Picker.Item label=" Please Select : " style={styles.txt} />

                {profile.map((data, index) => (
                  <Picker.Item key={index} label={data} value={data} />
                ))}
              </Picker>
            </>
          )}

          {data && (
            <View style={styles.items}>
              <View style={styles.item}>
                <Text style={styles.label}>{data}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={"New " + data}
                  onChangeText={setUpdate}
                />
              </View>
            </View>
          )}
        </View>
      </View>
      <View style={styles.btn_Container}>
        {data && (
          <>
            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                fetch("http://" + IP + ":3000/user/updateProfile", {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    update: update,
                    data: data,
                  }),
                })
                  .then((res) => {
                    if (res.status === 200) {
                      return res.json();
                    }
                    return false;
                  })
                  .then((js) => {
                    if (js) {
                      if (data === "name") {
                        save("username", update);
                        return navigation.navigate("Home");
                      } else {
                        alert("Email Updated!");
                        return navigation.navigate("Home");
                      }
                    }
                    return alert("Update Failed");
                  })
                  .catch((err) => console.log(err))
              }
            >
              <Text style={styles.btn_text}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => setData("")}>
              <Text style={styles.btn_text}>Re-Select</Text>
            </TouchableOpacity>
          </>
        )}
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
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
  },

  profile_Pic: {
    height: 150,
    width: 150,
    borderRadius: 100,
    borderWidth: 5,
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
  container_Pic: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
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
    fontSize: 17,
    fontWeight: "bold",
    height: 40,
    marginTop: 10,
    paddingLeft: 15,
    marginLeft: 20,
  },
  btn_Container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 20,
    paddingVertical: 20,
  },
  btn: {
    width: "40%",
    backgroundColor: "#84CAE2",
    // height:40,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 15,
  },
  btn_text: {
    color: "#fff",
    fontSize: 15,
  },
  list: {
    width: "100%",
  },
});
