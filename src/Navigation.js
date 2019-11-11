import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { Text } from "native-base";
import {
  Select,
  Video,
  Login,
  Olvide,
  Registrarse,
  RegistrarProveedor,
  AddServicio,
  AddTrabajo,
  Empresa,
  Servicios,
  Trabajos
} from "../src/Screens/Index";
import { stl } from "./Screens/styles/styles";
import { NavHeader } from "../src/Componentes/NavHeader";
import AppLoad from "./AppLoad";

const TrabajosNav = createStackNavigator(
  {
    Trabajos: Trabajos,
    AddTrabajo: AddTrabajo
  },
  {
    defaultNavigationOptions: {
      header: ({ navigation }) => <NavHeader navigation={navigation.state} />,
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
      header: ({ navigation }) => <NavHeader navigation={navigation.state} />,
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
      header: ({ navigation }) => <NavHeader navigation={navigation.state} />,
      title: "Servicios",
      headerStyle: stl.headerStyle,
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
      activeTintColor: "#fff",
      inactiveTintColor: "#fff",
      inactiveBackgroundColor: "#2e3192",
      activeBackgroundColor: "#464eb7"
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
    Registrarse: Registrarse,
    RegistrarProveedor: RegistrarProveedor
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
