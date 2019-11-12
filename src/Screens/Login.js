import React, { Component } from "react";
import {
  Image,
  Linking,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
  View,
  ScrollView,
  SafeAreaView
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import * as WebBrowser from "expo-web-browser";
import { Button, Text, Form, Item, Input, Label } from "native-base";
import { connect } from "react-redux";
import { LOAD_TOKEN_USER } from "../Actions/actionsTypes";
import * as session from "../Services/session";
import * as api from "../Services/api";

import dismissKeyboard from "react-native/Libraries/Utilities/dismissKeyboard";
import { stl } from "./styles/styles";

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
          this.props.navigation.navigate("Servicios");
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
                          onChangeText={email => {
                            this.setState({ email });
                          }}
                        />
                      </Item>
                      {this.state.submitted && !this.state.email && (
                        <Text style={stl.txtError}> El email es requerido</Text>
                      )}
                      <Item
                        floatingLabel
                        error={this.state.submitted && !this.state.password}
                      >
                        <Label style={stl.textwhite}>Contraseña</Label>
                        <Input
                          secureTextEntry={true}
                          style={stl.textwhite}
                          name="password"
                          value={this.state.password}
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
                      <Text style={stl.txtError}> {this.state.error}</Text>
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
                          onPress={() => this.HandleGoogleLoginBtn()}
                        >
                          <Image
                            source={require("../../assets/google.png")}
                            style={stl.iconoImg}
                            name="google"
                          />
                          <Text style={stl.btnTextRs}>Usar Google</Text>
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

                          <Text style={stl.btnTextRs}>Usar Facebook</Text>
                        </Button>
                      </View>
                    </Form>
                  </Col>
                </Row>
              </Grid>
            </TouchableWithoutFeedback>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
mapStateToProps = state => {
  return { seleccion: state };
};
export default connect(mapStateToProps)(Login);
