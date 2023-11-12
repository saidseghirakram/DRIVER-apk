import React, { useEffect, useState, useCallback } from "react";
import { ScrollView, RefreshControl } from "react-native-gesture-handler";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import IP from "../../Ip";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const fetchData = () => {
    fetch(`http://${IP}:3000/admin/users`)
      .then((res) => {
        return res.json();
      })
      .then((jd) => {
        console.log(jd);
        setUsers(jd);
      })
      .catch((err) => console.log(err));
  };

  const renderItem = ({ item }) => {
    return (
      <View style={style.itemContainer}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
          User ID: <Text style={style.Detail}> {item._id}</Text>
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
          User Name:
          <Text style={style.Detail}> {item.userName}</Text>
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
          Email :<Text style={style.Detail}> {item.email}</Text>
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
          {" "}
          Password :<Text style={style.Detail}> {item.password}</Text>
        </Text>
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
            size={20}
            color="#ff0000"
            onPress={() => {
              fetch(`http://${IP}:3000/admin/users/${item._id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((res) => {
                  if (res.status === 200) {
                    return res.json();
                  } else return false;
                })
                .then((jd) => {
                  if (jd) {
                    alert("User Deleted Successfully");
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
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.userName}
        />
      )}
    </View>
  );
};

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
  Detail: {
    color: "#050606",
    fontSize: 15,
    fontWeight: "normal",
  },
});

export default Users;
