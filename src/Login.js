import {
  Button,
  Pressable,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Touchable,
  View,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ActivityIndicator,
  MD2Colors,
  Portal,
  Dialog,
  PaperProvider,
} from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import Home from "./Home";
import IP from "./Ip";
// var users;
const Stack = createStackNavigator();

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export default function LogIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log("this is the ip => " + IP);
  const onPressHandler = () => {
    navigation.navigate("SignUp"); /*  */
  };

  const handleLogin = () => {
    // do something with the credentials and navigate to the authenticated content
    setIsLoading(true);
    fetch("http://" + IP + ":3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email: email.trim(), password: password.trim() }),
    })
      .then((res) => {
        // console.log(JSON.stringify(res.headers));
        console.log("this is the response Status  " + res.status);

        if (res.status === 200) {
          console.log(
            "this is the response Cookie =>   " + res.headers.get("set-cookie")
          );
          const cookie = res.headers.get("set-cookie");
          // console.log(cookie);
          save("authCookie", cookie);
          return res.json();
        }
        setIsLoading(false);
        return alert("Invalid email or password");
      })
      .then((res) => {
        save("Id", res.id);
        save("username", res.userName);
        if (res) {
          setIsLoading(false);
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isAuthenticated) {
    // navigation.navigate("Home");
    useNavigation().navigate("Home");
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.login}>
          <Text style={styles.drible}>Log in</Text>
          {isLoading && (
            <View style={styles.dialogContainer}>
              <ActivityIndicator size="large" color="#000" />
            </View>
          )}
        </View>

        <View style={styles.info}>
          <View style={styles.child}>
            <Text style={styles.befor}>Email</Text>
            <TextInput
              placeholder="hello@gmail.com"
              style={styles.input}
              onFocus={() => {
                styles.input.zIndex = 1;
              }}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.child}>
            <Text style={styles.befor}>Password </Text>
            <TextInput
              placeholder="*****"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.child}>
            <TouchableOpacity style={styles.btn} onPress={handleLogin}>
              <Text style={styles.txt}>Login </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.child}>
            <TouchableOpacity onPress={onPressHandler}>
              <Text>Not have account? </Text>
              <Text>Signup here </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.vide}>
          <Text style={styles.dbe}> </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 40,
    fontFamily: "sans-serif",
    color: "#000",
    fontWeight: 200,
    padding: 10,
  },
  body: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  login: {
    // backgroundColor:'#ded',
    height: 220,
    width: "100%",
    display: "flex",
    marginBottom: 40,
    //justifyContent:'center'
  },
  drible: {
    backgroundColor: "#84cae2",
    width: "50%",
    height: "100%",
    borderBottomRightRadius: 120,
    borderBottomLeftRadius: 55,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 100,
    position: "absolute",
    top: -30,
    paddingTop: "48%",
    paddingLeft: "20%",
    fontSize: 40,
    color: "#fff",
  },
  info: {
    height: "50%",
    width: "100%",
    display: "flex",
    //backgroundColor:'#efe',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  child: {
    position: "relative",
    height: 85,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:'#ddd'
  },
  input: {
    borderColor: "#84cae2",
    borderWidth: 2,
    paddingLeft: 20,
    paddingRight: 20,
    width: "80%",
    borderRadius: 10,
    height: 60,
    position: "relative",
    //marginBottom:0
  },
  befor: {
    position: "absolute",
    top: 0,
    left: 70,
    backgroundColor: "#fff",
    padding: 0,
    zIndex: 1,
    width: 80,
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#84cae2",
    paddingLeft: 20,
    paddingRight: 20,
    width: "80%",
    borderRadius: 10,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    color: "#fff",
    fontWeight: 500,
    fontSize: 35,
  },

  vide: {
    height: "15%",
    width: "100%",
    display: "flex",
  },
  dialogContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    margin: "50%",

    height: "50%",
  },
});
