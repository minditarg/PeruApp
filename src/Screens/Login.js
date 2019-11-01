import React, { Component } from "react";
import { View, Image, StyleSheet, ToastAndroid, Linking } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import * as WebBrowser from "expo-web-browser";
import queryString from "query-string";
import {
  Container,
  Content,
  Button,
  Text,
  Form,
  Item,
  Input,
  Icon,
  Label,
  Toast
} from "native-base";
import Alerta from "../Componentes/Alertas";
import { connect } from "react-redux";
import {
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  LOAD_TOKEN_USER
} from "../Actions/actionsTypes";

//import fetchApi from "../Funciones/funciones";

import fetchival from "fetchival";
import _ from "lodash";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      submitted: false,
      showToast: false,
      authResult: {},
      isPostBack: false
    };
  }

  Redirigir() {
    if (
      this.state.authResult.type &&
      this.state.authResult.type === "success"
    ) {
      const query = new URLSearchParams(this.state.authResult.url);
      var regex = /[?&]([^=#]+)=([^&#]*)/g,
        params = {},
        match;
      while ((match = regex.exec(this.state.authResult.url))) {
        params[match[1]] = match[2];
      }
      this.props.dispatch({ type: LOAD_TOKEN_USER, payload: params.token });
      this.setState({ isPostBack: false });

      //   console.log();
      if (params.nuevo === "true") {
        console.log("redirigir login nuevi");
      } else if (params.nuevo === "false") {
        console.log("redirigir login vieji");
      }
    }
  }

  // LOGIN De FACEBBOK
  loginFacebook = async () => {
    let redirectUrl = await Linking.getInitialURL();
    let authUrl = "https://10.30.30.125:3000/api/auth/facebook";
    try {
      let authResult = await WebBrowser.openAuthSessionAsync(
        "https://10.30.30.125:3000/api/auth/facebook",
        redirectUrl
      );
      await this.setState({ authResult: authResult, isPostBack: true });
    } catch (err) {
      console.log("ERROR loginfacebook:", err);
    }
  };

  handleSubmit(e) {
    const { username, password } = this.state;
    if (!username) {
      ToastAndroid.show("A pikachu appeared nearby !", ToastAndroid.SHORT);
    }
    this.setState({ submitted: true });
    /*  const { username, password } = this.state;
    if (username && password) {
      this.props.login(username, password);
    }*/
  }

  HandleRegistroBtn() {
    this.props.navigation.navigate("Registrarse");
  }

  HandleInicioBtn() {
    let payload = {
      email: this.state.email,
      password: this.state.password
    };
    fetch("http://10.30.30.125:3001/api/login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        console.log(responseData);
        return responseData;
      });
  }

  caca() {
    //  console.log("handleInicio");

    //Hay que validar mail y contraseña
    // hay que conectarse
    // hay que manejar errores
    // hay que redirigir si todo lo anterior se aprueba.
    this.props.dispatch({ type: FETCH_PRODUCTS_PENDING });
    fetch("https://10.30.30.125:3000/api/proveedores", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        this.props.dispatch({
          type: FETCH_PRODUCTS_SUCCESS,
          payload: res
        });
        return;
      })
      .catch(error => {
        //  console.log("el error es" + error);
        this.props.dispatch({
          type: FETCH_PRODUCTS_ERROR,
          payload: error
        });
      });
  }

  HandleOlvidePassBtn() {
    this.props.navigation.navigate("Olvide");
  }
  HandleFacebookLoginBtn() {
    this.props.navigation.navigate("Olvide");
  }
  HandleGoogleLoginBtn() {
    this.props.navigation.navigate("Olvide");
  }
  render() {
    if (this.state.isPostBack) {
      this.Redirigir();
    }
    //console.log(this.state.authResult);
    return (
      <Container style={stl.container}>
        <Grid>
          <Row size={5}>
            <Col>
              <Row size={2}>
                <Col style={stl.center}>
                  <Image
                    style={stl.logo}
                    source={require("../../assets/icono1.jpg")}
                  />
                </Col>
              </Row>
              <Row size={3}>
                <Col>
                  <Form style={stl.form}>
                    <Item
                      style={stl.itm}
                      floatingLabel
                      error={this.state.submitted && !this.state.username}
                    >
                      <Label style={stl.lbl}>Mail</Label>
                      <Input
                        style={stl.input}
                        keyboardType="email-address"
                        name="email"
                        value={this.state.email}
                        onChangeText={email => {
                          this.setState({ email });
                        }}
                      />
                    </Item>
                    <Item
                      style={stl.itm}
                      floatingLabel
                      error={this.state.submitted && !this.state.password}
                    >
                      <Label style={stl.lbl}>Contraseña</Label>
                      <Input
                        secureTextEntry={true}
                        style={stl.input}
                        name="password"
                        value={this.state.password}
                        onChangeText={password => {
                          this.setState({ password });
                          //  console.log(this.state.password);
                        }}
                      />
                      {this.state.submitted && !this.state.password && (
                        <Text> Username is required</Text>
                      )}
                    </Item>
                  </Form>
                </Col>
              </Row>
              <Row size={2}>
                <Col>
                  <Row size={1}>
                    <Col>
                      <Button
                        style={stl.btn}
                        bordered
                        light
                        onPress={() => {
                          return;
                        }}
                      >
                        <Text style={stl.btnText}>Registarse</Text>
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        block
                        style={stl.btn}
                        onPress={() => this.HandleInicioBtn()}
                      >
                        <Text style={stl.btnText}>Iniciar Sesion</Text>
                      </Button>
                    </Col>
                  </Row>
                  <Row size={1}>
                    <Col style={stl.alignRight}>
                      <Button transparent small>
                        <Text style={stl.btnAyuda}>
                          Ayuda! Olvide mi contraseña
                        </Text>
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row size={2}>
            <Col>
              <Button
                block
                light
                style={stl.btn}
                onPress={() => this.HandleGoogleLoginBtn()}
              >
                <Icon name="home" />
                <Text style={stl.btnText}>Iniciar con Google</Text>
              </Button>
              <Button block style={stl.btn} onPress={this.loginFacebook}>
                <Icon name="home" />
                <Text style={stl.btnText}>Iniciar con Facebook</Text>
              </Button>
            </Col>
          </Row>
        </Grid>

        <Alerta text="recat"></Alerta>
      </Container>
    );
  }
}
mapStateToProps = state => {
  // console.log(state);
  return { seleccion: state };
};
export default connect(mapStateToProps)(Login);

const stl = StyleSheet.create({
  container: { backgroundColor: "#044fb3" },
  center: { justifyContent: "flex-end", alignItems: "center" },
  logo: { width: 40, height: 40, borderRadius: 100 },
  text1: { color: "red", fontWeight: "bold", fontSize: 15 },
  text2: { color: "white", fontWeight: "bold", fontSize: 20 },
  btn: {
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    textAlign: "center"
  },
  btnText: { textAlign: "center" },
  form: {
    marginLeft: 20,
    marginRight: 30
  },
  lbl: {
    color: "whitesmoke"
  },
  input: {
    color: "whitesmoke"
  },
  btnAyuda: {
    color: "silver"
  },
  alignRight: {
    alignItems: "flex-end"
  }
});
