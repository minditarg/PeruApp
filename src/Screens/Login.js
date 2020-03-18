import React, { Component } from "react";
import {
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { Linking,AuthSession } from 'expo';
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
import * as clientesService from '../Services/clientes'
import * as api from "../Services/api";
import apiConfig from "../Services/api/config";
import dismissKeyboard from "react-native/Libraries/Utilities/dismissKeyboard";
import { stl } from "./styles/styles";
import Constants from 'expo-constants';
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
  _handleRedirect = event => {
    if (Constants.platform.ios) {
      WebBrowser.dismissBrowser();
    } else {
      this._removeLinkingListener();
    }
    let data = Linking.parse(event.url);
    this.HandleInicioSocialBtn(data.queryParams.token);
  };
  loginFacebook = async () => {
    try {
      this._addLinkingListener();
      let result = await WebBrowser.openBrowserAsync(
        apiConfig.url + "/auth/facebook"
      );
      if (Constants.platform.ios) {
        this._removeLinkingListener();
      }

      this.setState({ result });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
   loginGoogle = async () => {
    try {
      this._addLinkingListener();
      let result = await WebBrowser.openBrowserAsync(
        apiConfig.url + "/auth/google"
      );
      if (Constants.platform.ios) {
        this._removeLinkingListener();
      }

      this.setState({ result });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  _addLinkingListener = () => {
    Linking.addEventListener('url', this._handleRedirect);
  };

  _removeLinkingListener = () => {
    Linking.removeEventListener('url', this._handleRedirect);
  };


  HandleRegistroBtn() {
    this.props.navigation.navigate("Registrarse");
  }
  HandleOlvidePass() {
    this.props.navigation.navigate("Olvide");
  }
  HandleInicioSocialBtn(token) {
    this.setState({
      isLoading: true,
      error: ""
    });
    session
      .guardarToken(token)
      .then(response => {
        if (response) {
          this.setState(this.initialState);
          console.log(session.esAppTipoCliente(), "session.esAppTipoCliente()");
          if (session.esUsuarioTipoCliente())
            this.props.navigation.navigate("FeedServicios");
          else if (session.esUsuarioTipoEmpresa() && session.usuarioLogueado().Proveedor != null)
            this.props.navigation.navigate("Servicios");
          else {
            //se pudo registrar pero no completo los datos particulares
            if (session.esAppTipoCliente()) {
              clientesService.crear().then(resp=> this.props.navigation.navigate("FeedServicios"));
            } else {
              this.props.navigation.navigate("RegistrarProveedor");
            }
          }
        }else{
          this.props.navigation.navigate("Select");
        }
      })
      .catch(exception => {
        console.log(exception);
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
          console.log(response);
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
        console.log(exception);
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
