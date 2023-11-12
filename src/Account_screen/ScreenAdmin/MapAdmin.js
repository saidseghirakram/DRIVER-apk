import React, { useState } from "react";
import { View, Text, Image, TextInput, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import IP from "../../Ip";
const MapAdmin = () => {
  const [text, setText] = useState("");

  const handleAddText = () => {
    if (text.length < 20) {
      return alert("please use a valid Style");
    }
    fetch(`http://${IP}:3000/admin/map`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ style: [text] }),
    })
      .then((res) => {
        if (res.status === 201) {
          alert("Style Will be used in the next reload");
          setText("");
          return res.json();
        } else {
          alert("Error");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require("./ImG/20230604155737__fpdl.in__icone-carte-3d-etiquette-localisation-broche-rouge_107791-15771_normal-removebg-preview.png")}
      />
      <Text style={styles.label}>Add Style Map</Text>
      <TextInput
        style={styles.textInput}
        multiline={true}
        numberOfLines={4}
        value={text}
        onChangeText={setText}
        placeholder="Enter your Style"
      />
      {/* <Button title="Add" onPress={handleAddText} /> */}
      <TouchableOpacity style={styles.btn} onPress={handleAddText}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  img: {
    marginTop: 20,
    height: 300,
    width: "100%",
    resizeMode: "contain",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#84CAE2",
    marginBottom: 20,
  },
  textInput: {
    height: 120,
    borderColor: "#84CAE2",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 10,
    width: "90%",
    borderRadius: 10,
  },
  btn: {
    backgroundColor: "#84CAE2",
    marginTop: 20,
    width: 120,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 50,
  },
});

export default MapAdmin;
