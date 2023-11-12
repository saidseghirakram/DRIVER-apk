import React, { useEffect, useCallback } from "react";
import { View, Image, Text, ActivityIndicator, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    //    alert(" Welcome Back ..  \n" + result);
    return result;
  } else {
    // alert("No values stored under that key.");
    console.log("No cookie");
  }
}

const LoaderPage = ({ navigation }) => {
  const [logged, setIsLogged] = React.useState(false);
  async function fetchData() {
    const cookie = await getValueFor("cookie");

    if (cookie) {
      setIsLogged(true);
    }
  }
  const refreshScreen = useCallback(() => {
    fetchData();
  }, [logged]);
  // fetchData();
  useEffect(() => {
    refreshScreen();

    // const fakeAsyncTask = setTimeout(() => {
    //   fetchData();
    if (logged) {
      navigation.navigate("MyTabs");
    } else {
      navigation.navigate("GetStartedPage");
    }
    // }, 2000);

    // return () => clearTimeout(fakeAsyncTask); // Clean up the timer on unmount
  }, [navigation, logged]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading...</Text>
      <Image
        source={require("../img/loader/loader_1.gif")}
        style={{ width: 300, height: 300 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoaderPage;
