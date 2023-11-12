import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import IP from "../Ip";
const AddScreen = ({ route, navigation }) => {
  const { params, pageName } = route.params;
  const [selectedProvince, setSelectedProvince] = useState("");
  const provinces = [
    "Adrar",
    "chlef",
    "laghouat",
    "oum el bouaghi",
    "Batna",
    "bejaia",
    "Biskra",
    "Bechar",
    "Blida",
    "Bouira",
    "Tamanrasset",
    "Tébessa",
    "Tlemcen",
    "Tiaret",
    "Tizi-Ouzou",
    "Alger",
    "Djelfa",
    "Jijel",
    "Sétif",
    "Saïda",
    "Skikda",
    "Sidi Bel Abbès",
    "Annaba",
    "Guelma",
    "Constantine",
    "Medea",
    "Mostaganem",
    "M'sila",
    "Mascara",
    "Ouargla",
    "Oran",
    "El Bayadh",
    "Illizi",
    "Bordj Bou Arreridj",
    "Boumerdès",
    "El-Tarf",
    "Tindouf",
    "Tissemsilt",
    "El-Oued",
    "Khenchela",
    "Souk-Ahras",
    "Tipaza",
    "Mila",
    "Aïn-Defla",
    "Naâma",
    "Aïn-Témouchent",
    "Ghardaïa",
    "Relizane",
    "El M'Ghair",
    "El Meniaa",
    "Ouled Djellal",
    "Bordj Badji Mokhtar",
    "Béni Abbès",
    "Timimoun",
    "Touggourt",
    "Djanet",
    "In Salah",
    "In Guezzam",
  ];
  const [adress, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const handleNameChange = (value) => {
    setName(value);
  };

  const handleAddressChange = (value) => {
    setAddress(value);
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  const handleProvinceChange = (province) => {
    setSelectedProvince(province);
  };

  console.log(pageName);
  const handleRequest = (serv, data) => {
    if (serv === "Pieces") {
      serv = "garage";
    }

    console.log(`http://${IP}:3000/services/${serv}s`);
    console.log(data);
    fetch(`http://${IP}:3000/services/${serv}s`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Added successfully! 🏨 ");
        } else if (res.status === 500) {
          console.log(res.status);
          alert("Error updating ");
        } else if (res.status === 501) {
          return alert("Posts Limit Reached! 📈");
        } else {
          console.log(res.status);
          alert("Please Login First! 🔑 ");
        }
      })
      .catch((err) => alert(err));
  };
  const handleSubmition = () => {
    let data = {
      wilaya: selectedProvince,
    };
    var serv;
    switch (pageName.name) {
      case "Hotel":
        data.hotel = {
          name: name,
          longitude: "",
          latitude: "",
          phone: phone,
        };
        serv = "hotel";
        break;
      case "Restaurant":
        data.restaurant = {
          name: name,
          longitude: "",
          latitude: "",
          phone: phone,
        };
        serv = "restaurant";
        break;
      case "Mechanicien":
        data.mechanic = {
          name: name,
          longitude: "",
          latitude: "",
          phone: phone,
        };
        serv = "mechanic";
        break;
      case "Deppanage":
        data.deppanage = {
          name: name,
          longitude: "",
          latitude: "",
          phone: phone,
        };
        serv = "deppanage";
        break;
      case "Pieces":
        data.garage = {
          name: name,
          longitude: "",
          latitude: "",
          phone: phone,
        };
        serv = "garage";
        break;
      case "Parking":
        data.parking = {
          name: name,
          longitude: "",
          latitude: "",
          phone: phone,
        };
        serv = "parking";
        break;
      default:
        break;
    }

    console.log(serv);
    console.log(data);

    fetch(
      `https://eu1.locationiq.com/v1/search?key=pk.fa501997e1c9e3b522cb551b22d90369&q=${selectedProvince},${adress}&format=json`
    )
      .then((response) => response.json())
      .then((res) => {
        data[serv].longitude = res[0].lon;
        data[serv].latitude = res[0].lat;
        //console.log(data[0].lat);
        //console.log(data[0].lon);
        console.log(res[0].display_name);
        // alert("Adress Found is 📝✍ " + res[0].display_name);
        pageName.name = pageName.name.toLowerCase();
        console.log(data);
        console.log(pageName.name);
        handleRequest(serv, JSON.stringify(data));
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={styles.container}>
      <View key={"Name"} style={styles.item}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={handleNameChange}
        />
      </View>
      <View key={"Adress"} style={styles.item}>
        <Text style={styles.label}>Adress</Text>
        <TextInput
          style={styles.input}
          placeholder="Adress"
          onChangeText={handleAddressChange}
        />
      </View>
      <View key={"Phone"} style={styles.item}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone"
          onChangeText={handlePhoneChange}
        />
      </View>
      <View style={styles.list}>
        <Text style={styles.label}>Select Province:</Text>
        <Picker
          selectedValue={selectedProvince}
          onValueChange={handleProvinceChange}
        >
          <Picker.Item label=" Select a province" value="" style={styles.txt} />
          {provinces.map((province, index) => (
            <Picker.Item key={index} label={province} value={province} />
          ))}
        </Picker>
      </View>
      <View>
        <TouchableOpacity style={styles.btn} onPress={handleSubmition}>
          <Text style={styles.text}>Add {pageName.name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingHorizontal: 20,
    display: "flex",
    alignItems: "center",
  },
  item: {
    width: "100%",
    display: "flex",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#84CAE2",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  btn: {
    backgroundColor: "#84CAE2",
    marginTop: 40,
    width: 200,
    height: 40,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
  },
  list: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "#fff",
  },
  txt: {
    fontWeight: "bold",
    fontSize: 17,
  },
});

export default AddScreen;
