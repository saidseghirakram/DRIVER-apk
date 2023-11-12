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
var Rest_Data = [
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

const RestaurantItem = ({ item }) => {
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
          source={require("./Assets/rest_imgs/rest/carolina-marinelli-PkbyxvkGWcU-unsplash.jpg")}
        />
        <Text style={style.title_item}>{item.name}</Text>
        <Text style={style.wilaya}>{item.wilaya}</Text>
        <Text style={style.phone}>{item.phone}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Resturant() {
  const navigation = useNavigation();
  const [RestData, setRestData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Simulating data fetching
    try {
      await fetch("http://" + IP + ":3000/services/restaurants")
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) {
            setRestData(Rest_Data);
          } else {
            // console.log(data);
            //  setRestData(data);
            const flatList = [];

            // Loop through the data and extract hotel names and phone numbers
            for (const entry of data) {
              const wilaya = entry.wilaya || "";
              const restaurants = entry.restaurants || {};
              for (const restaurant of Object.values(restaurants)) {
                var name = restaurant.name || "";
                const phone = restaurant.phone || "";
                const latitude = restaurant.latitude || "";
                const longitude = restaurant.longitude || "";
                
                flatList.push({ wilaya, name, phone, latitude, longitude });
              }
            }
            Rest_Data = flatList;
            setRestData(flatList);
            // console.log(flatList);
          }
        });
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setRestData(Rest_Data);
    }, 2000);
  };
  const handleAddRestaurant = () => {
    const params = [
      { label: "Name" },
      { label: "Adress" },
      { label: "Phone" },
      // Add more parameters as needed
    ];
    const pageName = { name: "Restaurant" };
    navigation.navigate("AddScreen", { params, pageName });
  };
  return (
    <ScrollView style={style.container}>
      <View style={style.header}>
        <Image
          style={style.img}
          source={require("../img/service/resturant_ads.png")}
        />
        <View style={style.ads}>
          <Text style={style.title}>30% Off Today</Text>
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
              icon="hamburger"
              color="#84CAE2"
              style={{ backgroundColor: "transparent" }}
              theme={{ roundness: 0 }}
            />
            <Text style={style.text}>Burger</Text>
          </TouchableOpacity>
        </View>

        <View style={style.item}>
          <TouchableOpacity style={style.btn}>
            <Avatar.Icon
              size={70}
              icon="pizza"
              color="#84CAE2"
              style={{ backgroundColor: "transparent" }}
              theme={{ roundness: 0 }}
            />
            <Text style={style.text}>Pizza</Text>
          </TouchableOpacity>
        </View>

        <View style={style.item}>
          <TouchableOpacity style={style.btn}>
            <Avatar.Icon
              size={70}
              icon="table-chair"
              color="#84CAE2"
              style={{ backgroundColor: "transparent" }}
              theme={{ roundness: 0 }}
            />
            <Text style={style.text}>Dinner</Text>
          </TouchableOpacity>
        </View>

        <View style={style.item}>
          <TouchableOpacity style={style.btn}>
            <Avatar.Icon
              size={70}
              icon="fish"
              color="#84CAE2"
              style={{ backgroundColor: "transparent" }}
              theme={{ roundness: 0 }}
            />
            <Text style={style.text}>Fishery</Text>
          </TouchableOpacity>
        </View>

        <View style={style.item}>
          <TouchableOpacity style={style.btn}>
            <Avatar.Icon
              size={70}
              color="#84CAE2"
              icon="glass-wine"
              style={{ backgroundColor: "transparent" }}
              theme={{ roundness: 0 }}
            />
            <Text style={style.text}>Drinks</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={style.tit}>Resturants</Text>
      <FlatList
        style={style.liste}
        data={Rest_Data}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <RestaurantItem item={item} />}
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
        <TouchableOpacity style={style.add} onPress={handleAddRestaurant}>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
            Add Resturant
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
    width: "80%",
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
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    paddingLeft: 10,
  },
  /* end add */
});
