import React, { useState, useEffect, useRef, useCallback } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Searchbar } from "react-native-paper";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
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
import { faSleigh } from "@fortawesome/free-solid-svg-icons";
let locationOfInteres = [];
var went = false;
let prv = null;
export default function One({ route, navigation }) {
  const [origine, setOrigine] = useState([]);
  const [destination, setDestination] = useState(false);
  const [Route, setRoute] = useState([]);
  const [location, setLocation] = useState(null);
  const [Region, setRegion] = useState("");
  const mapRef = useRef(null);
  var params = route.params;

  const LoadMap = useCallback(() => {
    if (params && params.params && params.params.data.longitude !== prv) {
      went = false;
      prv = params.params.data.longitude;
    }
    if (params && params.params && mapRef.current && went === false) {
      prv = params.params.data.longitude;
      mapRef.current.animateToRegion({
        latitude: params.params.data.latitude,
        longitude: params.params.data.longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.004,
      });

      setOrigine({
        latitude: parseFloat(params.params.data.latitude),
        longitude: parseFloat(params.params.data.longitude),
      });
      locationOfInteres = [
        {
          location: {
            latitude: params.params.data.latitude,
            longitude: params.params.data.longitude,
          },
        },
      ];
      setDestination(true);
      went = true;
    }
  }, [params]);
  useEffect(() => {
    if (location) {
      LoadMap();
    } else {
      LocationScreen();
    }
  }, [destination, location, origine]);

  const customMapStyle = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ];
  //functoin pour get location as auto but i add buttton on cklik....

  const LocationScreen = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location);

      return location;
    } catch (error) {
      console.log(error);
    }
  };

  LocationScreen();

  const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
    latitude: 36.28055463559134,
    longitude: 2.7443119657325497,
    latitudeDelta: 0.009,
    longitudeDelta: 0.004,
  });

  const goToCurrentPosition = () => {
    LocationScreen();
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.004,
      });
    }
  };

  const getRoute = async (latitude, longitude) => {
    if (latitude && longitude) {
      await fetch(
        `https://api.geoapify.com/v1/routing?waypoints=${location.coords.latitude},${location.coords.longitude}|${latitude},${longitude}&mode=drive&apiKey=e79e5e6ecb4541b6b01e19b2b89d36e8`
      )
        .then((response) => response.json())
        .then((result) => {
          // Extract the coordinates of the route from the Geoapify API response
          const coordinates = result.features[0].geometry.coordinates[0];
          // Convert the coordinates to an array of LatLng objects that can be used by the Polyline component
          const latlngs = coordinates.map(([longitude, latitude]) => ({
            longitude: longitude,
            latitude: latitude,
          }));

          setRoute(latlngs);
        })
        .catch((error) => console.log("error", error));
    } else {
      setRoute([]);
    }
  };
  const showLocationOfInteres = () => {
    return locationOfInteres.map((item, index) => {
      return (
        <Marker key={index} coordinate={item.location} title={item.name} />
      );
    });
  };

  const LocationAutocomplete = () => {
    const [value, onChangeText] = useState("");
    const [displayNames, setDisplayNames] = useState([]);

    const handleBlur = () => {
      const place = value;
      const url =
        "https://api.locationiq.com/v1/autocomplete?key=pk.0cbbe06e8043478d1aceeb44768458c2&q=";

      fetch(url.concat(place))
        .then((response) => response.json())
        .then((data) => {
          const locations = data.map((element) => ({
            displayName: element.display_name,
            lon: element.lon,
            lat: element.lat,
          }));

          setDisplayNames(locations);
        })
        .catch((err) => console.log(err));
    };
    const HandlePress = (lon, lat) => {
      setOrigine({
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
      });
      setDestination(true);
      mapRef.current.animateToRegion({
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        latitudeDelta: 0.09,
        longitudeDelta: 0.04,
      });
      locationOfInteres.push({
        name: value,
        location: {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        },
      });
      setDisplayNames([]);
    };

    return (
      <View style={{ width: "100%" }}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeText}
          onBlur={handleBlur}
          style={styles.searchBar}
        />

        {displayNames.length > 0 && (
          <View
            style={{
              position: "relative",
              marginTop: 250,
              backgroundColor: "#f5f5f5",
              width: "100%",
              height: 300,
            }}
          >
            <Button
              onPress={() => {
                setDisplayNames([]);
              }}
            >
              clear
            </Button>
            <ScrollView>
              {displayNames.map((location, index) => (
                <TouchableOpacity
                  style={styles.txt}
                  key={index}
                  onPress={() => {
                    HandlePress(location.lon, location.lat);
                  }}
                >
                  <Text key={index}>{location.displayName}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LocationAutocomplete />
      {location && (
        <MapView
          followsUserLocation={true}
          showsTraffic={true}
          showsUserLocation={true}
          showsMyLocationButton={false}
          ref={mapRef}
          customMapStyle={customMapStyle}
          style={styles.Map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          }}
        >
          {showLocationOfInteres()}
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Current Location"
          />
          <Polyline coordinates={Route} strokeWidth={5} strokeColor="#fff" />
        </MapView>
      )}
      <TouchableOpacity style={styles.Btn} onPress={goToCurrentPosition}>
        <MaterialIcons name="room" size={25} color="#fff" style={styles.icon} />
      </TouchableOpacity>
      {locationOfInteres.length > 0 && (
        <TouchableOpacity
          style={styles.Btn2}
          onPress={() => {
            getRoute(origine.latitude, origine.longitude);
            mapRef.current.animateToRegion({
              latitude: origine.latitude,
              longitude: origine.longitude,
              latitudeDelta: 0.09,
              longitudeDelta: 0.04,
            });
            // goToCurrentPosition();
          }}
        >
          <MaterialIcons
            name="navigation"
            size={25}
            color="#fff"
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
      {destination && (
        <TouchableOpacity
          style={styles.Btn3}
          onPress={() => {
            console.log("am clicked!");
            locationOfInteres = [];
            getRoute(null, null);
            setDestination(false);
            goToCurrentPosition();
            setOrigine(null);
          }}
        >
          <MaterialIcons
            name="cancel"
            size={28}
            color="#fff"
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
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
    marginBottom: 5,
    padding: 10,
    zIndex: 0,
    borderBottomWidth: 0.5,
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
    backgroundColor: "#fff",
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
    top: 77,
    right: 20,
    padding: 10,
    borderRadius: 100,
    zIndex: 1,
    backgroundColor: "#fff",
    paddingLeft: 7,
  },
  Btn3: {
    position: "absolute",
    width: "11%",
    height: "7%",
    bottom: 25,
    left: 20,
    padding: 10,
    borderRadius: 100,
    zIndex: 1,
    backgroundColor: "#fff",
    paddingLeft: 7,
  },
});
