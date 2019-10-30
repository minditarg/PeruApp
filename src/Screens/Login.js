import React, { Component } from "react";
import { View, Image, StyleSheet, ToastAndroid } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
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
//import RNFetchBlob from "react-native-fetch-blob";

import { connect } from "react-redux";
import {
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR
} from "../Actions/actionsTypes";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      submitted: false,
      showToast: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

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
    console.log("handleInicio");

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
        console.log("el error es" + error);
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
                        name="username"
                        value={this.state.username}
                        onChangeText={username => {
                          this.setState({ username });
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
                          console.log(this.state.password);
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
                        onPress={() =>
                          Toast.show({
                            text: "Wrong password!",
                            buttonText: "Okay"
                          })
                        }
                      >
                        <Text style={stl.btnText}>Registarse</Text>
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        block
                        style={stl.btn}
                        onPress={() => this.handleSubmit()}
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
              <Button
                block
                style={stl.btn}
                onPress={() => this.HandleFacebookLoginBtn()}
              >
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
  console.log(state);
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
