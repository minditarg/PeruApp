import React from "react";

import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

import {
  Select,
  Video,
  Login,
  Olvide,
  Registrarse,
  AddServicio,
  AddTrabajo,
  Empresa,
  Servicios,
  Trabajos
} from "../src/Screens/Index";
import AppLoad from "./AppLoad";
const TrabajosNav = createStackNavigator(
  {
    Trabajos: Trabajos,
    AddTrabajo: AddTrabajo
  },
  {
    defaultNavigationOptions: {
      title: "Trabajos",
      headerStyle: {
        backgroundColor: "#044fb3",
        borderBottomColor: "red",
        borderBottomWidth: 4
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const EmpresaNav = createStackNavigator(
  {
    Empresa: Empresa
  },
  {
    defaultNavigationOptions: {
      title: "Empresa",
      headerStyle: {
        backgroundColor: "#044fb3",
        borderBottomColor: "red",
        borderBottomWidth: 4
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);
const ServiciosNav = createStackNavigator(
  {
    Servicios: Servicios,
    AddServicio: AddServicio
  },
  {
    defaultNavigationOptions: {
      title: "Servicios",
      headerStyle: {
        backgroundColor: "#044fb3",
        borderBottomColor: "red",
        borderBottomWidth: 4
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Trabajos: TrabajosNav,
    Servicios: ServiciosNav,
    Empresa: EmpresaNav
  },
  {
    initialRouteName: "Servicios",
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "#444",
      inactiveTintColor: "#fff",
      inactiveBackgroundColor: "#044fb3",
      activeBackgroundColor: "#fff"
    },
    tabBarStyle: {
      backgroundColor: "#044fb3",
      shadow: "none",
      border: "none",
      fontWeight: "bold"
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        return <Text style={{ color: tintColor }}>{routeName} </Text>;
      }
    })
  }
);

const AppNavigator = createStackNavigator(
  {
    Home: AppLoad,
    Select: Select,
    Video: Video,
    Login: Login,
    Olvide: Olvide,
    Registrarse: Registrarse
  },
  {
    headerMode: "none"
  }
);

const RootStack = createStackNavigator(
  {
    Main: AppNavigator,
    Index: TabNavigator
  },
  {
    headerMode: "none",
    initialRouteName: "Main"
  }
);

export default Navigation = createAppContainer(RootStack);
