import {
  Button,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Text,
  Touchable,
  View,
  Alert,
} from "react-native";
import React, { useState, useCallback } from "react";
import IP from "./Ip";
import { ActivityIndicator } from "react-native";

import { TextInput } from "react-native-gesture-handler";

export default function SignUp({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const backToLogin = async () => {
    navigation.navigate("LogIn");
  };

  const onPressHandler = async () => {
    setLoading(true);
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = regex.test(email);
    if (!isValid) {
      setLoading(false);
      return alert("Please enter a valid email");
    }
    await fetch("http://" + IP + ":3000/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    })
      .then((res) => {
        console.log(res.status);
        if (res.status === 404) {
          return alert("Email already exists");
        }
        if (res) {
          setTimeout(() => {
            setLoading(false);
            console.log("Signed Successfully");
            navigation.navigate("LogIn");
          }, 2000);
        } else {
          setLoading(false);
        }
      })
      .catch((e) => console.error(e));
    //  navigation.goBack()
  };
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.body}
        //
      >
        <View style={styles.login}>
          <Text style={styles.drible}>Sign Up </Text>
        </View>
        {isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}

        <View style={styles.info}>
          <View style={styles.child}>
            <Text style={styles.befor}>Name</Text>
            <TextInput
              placeholder="James Morgan"
              value={name}
              style={styles.input}
              onChangeText={setName}
              onFocus={() => {
                styles.input.zIndex = 1;
              }}
            />
          </View>

          <View style={styles.child}>
            <Text style={styles.befor}>Email</Text>
            <TextInput
              placeholder="hello@gmail.com"
              value={email}
              style={styles.input}
              onChangeText={setEmail}
              onFocus={() => {
                styles.input.zIndex = 1;
              }}
            />
          </View>

          <View style={styles.child}>
            <Text style={styles.befor}>Password</Text>
            <TextInput
              placeholder="*****"
              style={styles.input}
              password={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.child}>
            <TouchableOpacity style={styles.btn} onPress={onPressHandler}>
              <Text style={styles.txt}>Sign Up </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.child}>
            <TouchableOpacity onPress={backToLogin}>
              <Text>Already Registered? </Text>
              <Text> Log in here </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.vide}>
          <Text style={styles.dbe}> </Text>
        </View>
      </Pressable>
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
    padding: 2,
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
  loading: {
    zIndex: 1,
    width: "50%",
    height: 100,
  },
});
