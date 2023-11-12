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
let Dep_Data = [
  {
    name: "Tow Masters",
    latitude: 36.759485,
    longitude: 3.056274,
    wilaya: "Algiers",
  },
  {
    name: "Quick Towing",
    latitude: 35.712983,
    longitude: -0.634109,
    wilaya: "Ain Temouchent",
  },
  {
    name: "Rapid Recovery",
    latitude: 36.764921,
    longitude: 3.067837,
    wilaya: "Boumerdès",
  },
  {
    name: "Rescue Towing",
    latitude: 35.727613,
    longitude: 0.54871,
    wilaya: "Béchar",
  },
  {
    name: "Swift Towing",
    latitude: 34.890837,
    longitude: 1.316896,
    wilaya: "Biskra",
  },
  {
    name: "Express Towing",
    latitude: 35.675886,
    longitude: -0.649198,
    wilaya: "Chlef",
  },
  {
    name: "Emergency Towing",
    latitude: 35.202761,
    longitude: 0.636304,
    wilaya: "Djelfa",
  },
  {
    name: "Rescue Squad",
    latitude: 36.547899,
    longitude: 2.907526,
    wilaya: "Médéa",
  },
  {
    name: "Speedy Towing",
    latitude: 36.817145,
    longitude: 4.546841,
    wilaya: "Tizi Ouzou",
  },
  {
    name: "Reliable Towing",
    latitude: 36.461199,
    longitude: 6.612314,
    wilaya: "Jijel",
  },
];

const DepItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <View style={style.items_rest}>
      <TouchableOpacity style={style.item_rest}>
        <Image
          style={style.img_item}
          source={require("../img/service/images.jpg")}
        />
        <Text style={style.title_item}>{item.name}</Text>
        <Text style={style.wilaya}>{item.wilaya}</Text>
        <Text style={style.phone}>{item.phone}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Evacuatiion() {
  const navigation = useNavigation();

  const [DepData, setDepData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Simulating data fetching
    try {
      await fetch("http://" + IP + ":3000/services/deppanages")
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) {
            setDepData(Dep_Data);
          } else {
            // console.log(data);
            //  setParkingData(data);
            const flatList = [];

            // Loop through the data and extract rests names and phone numbers
            for (const entry of data) {
              const wilaya = entry.wilaya || "";
              const Deps = entry.dep || {};
              for (const dep of Object.values(Deps)) {
                const name = dep.name || "";
                const phone = dep.phone || "";

                if (name === "Abderrahmane" || name === "Bilel") {
                  continue;
                }
                flatList.push({ wilaya, name, phone });
              }
            }
            Dep_Data = flatList;
            setDepData(flatList);
            // console.log(flatList);
          }
        });
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setDepData(Dep_Data);
    }, 2000);
  };

  const handleAddDeppanage = () => {
    const params = [
      { label: "Name" },
      { label: "Adress" },
      { label: "Phone" },

      // Add more parameters as needed
    ];
    const pageName = { name: "Deppanage" };
    navigation.navigate("AddScreen", { params, pageName });
  };
  return (
    <ScrollView style={style.container}>
      <View style={style.header}>
        <Image
          style={style.img}
          source={require("./Assets/rest_imgs/Deppanage/pngegg.png")}
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
      <Text style={style.tit}>Repair </Text>
      <FlatList
        style={style.liste}
        data={Dep_Data}
        renderItem={({ item }) => <DepItem item={item} />}
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
        <TouchableOpacity style={style.add} onPress={handleAddDeppanage}>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
            Add repair
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
    width: "60%",
    height: "90%",
    resizeMode: "contain",
  },
  ads: {
    position: "absolute",
    top: "15%",
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    paddingLeft: 10,
    marginTop: -10,
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
