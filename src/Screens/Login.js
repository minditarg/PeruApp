import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Linking,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import * as WebBrowser from "expo-web-browser";
import queryString from "query-string";
import {
  Container,
  Button,
  Text,
  Form,
  Item,
  Input,
  Icon,
  Label
} from "native-base";
import Alerta from "../Componentes/Alertas";
import { connect } from "react-redux";
import {
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  LOAD_TOKEN_USER
} from "../Actions/actionsTypes";
import * as Fx from "../Funciones/funciones";
import * as session from "../Services/session";
import * as api from "../Services/api";
import dismissKeyboard from "react-native/Libraries/Utilities/dismissKeyboard";
import { ThemeColors } from "react-navigation";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      submitted: false,
      showToast: false,
      authResult: {},
      isPostBack: false,
      isLoading: false,
      error: null
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

  HandleRegistroBtn() {
    this.props.navigation.navigate("Registrarse");
  }
  HandleOlvidePass() {
    this.props.navigation.navigate("Olvide");
  }

  // HandleInicioBtn() {
  //   Fx.Fetchiar('login/',{ email: this.state.email,
  //                           password: this.state.password
  //                         }, 'post')
  //   .then(response => {
  //     if(response.statusType=="success"){
  //       console.log (response.data);
  //       this.props.dispatch({ type: LOAD_TOKEN_USER, payload: response.data.token });
  //       this.props.navigation.navigate("Servicios");
  //     }else{
  //       console.log (response.data);
  //     }
  //   })
  //   .catch(error => console.log (error));
  // }

  HandleInicioBtn() {
    this.setState({
      isLoading: true,
      submitted: true,
      error: ""
    });
    dismissKeyboard();
    session
      .authenticate(this.state.email, this.state.password)
      .then(response => {
        if (response.statusType == "success") {
          this.setState(this.initialState);
          this.props.navigation.navigate("Trabajos");
        } else {
          this.setState({ error: response.message });
        }
      })
      .catch(exception => {
        const error = api.exceptionExtractError(exception);
        this.setState({
          isLoading: false,
          ...(error ? { error } : {})
        });

        if (!error) {
          throw exception;
        }
      });
  }

  render() {
    if (this.state.isPostBack) {
      this.Redirigir();
    }
    return (
      <Container style={stl.container}>
        <ImageBackground
          source={require("../../assets/splash.png")}
          style={{ width: "100%", height: "100%" }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Grid style={{ padding: 10 }}>
              <Row size={2}></Row>

              <Row size={1}>
                <Col>
                  <Form style={stl.form}>
                    <Item
                      style={stl.itm}
                      floatingLabel
                      error={this.state.submitted && !this.state.email}
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
                    {this.state.submitted && !this.state.email && (
                      <Text style={stl.text1}> El email es requerido</Text>
                    )}
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
                        }}
                      />
                    </Item>
                    {this.state.submitted && !this.state.password && (
                      <Text style={stl.text1}> La contraseña es requerida</Text>
                    )}
                    <Text style={stl.text1}> {this.state.error}</Text>
                  </Form>
                </Col>
              </Row>

              <Row size={1}>
                <Col>
                  <Row
                    size={1}
                    style={{ paddingHorizontal: 35, paddingTop: 20 }}
                  >
                    <Col>
                      <Button
                        style={stl.btn}
                        bordered
                        light
                        onPress={() => {
                          this.HandleRegistroBtn();
                        }}
                      >
                        <Text style={stl.btnText}>Registarse</Text>
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        block
                        style={[stl.btn, stl.primary]}
                        onPress={() => this.HandleInicioBtn()}
                      >
                        <Text style={stl.btnText}>Iniciar Sesion</Text>
                      </Button>
                    </Col>
                  </Row>
                  <Row
                    size={1}
                    style={{ paddingHorizontal: 20, paddingVertical: 20 }}
                  >
                    <Col style={stl.alignRight}>
                      <Button
                        transparent
                        small
                        onPress={() => {
                          this.HandleOlvidePass();
                        }}
                      >
                        <Text style={stl.btnAyuda}>
                          Ayuda! Olvide mi contraseña
                        </Text>
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row size={1}>
                <Col>
                  <Button
                    block
                    light
                    style={stl.btn}
                    onPress={() => this.HandleGoogleLoginBtn()}
                  >
                    <Image
                      source={require("../../assets/google.png")}
                      style={stl.iconoImg}
                      name="google"
                    />
                    <Text style={stl.btnText}>Usar Google</Text>
                  </Button>
                </Col>
                <Col>
                  <Button
                    block
                    style={stl.btnFace}
                    onPress={this.loginFacebook}
                  >
                    <Image
                      source={require("../../assets/facebook.png")}
                      style={stl.iconoImg}
                      name="facebook"
                    />

                    <Text style={stl.btnText}>Usar Facebook</Text>
                  </Button>
                </Col>
              </Row>
            </Grid>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </Container>
    );
  }
}
mapStateToProps = state => {
  return { seleccion: state };
};
export default connect(mapStateToProps)(Login);

const stl = StyleSheet.create({
  primary: {
    backgroundColor: "#2392e5"
  },
  container: { backgroundColor: "#044fb3" },
  center: { justifyContent: "flex-end", alignItems: "center" },
  logo: { width: 40, height: 40, borderRadius: 100 },
  text1: { color: "red", fontWeight: "bold", fontSize: 15 },
  text2: { color: "white", fontWeight: "bold", fontSize: 20 },
  btn: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    margin: 5,
    padding: 0,
    textAlign: "center",
    borderRadius: 5
  },
  btnFace: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    margin: 5,
    padding: 0,
    textAlign: "center",
    borderRadius: 5,
    backgroundColor: "#4a6ea8"
  },
  iconoImg: {
    height: 40,
    width: 40,
    margin: 0,
    padding: 0
  },
  btnOpacity: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    margin: 0,
    padding: 0,
    textAlign: "center"
  },
  btnText: { margin: 0, padding: 0, textAlign: "center" },
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
    color: "white"
  },
  alignRight: {
    alignItems: "flex-end"
  }
});
