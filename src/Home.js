import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { ScrollView, RefreshControl } from "react-native-gesture-handler";

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
export default function Home({ route, navigation }) {
  const isFocused = useIsFocused();
  const [username, setUsername] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  async function fetchData() {
    const value = await getValueFor("username");
    const ID = await getValueFor("Id");
    if (
      ID === "646b34bdf0423aa26fd12f2c" ||
      ID === "646b34bdf0423aa26fd12f2d" ||
      ID === "646b34bdf0423aa26fd12f2e"
    ) {
      setUsername("Admin");
    } else {
      setUsername(value);
    }
  }
  const refreshScreen = useCallback(() => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (isFocused) {
      refreshScreen();
    }
  }, [isFocused, refreshScreen]);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshScreen} />
      }
    >
      <View style={style.container}>
        <View style={style.info}>
          <View style={style.leftInfo}>
            <Image
              style={{ width: 30, height: 30 }}
              source={require("./img/profile.png")}
            />
            <Text style={style.txt}>
              {username ? username : "Guest " + Date.now()}
            </Text>
          </View>
          <Image
            style={{ width: 30, height: 30 }}
            source={require("./img/notification.png")}
          />
        </View>

        <View style={style.annonce}>
          <View style={style.annonceImg}>
            <Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
                borderRadius: 30,
                backgroundColor: "#fff",
              }}
              source={require("./img/mainPic.png")}
            />
          </View>
        </View>

        <View style={style.Services}>
          <Text style={style.welcom}>Services</Text>
          <View style={style.service}>
            <TouchableOpacity
              style={style.containerButton}
              onPress={() => navigation.navigate("Parking")}
            >
              <Text style={style.txtBtn}>Parking</Text>
              <Image
                style={{ width: 60, height: 60 }}
                source={require("./img/service/parking-car.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.containerButton}
              onPress={() => navigation.navigate("Repair")}
            >
              <Text style={style.txtBtn}>Repair</Text>
              <Image
                style={{ width: 60, height: 60 }}
                source={require("./img/service/transportation.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.containerButton}
              onPress={() => navigation.navigate("Hotel")}
            >
              <Text style={style.txtBtn}>Hotel</Text>
              <Image
                style={{ width: 60, height: 60 }}
                source={require("./img/service/hotel.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.containerButton}
              onPress={() => navigation.navigate("Resturant")}
            >
              <Text style={style.txtBtn}>Resturant</Text>
              <Image
                style={{ width: 60, height: 60 }}
                source={require("./img/service/restaurant.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.containerButton}
              onPress={() => navigation.navigate("Pieces")}
            >
              <Text style={style.txtBtn}>Pieces</Text>
              <Image
                style={{ width: 60, height: 60 }}
                source={require("./img/service/brake-pad.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.containerButton}
              onPress={() => navigation.navigate("Mecanicien")}
            >
              <Text style={style.txtBtn}>Mechanical</Text>
              <Image
                style={{ width: 60, height: 60 }}
                source={require("./img/service/technical-support.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    paddingLeft: 15,
    backgroundColor: "#fff",
    paddingBottom: 50,
    paddingTop: 30,
  },
  /* start info  */
  info: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 35,
    height: 50,
  },
  leftInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 40,
    width: 120,
    marginLeft: -20,
  },
  txt: {
    marginLeft: -10,
    fontSize: 20,
    textAlign: "center",
    width: "150%",
  },

  /* end info */
  /* start annonce */
  annonce: {
    height: "40%",
    width: "100%",
    display: "flex",
    marginBottom: 20,
  },
  welcom: {
    fontSize: 28,
    marginBottom: 20,
    marginTop: 10,
    fontWeight: "bold",
  },
  annonceImg: {
    flex: 1,
    width: "97%",
    // backgroundColor: "green",

    borderRadius: 30,
  },
  /* end annonce */
  /* start Services */
  Services: {
    width: "100%",
    flex: 1,
    //  backgroundColor:'green',
    display: "flex",
  },
  service: {
    display: "flex",
    justifyContent: "space-evenly",
    // alignItems:'space-between',
    width: "95%",
    height: "90%",
    //backgroundColor:'red',
    marginLeft: "2%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingTop: 10,
  },
  containerButton: {
    width: "30%",
    height: "40%",
    backgroundColor: "#84CAE2",
    borderRadius: 15,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  txtBtn: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
