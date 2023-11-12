import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Home from "../../Home";
import Welcom from "../Welcom";

const slides = [
  {
    key: "one",
    title: "Parking",
    text: "Find the perfect parking spot hassle-free with our driver app. Save time and effort by locating available parking spaces near your destination.",
    image: require("../../img/nextScreen/parking.jpg"),
    backgroundColor: "#fff",
  },
  {
    key: "two",
    title: "Restaurant",
    text: "Explore a variety of dining options with our driver app. Discover popular restaurants and eateries nearby, offering a wide range of cuisines to satisfy your cravings.",
    image: require("../../img/nextScreen/restaurant.jpg"),
    backgroundColor: "#fff",
  },
  {
    key: "three",
    title: "Car Evacuation",
    text: "In case of emergencies or road incidents, our driver app provides quick and reliable car evacuation services to ensure your vehicle is safely transported to the nearest service center.",
    image: require("../../img/nextScreen/Deppanage.jpg"),
    backgroundColor: "#fff",
  },
  {
    key: "four",
    title: "Hotel",
    text: "Need a place to stay? Our driver app helps you discover nearby hotels and accommodations, making your travel experience more convenient and comfortable.",
    image: require("../../img/nextScreen/hotel.jpeg"),
    backgroundColor: "#fff",
  },
  {
    key: "five",
    title: "Mechanical & Car Pieces",
    text: "Keep your vehicle in top condition with our driver app. Easily locate nearby mechanical workshops and find the necessary car parts for maintenance or repairs.",
    image: require("../../img/nextScreen/pieces.jpg"),
    backgroundColor: "#fff",
  },
];

export default class Info extends React.Component {
  state = {
    showRealApp: false,
  };

  _renderItem = ({ item, index }) => {
    if (index === slides.length - 1) {
      return (
        <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
          <Image source={item.image} style={styles.img} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      );
    } else {
      return (
        <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
          <Image source={item.image} style={styles.img} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      );
    }
  };

  _onDone = () => {
    this.setState({ showRealApp: true });
  };

  renderNextButton = () => {
    return (
      <View style={styles.nextButton}>
        <FontAwesomeIcon name="angle-right" size={24} color="#000" />
      </View>
    );
  };

  renderDoneButton = () => {
    return (
      <View style={styles.doneButton}>
        <Text style={styles.doneButtonText}>Done</Text>
      </View>
    );
  };

  render() {
    if (this.state.showRealApp) {
      return <Welcom/>;
    } else {
      return (
        <AppIntroSlider
          renderItem={this._renderItem}
          data={slides}
          onDone={this._onDone}
          dotStyle={styles.dotStyle}
          activeDotStyle={{
            backgroundColor: "#84CAE2",
            width: 30,
            marginBottom: 100,
          }}
          renderNextButton={this.renderNextButton}
          renderDoneButton={this.renderDoneButton}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    color: "#84CAE2",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    width:'80%',
    color: "grey",
  },
  dotStyle: {
    backgroundColor: "#C2F9FF",
    marginBottom: 100,
    width: 15,
  },
  nextButton: {
    backgroundColor: "#84CAE2",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  doneButton: {
    backgroundColor: "#84CAE2",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  doneButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  img: {
    width: "100%",
    height: 300,
  },
});
