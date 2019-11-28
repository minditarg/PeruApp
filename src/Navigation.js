import React from "react";
import { Root } from "native-base";
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
  UpdateServicio,
  AddTrabajo,
  Empresa,
  Servicios,
  Trabajos,
  DetalleTrabajo,
  EmpresaDetail,
  FeedServicios,
  ServicioDetail,
  TipoServicio,
  TrabajosHechos,
  ClientePerfil
} from "../src/Screens/Index";
import { stl } from "./Screens/styles/styles";
import NavHeader from "../src/Componentes/NavHeader";
import AppLoad from "./AppLoad";

const ClienteTrabajos = createStackNavigator(
  {
    TrabajosHechos: TrabajosHechos,
    DetalleTrabajo: DetalleTrabajo
  },
  {
    defaultNavigationOptions: {
      header: ({ navigation }) => <NavHeader navigation={navigation} />,
      title: "TrabajosHechos",
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

const ClienteServicios = createStackNavigator(
  {
    TipoServicio: TipoServicio,
    FeedServicios: FeedServicios,
    ServicioDetail: ServicioDetail,
    EmpresaDetail: EmpresaDetail
  },
  {
    defaultNavigationOptions: {
      header: ({ navigation }) => <NavHeader navigation={navigation} />,
      title: "TipoServicio",
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

const PerfilNav = createStackNavigator(
  {
    UserPerfil: ClientePerfil
  },
  {
    defaultNavigationOptions: {
      header: ({ navigation }) => <NavHeader navigation={navigation} />,
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

/* BottomTabs Empresa  */
const ClientTabNavigator = createBottomTabNavigator(
  {
    ClientTrabajos: ClienteTrabajos,
    ClientServicios: ClienteServicios,
    Perfil: PerfilNav
  },
  {
    initialRouteName: "ClientServicios",
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "#fff",
      inactiveTintColor: "#fff",
      inactiveBackgroundColor: "#4d50a2",
      activeBackgroundColor: "#5b62bf"
    },
    tabBarStyle: {
      backgroundColor: "#4d50a2",
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

/* Trabajos Empresa stack */
const TrabajosNav = createStackNavigator(
  {
    Trabajos: Trabajos,
    AddTrabajo: AddTrabajo
  },
  {
    defaultNavigationOptions: {
      header: ({ navigation }) => <NavHeader navigation={navigation} />,
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

/* Perfil Empresa stack */
const EmpresaNav = createStackNavigator(
  {
    Empresa: Empresa
  },
  {
    defaultNavigationOptions: {
      header: ({ navigation }) => <NavHeader navigation={navigation} />,
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

/* Servicios Empresa stack */
const ServiciosNav = createStackNavigator(
  {
    Servicios: Servicios,
    AddServicio: AddServicio,
    UpdateServicio: UpdateServicio
  },
  {
    defaultNavigationOptions: {
      header: ({ navigation }) => <NavHeader navigation={navigation} />,
      title: "Servicios",
      headerStyle: stl.headerStyle,
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

/* BottomTabs Empresa  */
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
      inactiveBackgroundColor: "#4d50a2",
      activeBackgroundColor: "#5b62bf"
    },
    tabBarStyle: {
      backgroundColor: "#4d50a2",
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

/* Login stack */
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

/* Root navigation */
const RootStack = createStackNavigator(
  {
    Main: AppNavigator,
    Index: TabNavigator,
    Cliente: ClientTabNavigator
  },
  {
    headerMode: "none",
    initialRouteName: "Main"
  }
);

const Nav = createAppContainer(RootStack);

export default () => (
  <Root>
    <Nav></Nav>
  </Root>
);
