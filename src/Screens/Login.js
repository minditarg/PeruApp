import React, { Component } from "react";
import {
  Image,
  Linking,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import * as WebBrowser from "expo-web-browser";
import {
  Button,
  Text,
  Form,
  Item,
  Input,
  Label,
  Toast,
  Spinner
} from "native-base";
import { connect } from "react-redux";
import { LOAD_TOKEN_USER } from "../Actions/actionsTypes";
import * as session from "../Services/session";
import * as api from "../Services/api";

import dismissKeyboard from "react-native/Libraries/Utilities/dismissKeyboard";
import { stl } from "./styles/styles";

class Login extends Component {
  constructor() {
    super();
    this.initialState = {
      email: "",
      password: "",
      submitted: false,
      showToast: false,
      authResult: {},
      isPostBack: false,
      isLoading: false,
      error: null,
      passwordInput: ""
    };

    this.state = this.initialState;
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
    let authUrl = "https://50.63.166.215:5000/api/auth/facebook";
    try {
      let authResult = await WebBrowser.openAuthSessionAsync(
        "https://50.63.166.215:5000/api/auth/facebook",
        redirectUrl
      );
      await this.setState({ authResult: authResult, isPostBack: true });
    } catch (err) {
      console.log("ERROR loginfacebook:", err);
    }
  };

    // LOGIN De FACEBBOK
    loginGoogle = async () => {
      let redirectUrl = await Linking.getInitialURL();
      let authUrl = "http://192.168.56.1:3001/api/auth/google";
      try {
        let authResult = await WebBrowser.openAuthSessionAsync(
          "http://192.168.56.1:3001/api/auth/google",
          redirectUrl
        );
        await this.setState({ authResult: authResult, isPostBack: true });
      } catch (err) {
        console.log("ERROR logiGoogle:", err);
      }
    };

  HandleRegistroBtn() {
    this.props.navigation.navigate("Registrarse");
  }
  HandleOlvidePass() {
    this.props.navigation.navigate("Olvide");
  }

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
          let email= this.state.email;
          this.setState(this.initialState);
          if (session.esUsuarioTipoCliente())
            this.props.navigation.navigate("FeedServicios");
          else if (session.esUsuarioTipoEmpresa() && session.usuarioLogueado().Proveedor != null)
            this.props.navigation.navigate("Servicios");
          else {
            //se pudo registrar pero no completo los datos particulares
            if (session.esAppTipoCliente()) {
              this.props.navigation.navigate("Trabajos");
            } else {
              this.props.navigation.navigate("RegistrarProveedor");
            }
          }
        } else {
          if (response.error) {
            this.setState({ isLoading: false, error: response.error });
          } else {
            this.setState({ isLoading: false, error: response.message });
          }
          Toast.show({
            text: this.state.error,
            buttonText: "OK",
            position: "top",
            type: "danger"
          });
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
      <KeyboardAvoidingView behavior="padding" enabled>
        <SafeAreaView style={stl.container}>
          <ImageBackground
            source={require("../../assets/bkblues.png")}
            style={stl.imgBkground}
          >
            <ScrollView>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Grid>
                  <Row size={2}>
                    <Image
                      style={stl.imgLogoGrande}
                      source={require("../../assets/img-header-18.png")}
                    />
                  </Row>
                  <Row size={3}>
                    <Col>
                      <Form style={stl.form}>
                        <Item
                          floatingLabel
                          error={this.state.submitted && !this.state.email}
                        >
                          <Label style={stl.textwhite}>Mail</Label>
                          <Input
                            style={stl.textwhite}
                            keyboardType="email-address"
                            name="email"
                            value={this.state.email}
                            onSubmitEditing={event => {
                              this._pass._root.focus();
                            }}
                            onChangeText={email => {
                              this.setState({ email });
                            }}
                          />
                        </Item>
                        {this.state.submitted && !this.state.email && (
                          <Text style={stl.txtError}>
                            {" "}
                            El email es requerido
                          </Text>
                        )}
                        <Item
                          floatingLabel
                          error={this.state.submitted && !this.state.password}
                        >
                          <Label style={stl.textwhite}>Contraseña</Label>
                          <Input
                            getRef={c => (this._pass = c)}
                            secureTextEntry={true}
                            style={stl.textwhite}
                            name="password"
                            value={this.state.password}
                            onSubmitEditing={() => {
                              Keyboard.dismiss;
                            }}
                            onChangeText={password => {
                              this.setState({ password });
                            }}
                          />
                        </Item>
                        {this.state.submitted && !this.state.password && (
                          <Text style={stl.txtError}>
                            La contraseña es requerida
                          </Text>
                        )}
                        <View style={stl.btnsRow}>
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

                          <Button
                            block
                            ref={"logins"}
                            style={[stl.btn, stl.primary]}
                            onPress={() => this.HandleInicioBtn()}
                          >
                            <Text style={stl.btnText}>Iniciar Sesion</Text>
                          </Button>
                        </View>
                        <View style={stl.btnsRow}>
                          <Button
                            transparent
                            small
                            onPress={() => {
                              this.HandleOlvidePass();
                            }}
                          >
                            <Text style={stl.textwhite}>
                              Ayuda! Olvide mi contraseña
                            </Text>
                          </Button>
                        </View>
                        <View style={[stl.btnsRow, stl.mTop20]}>
                          <Button
                            iconLeft
                            block
                            light
                            style={[stl.btn, stl.Google]}
                            onPress={this.loginGoogle}
                          >
                            <Image
                              source={require("../../assets/google.png")}
                              style={stl.iconoImg}
                              name="google"
                            />
                            <Text style={stl.btnTextRsGoogle}>Usar Google</Text>
                          </Button>

                          <Button
                            iconLeft
                            style={[stl.btn, stl.Face]}
                            onPress={this.loginFacebook}
                          >
                            <Image
                              source={require("../../assets/facebook.png")}
                              style={stl.iconoImg}
                              name="facebook"
                            />

                            <Text style={stl.btnTextRsFace}>Usar Facebook</Text>
                          </Button>
                        </View>
                      </Form>
                    </Col>
                  </Row>

                  {this.state.isLoading && (
                    <View style={stl.loading}>
                      <View style={stl.loadingbk}>
                        <Spinner color="white" />
                      </View>
                    </View>
                  )}
                </Grid>
              </TouchableWithoutFeedback>
            </ScrollView>
          </ImageBackground>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

export default Login;
