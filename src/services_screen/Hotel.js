import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  ScrollView,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button, Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { RefreshControl } from "react-native-gesture-handler";
import { faCropSimple } from "@fortawesome/free-solid-svg-icons";
import IP from "../Ip";
let Hotel_Data = [
  {
    name: "Hôtel El-Djazair",
    latitude: 36.749937,
    longitude: 3.055965,
    wilaya: "Algiers",
  },
  {
    name: "Sheraton Oran Hotel",
    latitude: 35.715932,
    longitude: -0.624717,
    wilaya: "Oran",
  },
  {
    name: "Hotel Sofitel Algiers Hamma Garden",
    latitude: 36.746628,
    longitude: 3.05186,
    wilaya: "Algiers",
  },
  {
    name: "Hotel Eden Phoenix",
    latitude: 35.72415,
    longitude: -0.611477,
    wilaya: "Oran",
  },
  {
    name: "Hôtel El Aurassi",
    latitude: 36.741695,
    longitude: 3.070469,
    wilaya: "Algiers",
  },
  {
    name: "Hotel Sabri",
    latitude: 35.702518,
    longitude: -0.618062,
    wilaya: "Oran",
  },
  {
    name: "Sheraton Club Des Pins Resort",
    latitude: 36.737683,
    longitude: 2.943616,
    wilaya: "Algiers",
  },
  {
    name: "Hôtel Royal Oran",
    latitude: 35.724392,
    longitude: -0.619789,
    wilaya: "Oran",
  },
  {
    name: "Hotel El Aurassi",
    latitude: 36.746598,
    longitude: 3.071332,
    wilaya: "Algiers",
  },
  {
    name: "Hotel Timgad",
    latitude: 36.769218,
    longitude: 3.058441,
    wilaya: "Algiers",
  },
];

const HotelItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <View style={style.items_rest}>
      <TouchableOpacity
        style={style.item_rest}
        onPress={() => {
          console.log(item.latitude, item.longitude);
          const params = {
            data: {
              latitude: item.latitude,
              longitude: item.longitude,
            },
          };
          navigation.navigate("Map", {
            params,
          });
        }}
      >
        <Image
          style={style.img_item}
          source={require("../img/service/bedroom-g5adcee0a5_1280.jpg")}
        />
        <Text style={style.title_item}>{item.name}</Text>
        <Text style={style.wilaya}>{item.wilaya}</Text>
        <Text style={style.phone}>{item.phone}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Hotel() {
  const navigation = useNavigation();
  const [HotelData, setHotelData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Simulating data fetching
    try {
      await fetch("http://" + IP + ":3000/services/hotels")
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) {
            setHotelData(Hotel_Data);
          } else {
            // console.log(data);
            //  setHotelData(data);
            const flatList = [];

            // Loop through the data and extract hotel names and phone numbers
            for (const entry of data) {
              const wilaya = entry.wilaya || "";
              const hotels = entry.hotels || {};
              for (const hotel of Object.values(hotels)) {
                const name = hotel.name || "";
                const phone = hotel.phone || "";
                const latitude = hotel.latitude || "";
                const longitude = hotel.longitude || "";
                flatList.push({ wilaya, name, phone, latitude, longitude });
              }
            }
            Hotel_Data = flatList;
            setHotelData(flatList);
            // console.log(flatList);
          }
        });
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setHotelData(Hotel_Data);
    }, 2000);
  };

  const handleAddHotel = () => {
    const params = [
      { label: "Name" },
      { label: "Adress" },
      { label: "Phone" },
      { label: "Hotel" },
      // Add more parameters as needed
    ];
    const pageName = { name: "Hotel" };
    navigation.navigate("AddScreen", { params, pageName });
  };
  return (
    <ScrollView style={style.container}>
      <View style={style.header}>
        <Image
          style={style.img}
          source={require("./Assets/rest_imgs/hotel/8496208-removebg-preview.png")}
        />
        <View style={style.ads}>
          <Text style={style.title}>30% Off Today</Text>
          <TouchableOpacity style={style.btn}>
            <Text style={style.btn_text}>Pre-Book!✍</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.items}>
        <View style={style.item}>
          <TouchableOpacity style={style.btn}>
            <Avatar.Icon
              size={70}
              icon="bed"
              color="#84CAE2"
              style={{ backgroundColor: "transparent" }}
              theme={{ roundness: 0 }}
            />
            <Text style={style.text}>Bedroom</Text>
          </TouchableOpacity>
        </View>

        <View style={style.item}>
          <TouchableOpacity style={style.btn}>
            <Avatar.Icon
              size={70}
              icon="room-service"
              color="#84CAE2"
              style={{ backgroundColor: "transparent" }}
              theme={{ roundness: 0 }}
            />
            <Text style={style.text}>Service</Text>
          </TouchableOpacity>
        </View>

        <View style={style.item}>
          <TouchableOpacity style={style.btn}>
            <Avatar.Icon
              size={70}
              icon="bag-checked"
              color="#84CAE2"
              style={{ backgroundColor: "transparent" }}
              theme={{ roundness: 0 }}
            />
            <Text style={style.text}>LUGGAGE</Text>
          </TouchableOpacity>
        </View>

        <View style={style.item}>
          <TouchableOpacity style={style.btn}>
            <Avatar.Icon
              size={70}
              icon="wifi"
              color="#84CAE2"
              style={{ backgroundColor: "transparent" }}
              theme={{ roundness: 0 }}
            />
            <Text style={style.text}>Wifi</Text>
          </TouchableOpacity>
        </View>

        <View style={style.item}>
          <TouchableOpacity style={style.btn}>
            <Avatar.Icon
              size={70}
              color="#84CAE2"
              icon="silverware"
              style={{ backgroundColor: "transparent" }}
              theme={{ roundness: 0 }}
            />
            <Text style={style.text}>Food</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={style.tit}>Hotel</Text>
      <FlatList
        style={style.liste}
        data={HotelData}
        renderItem={({ item }) => <HotelItem item={item} />}
        keyExtractor={(item) => item.name}
        horizontal={true}
      />
      <View
        style={{
          height: 50,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={style.add} onPress={handleAddHotel}>
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: 20,
            }}
          >
            Add Hotel
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  header: {
    height: 300,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  img: {
    width: "50%",
    height: "90%",
    resizeMode: "cover",
  },
  ads: {
    position: "absolute",
    top: "35%",
    right: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  title: {
    color: "#000",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  btn_text: {
    backgroundColor: "#84CAE2",
    marginTop: 10,
    width: 100,
    height: 40,
    borderRadius: 10,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  /* start icon */
  items: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 80,
    marginBottom: 40,
    justifyContent: "space-around",
    alignItems: "center",
  },
  item: {
    /* width: 70, */
    flex: 1,
    height: 80,
    // backgroundColor: "#84CAE2",
    borderRadius: 10,
  },
  btn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
  /* end icon */
  /* start list  */
  tit: {
    fontWeight: "bold",
    fontSize: 25,
    height: 50,
    paddingLeft: 10,
    width: "50%",
  },
  liste: {
    height: 200,
    marginBottom: 20,
  },
  items_rest: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    /*  paddingBottom: 70, */
  },
  item_rest: {
    backgroundColor: "#E8FDFF",
    width: 200,
    height: "100%",
    marginRight: 20,
    padding: 10,
    borderRadius: 10,
  },
  img_item: {
    width: "100%",
    height: 90,
    resizeMode: "cover",
    borderRadius: 10,
  },
  title_item: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#84CAE2",
    height: 50,
    paddingLeft: 10,
  },
  wilaya: {
    marginTop: -10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    paddingLeft: 10,
  },
  /* end list  */
  /* start add */
  add: {
    backgroundColor: "#84CAE2",
    width: "80%",
    height: "100%",
    display: "flex",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  Refresh: {
    backgroundColor: "#84CAE2",
    width: "40%",
    color: "#212121",
    textAlign: "center",
  },
  phone: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    paddingLeft: 10,
  },
  /* end add */
});
