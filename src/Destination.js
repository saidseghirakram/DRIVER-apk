import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Searchbar } from "react-native-paper";
import * as Location from "expo-location";
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

let locationOfInteres = [
  {
    name: "ouzera",
    location: {
      latitude: 36.2526315,
      longitude: 2.8466043,
      latitudeDelta: 2.0,
      longitudeDelta: 2.0,
    },
  },
];

export default function Destination({ route, navigation }) {
  const mapRef = useRef(null);
  const [initialRegion, setInitialRegion] = useState(route.params.origin);
  const params = route.params;
  setInitialRegion(params.origin);

  console.log(initialRegion);

  const showLocationOfInteres = () => {
    return locationOfInteres.map((item, index) => {
      return (
        <Marker key={index} coordinate={item.location} title={item.name} />
      );
    });
  };

  console.log("this is the inital Region => : \n" + initialRegion);
  useEffect(() => {
    if (params && params.origin) {
      const { latitude, longitude } = params.origin;
      setInitialRegion({
        latitude,
        longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.004,
      });
      locationOfInteres.push(initialRegion);
      console.log(locationOfInteres);
      console.log(
        "this is the inital Region inside the useEffect => : \n" + initialRegion
      );
    }
  });

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={initialRegion}
        ref={mapRef}
        style={styles.Map}
        //region={initialRegion}
      >
        {showLocationOfInteres()}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Map: {
    width: "100%",
    height: "100%",
  },
  txt: {
    // backgroundColor: "#84CAE2",
    marginTop: 10,
    padding: 10,
    zIndex: 0,
  },
  search: {
    color: "gray",
    position: "absolute",
    top: 10,
    right: 20,
    zIndex: 1,
  },
  Btn: {
    position: "absolute",
    width: "11%",
    height: "7%",
    bottom: 25,
    right: 20,
    padding: 10,
    borderRadius: 100,
    zIndex: 1,
    backgroundColor: "#000",
    paddingLeft: 7,
  },
  icon: {
    // backgroundColor: "#FF0000",
    color: "#FF4222",
  },
  searchBar: {
    marginTop: 90,
    width: "100%",
    alignSelf: "center",
    elevation: 0, // Remove shadow
    borderBottomWidth: 0, // Remove bottom border
    backgroundColor: "transparent", // Make background transparent
  },
  itemList: {
    position: "absolute",
    width: "100%",
    height: "50%",
    zIndex: 1,
    bottom: 0,
  },
  Btn2: {
    position: "absolute",
    width: "11%",
    height: "7%",
    top: 25,
    right: 20,
    padding: 10,
    borderRadius: 100,
    zIndex: 1,
    backgroundColor: "#84CAE2",
    paddingLeft: 7,
  },
});
