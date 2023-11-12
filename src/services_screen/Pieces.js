import React, { useState, useEffect } from "react";
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
var Pieces_Data = [
  {
    name: "Mohamed Auto Garage",
    wilaya: "Alger",
    longitude: 36.754233,
    latitude: 3.026812,
  },
  {
    name: "Ahmed Car Workshop",
    wilaya: "Ain Temouchent",
    longitude: 35.711245,
    latitude: -0.628586,
  },
  {
    name: "Ali's Garage",
    wilaya: "Boumerdès",
    longitude: 36.763465,
    latitude: 3.073379,
  },
  {
    name: "Hassan Auto Services",
    wilaya: "Béchar",
    longitude: 35.729312,
    latitude: 0.542355,
  },
  {
    name: "Youssef Car Repairs",
    wilaya: "Biskra",
    longitude: 34.889593,
    latitude: 1.319301,
  },
  {
    name: "Karim Garage",
    wilaya: "Chlef",
    longitude: 35.670471,
    latitude: -0.653976,
  },
  {
    name: "Hamza Auto Workshop",
    wilaya: "Djelfa",
    longitude: 35.204274,
    latitude: 0.633929,
  },
  {
    name: "Abdel Car Service",
    wilaya: "Médéa",
    longitude: 36.541601,
    latitude: 2.912342,
  },
  {
    name: "Khaled Auto Garage",
    wilaya: "Tizi Ouzou",
    longitude: 36.814502,
    latitude: 4.551176,
  },
  {
    name: "Rachid Car Workshop",
    wilaya: "Jijel",
    longitude: 36.457451,
    latitude: 6.613401,
  },
];

const GarageItem = ({ item }) => {
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
          source={require("../img/service/20230602184030_[fpdl.in]_differents-assortiments-accessoires-voiture_23-2149030431_normal.jpg")}
        />
        <Text style={style.title_item}>{item.name}</Text>
        <Text style={style.wilaya}>{item.wilaya}</Text>
        <Text style={style.phone}>{item.phone}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Pieces() {
  const navigation = useNavigation();
  const [PieceData, setPieceData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Simulating data fetching
    try {
      await fetch("http://" + IP + ":3000/services/garages")
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) {
            setPieceData(Pieces_Data);
          } else {
            //  console.log(data);
            //  setPieceData(data);
            const flatList = [];
            var i = "I";

            // Loop through the data and extract hotel names and phone numbers
            for (const entry of data) {
              const wilaya = entry.wilaya || "";
              const garages = entry.garages || {};
              for (const garage of Object.values(garages)) {
                var name = garage.name || "";
                const phone = garage.phone || "";
                const latitude = garage.latitude || "";
                const longitude = garage.longitude || "";

                name = `${name} ${i}`;
                i = i + " ";
                flatList.push({ wilaya, name, phone, latitude, longitude });
              }
            }
            Pieces_Data = flatList;
            setPieceData(flatList);
            // console.log(flatList);
          }
        });
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setPieceData(Pieces_Data);
    }, 2000);
  };
  const handleAddPieces = () => {
    const params = [
      { label: "Name" },
      { label: "Adress" },
      { label: "Phone" },

      // Add more parameters as needed
    ];
    const pageName = { name: "Pieces" };

    navigation.navigate("AddScreen", { params, pageName });
  };
  return (
    <ScrollView style={style.container}>
      <View style={style.header}>
        <Image
          style={style.img}
          source={require("./Assets/rest_imgs/car_pieces/depositphotos_103971128-stock-photo-concept-of-auto-parts-shopping-removebg-preview-transformed.png")}
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
      <Text style={style.tit}>Auto parts store</Text>
      <FlatList
        style={style.liste}
        data={Pieces_Data}
        renderItem={({ item }) => <GarageItem item={item} />}
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
        <TouchableOpacity style={style.add} onPress={handleAddPieces}>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
            Add Store
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
    width: "75%",
    height: "90%",
    resizeMode: "cover",
  },
  ads: {
    position: "absolute",
    top: "15%",
    right: "15%",
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
