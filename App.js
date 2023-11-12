import React, { useCallback, useEffect } from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import LoaderPage from "./src/Screen/Loader";
import AddScreen from "./src/services_screen/Add_Screen";
import Info from "./src/Screen/infoPage/Info_Screens";
import GetStartedPage from "./src/Screen/StartedScreen";
import Welcom from "./src/Screen/Welcom";
import Map from "./src/Map";
import Account from "./src/Account";
import Home from "./src/Home";
import CustomBottomBar from "./src/Bar";
import Hotel from "./src/services_screen/Hotel";
import Evacuatiion from "./src/services_screen/Deppanage";
import Resturant from "./src/services_screen/Resturant";
import Pieces from "./src/services_screen/Pieces";
import Mecanicien from "./src/services_screen/Mecanicien";
import Parking from "./src/services_screen/Parking";
import Edit from "./src/Edit_Profile";
import Password from "./src/Account_screen/Password";
import InfoApp from "./src/Account_screen/Info";
import Update from "./src/Account_screen/Update";
import SignUp from "./src/Sign";
import LogIn from "./src/Login";
import { Button, Avatar } from "react-native-paper";
import Destination from "./src/Destination";
import AdminSpace from "./src/Admin/Account_screen/AdminSpace";
import ServicesAdmin from "./src/Account_screen/ScreenAdmin/ServicesAdmin";
import MapAdmin from "./src/Account_screen/ScreenAdmin/MapAdmin";
import ServicesEdit from "./src/Account_screen/ScreenAdmin/ServicesEdit";
import UserAdmin from "./src/Account_screen/ScreenAdmin/UserAdmin";
import { LogBox } from "react-native";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  LogBox.ignoreAllLogs();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: { backgroundColor: "#fff" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
          tabBarActiveTintColor: "#84CAE2",
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="map-pin" size={24} color={color} />
          ),
          tabBarActiveTintColor: "#84CAE2",
        }}
      />
      <Tab.Screen
        name="profile"
        component={Account}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={24} color={color} />
          ),
          tabBarActiveTintColor: "#84CAE2",
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoaderPage"
          component={LoaderPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Destination"
          component={Destination}
          options={{ headerShown: true, title: "Destination" }}
        />

        <Stack.Screen
          name="Edit_Profile"
          component={Edit}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Repair"
          component={Evacuatiion}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Hotel"
          component={Hotel}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Resturant"
          component={Resturant}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Pieces"
          component={Pieces}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Mecanicien"
          component={Mecanicien}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Parking"
          component={Parking} /* options={{ headerShown: false }} */
        />
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddScreen"
          component={AddScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Info"
          component={Info}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GetStartedPage"
          component={GetStartedPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcom"
          component={Welcom}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Change Password"
          component={Password}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="InfoApp"
          component={InfoApp}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Update"
          component={Update}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="LogIn"
          component={LogIn}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="AdminSpace"
          component={AdminSpace}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="ServicesAdmin"
          component={ServicesAdmin}
          options={{ headerShown: true, title: "Services" }}
        />
        <Stack.Screen
          name="Style_Map"
          component={MapAdmin}
          options={{ headerShown: true, title: "Configure Map Style" }}
        />
        <Stack.Screen
          name="ServicesEdit"
          component={ServicesEdit}
          options={{
            headerShown: true,
            title: "Edit Services",
          }}
        />
        <Stack.Screen
          name="UserAdmin"
          component={UserAdmin}
          options={{
            headerShown: true,
            title: "Users",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
