import React from "react";
import { Image, StyleSheet } from "react-native";
import { AppLoading } from "expo";
import { Container, Text, Content, Button } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { Col, Row, Grid } from "react-native-easy-grid";

import store from "./src/Store";
import { Provider } from "react-redux";

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
} from "./src/Screens/Index";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
    setTimeout(() => {
      // this.setState({ cargo: true });
      this.props.navigation.navigate("Login");
    }, 1);
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Container style={stl.container}>
        <Grid>
          <Row size={1}>
            <Col style={stl.center}>
              <Image style={stl.logo} source={require("./assets/icono1.jpg")} />
              <Text style={stl.text1}>CONSTRUCCIONES</Text>
              <Text style={stl.text2}>SOLUCIONES</Text>
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
}

const stl = StyleSheet.create({
  container: { backgroundColor: "#044fb3" },
  center: { justifyContent: "center", alignItems: "center" },
  logo: { width: 100, height: 100, borderRadius: 100 },
  text1: { color: "red", fontWeight: "bold", fontSize: 15 },
  text2: { color: "white", fontWeight: "bold", fontSize: 20 }
});

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
    Home: App,
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

let Navigation = createAppContainer(RootStack);

export default class Aplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation></Navigation>
      </Provider>
    );
  }
}
