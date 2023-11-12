import { useState, useEffect } from "react";
import { View, Text, Image, TextInput, Button, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import * as React from "react";
import { IconButton, MD3Colors } from "react-native-paper";
import IP from "../../Ip";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Parking_Data = [
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

export default function ServicesEdit({ route, navigation }) {
  const [Data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = route.params;
  //console.log(IP);
  //console.log(params.data);
  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const fetchData = () => {
    fetch("http://" + IP + ":3000/services/" + params.data)
      .then((res) => {
        return res.json();
      })
      .then(async (jd) => {
        const flatList = [];
        var i = " ";
        const ALL = await jd;
        for (const entry of ALL) {
          const wilaya = entry.wilaya || "";
          var servs;
          if (entry[params.data]) {
            servs = entry[params.data];
          } else {
            servs = entry.dep;
          }
          for (const serv of Object.values(servs)) {
            var name = serv.name || "";
            const phone = serv.phone || "";
            name = name + i;
            i = i + " ";
            flatList.push({ wilaya, name, phone });
          }
        }
        //console.log(flatList)
        setData(flatList);
      })
      .catch((err) => console.log(err));
  };

  const renderItem = ({ item }) => {
    return (
      <View style={style.itemContainer}>
        <Text style={style.itemName}>{item.name}</Text>
        <Text style={style.itemLocation}>{item.wilaya}</Text>
        <Text style={style.itemLocation}>{item.phone}</Text>
        {/* <Text style={style.itemCoordinates}>
          Latitude: {item.latitude}, Longitude: {item.longitude}
        </Text> */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "40%",
            marginTop: 20,
          }}
        >
          <MaterialIcons
            name="delete"
            size={25}
            color="#ff0000"
            onPress={() => {
              console.log(item.name);
              console.log(item.wilaya);
              console.log(params.data.slice(0, params.data.length - 1));
              var data = {};
              data.wilaya = item.wilaya;
              data[params.data.slice(0, params.data.length - 1)] = {
                name: item.name.trim(),
              };
              // console.log(data);
              fetch("http://" + IP + ":3000/services/" + params.data, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              })
                .then((res) => {
                  if (res.status === 200) {
                    return res.json();
                  } else return false;
                })
                .then((jd) => {
                  if (jd) {
                    alert("Service Deleted Successfully");
                    return fetchData();
                  } else {
                    alert("Error Deleting Service");
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          />

          <MaterialIcons
            name="create"
            size={25}
            color="#fff"
            onPress={() => console.log("Edit")}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={style.container}>
      {isLoading ? (
        <ActivityIndicator animating={true} size="large" color="#FFF" />
      ) : (
        <FlatList
          style={{ width: "90%" }}
          data={Data}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#84CAE2",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    // backgroundColor: "#212121",
    borderWidth: 2,
    borderColor: "#050606",

    width: "90%",
  },
  itemName: {
    color: "#050606",
    fontSize: 18,
    fontWeight: "bold",
  },
  itemLocation: {
    fontSize: 16,
    color: "#fff",
  },
  itemCoordinates: {
    fontSize: 12,

    color: "#fff",
  },
});
