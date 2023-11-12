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
import IP from "../Ip";
var Parking_Data = [
  {
    name: "Les Sablettes",
    latitude: 36.754233,
    longitude: 3.026812,
    wilaya: "Alger",
  },
  {
    name: "Zabana",
    latitude: 35.711245,
    longitude: -0.628586,
    wilaya: "Ain Temouchent",
  },
  {
    name: "la Plage",
    latitude: 36.763465,
    longitude: 3.073379,
    wilaya: "Boumerdès",
  },
  {
    name: "Place de l'Emir",
    latitude: 35.729312,
    longitude: 0.542355,
    wilaya: "Béchar",
  },
  {
    name: "Gare Routière",
    latitude: 34.889593,
    longitude: 1.319301,
    wilaya: "Biskra",
  },
  {
    name: "Place 1er Novembre",
    latitude: 35.670471,
    longitude: -0.653976,
    wilaya: "Chlef",
  },
  {
    name: "Centre Ville",
    latitude: 35.204274,
    longitude: 0.633929,
    wilaya: "Djelfa",
  },
  {
    name: "Place de la République",
    latitude: 36.541601,
    longitude: 2.912342,
    wilaya: "Médéa",
  },
  {
    name: "Place des Martyrs",
    latitude: 36.814502,
    longitude: 4.551176,
    wilaya: "Tizi Ouzou",
  },
  {
    name: "la Mairie",
    latitude: 36.457451,
    longitude: 6.613401,
    wilaya: "Jijel",
  },
];

const ParkingItem = ({ item }) => {
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
            went: false,
          });
        }}
      >
        <Image
          style={style.img_item}
          source={require("../img/service/john-matychuk-yvfp5YHWGsc-unsplash.jpg")}
        />
        <Text style={style.title_item}>{item.name}</Text>
        <Text style={style.wilaya}>{item.wilaya}</Text>
        <Text style={style.phone}>{item.phone}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Parking() {
  const navigation = useNavigation();
  const [ParkData, setParkData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Simulating data fetching
    try {
      await fetch("http://" + IP + ":3000/services/parkings")
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) {
            setParkData(Parking_Data);
          } else {
            // console.log(data);
            //  setParkData(data);
            const flatList = [];
            var i = " ";

            // Loop through the data and extract hotel names and phone numbers
            for (const entry of data) {
              const wilaya = entry.wilaya || "";
              const parkings = entry.parkings || {};
              for (const park of Object.values(parkings)) {
                var name = park.name || "";
                const phone = park.phone || "";
                const latitude = park.latitude || "";
                const longitude = park.longitude || "";
                name = `${name} ${i}`;
                i = i + " ";
                flatList.push({ wilaya, name, phone, latitude, longitude });
              }
            }
            Parking_Data = flatList;
            setParkData(flatList);
            // console.log(flatList);
          }
        });
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setParkData(Parking_Data);
    }, 2000);
  };

  const handleAddParking = () => {
    const params = [
      { label: "Name" },
      { label: "Adress" },
      { label: "Phone" },
      // Add more parameters as needed
    ];
    const pageName = { name: "Parking" };

    navigation.navigate("AddScreen", { params, pageName });
  };
  return (
    <ScrollView style={style.container}>
      <View style={style.header}>
        <Image
          style={style.img}
          source={require("./Assets/rest_imgs/parking/20230530231848__fpdl.in__parking_24908-54068_normal-removebg-preview.png")}
        />
        <View style={style.ads}>
          <Text style={style.title}>50% Off Today</Text>
          <TouchableOpacity style={style.btn}>
            <Text style={style.btn_text}>Order</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.items}>
        <View style={style.item}>
          <TouchableOpacity style={style.btn}>
            <Avatar.Icon
              size={70}
              icon="car-hatchback"
              color="#84CAE2"
              style={{ backgroundColor: "transparent" }}
              theme={{ roundness: 0 }}
            />
            <Text style={style.text}>Car</Text>
          </TouchableOpacity>
        </View>

        <View style={style.item}>
          <TouchableOpacity style={style.btn}>
            <Avatar.Icon
              size={70}
              icon="motorbike"
              color="#84CAE2"
              style={{ backgroundColor: "transparent" }}
              theme={{ roundness: 0 }}
            />
            <Text style={style.text}>Motorbike</Text>
          </TouchableOpacity>
        </View>

        <View style={style.item}>
          <TouchableOpacity style={style.btn}>
            <Avatar.Icon
              size={70}
              icon="bus-side"
              color="#84CAE2"
              style={{ backgroundColor: "transparent" }}
              theme={{ roundness: 0 }}
            />
            <Text style={style.text}>Bus</Text>
          </TouchableOpacity>
        </View>

        <View style={style.item}>
          <TouchableOpacity style={style.btn}>
            <Avatar.Icon
              size={70}
              icon="truck"
              color="#84CAE2"
              style={{ backgroundColor: "transparent" }}
              theme={{ roundness: 0 }}
            />
            <Text style={style.text}>Truck</Text>
          </TouchableOpacity>
        </View>

        <View style={style.item}>
          <TouchableOpacity style={style.btn}>
            <Avatar.Icon
              size={70}
              color="#84CAE2"
              icon="bicycle"
              style={{ backgroundColor: "transparent" }}
              theme={{ roundness: 0 }}
            />
            <Text style={style.text}>bicycle</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={style.tit}>Parkings</Text>
      <FlatList
        style={style.liste}
        data={Parking_Data}
        renderItem={({ item }) => <ParkingItem item={item} />}
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
        <TouchableOpacity style={style.add} onPress={handleAddParking}>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
            Add Parking
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
    fontSize: 20,
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
  phone: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#000",
    paddingLeft: 10,
  },
  /* end add */
});
