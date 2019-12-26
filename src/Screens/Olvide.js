import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  Container,
  Button,
  Text,
  Form,
  Item,
  Input,
  Label,
  Spinner
} from "native-base";
import { stl } from "./styles/styles";
import * as usuarioServicio from "../Services/usuario";

export class Olvide extends Component {
  constructor() {
    super();
    this.initialState = {
      email: "",
      submitted: false,
      isLoading: false,
      error: null,
      mostrarFormularioPassword: false,
      password: "",
      passwordConfirm: "",
      codigo: ""
    };

    this.state = this.initialState;
  }

  HandleEnviarAyuda() {
    this.setState({ isLoading: true });
    dismissKeyboard();
    usuarioServicio.recuperar(this.state.email)
      .then(response => {
        this.setState({ isLoading: false });
        if (response.statusType == "success") {
          this.setState({ mostrarFormularioPassword: true });
        } else {
          this.setState({ isLoading: false, error: response.message });
        }
      })
      .catch(exception => {
        const error = exception;
        this.setState({
          isLoading: false,
          ...(error ? { error } : {})
        });

        if (!error) {
          throw exception;
        }
      });
  }
  CambiarPassword() {
    this.setState({ isLoading: true });
    dismissKeyboard();
    usuarioServicio
      .recuperar(this.state.email)
      .then(response => {
        this.setState({ isLoading: false });
        if (response.statusType == "success") {


        } else {
          this.setState({ isLoading: false, error: response.message });
        }
      })
      .catch(exception => {
        const error = exception;
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

                        {!this.state.mostrarFormularioPassword && (
                          <View>
                            <Item floatingLabel>
                              <Label style={stl.textwhite}>Mail</Label>
                              <Input style={stl.textwhite} />
                            </Item>
                            <Row size={1} style={stl.center}>
                              <Button style={[stl.btn, stl.primary]} onPress={() => this.HandleEnviarAyuda()}>
                                <Text style={stl.btnText}>Enviar Ayuda</Text>
                              </Button>
                            </Row>
                          </View>
                        )}

                        {this.state.mostrarFormularioPassword && (
                          <View style={stl.PassChangeForm}>
                            <Item floatingLabel>
                              <Label style={stl.textBlack}>Código enviado</Label>
                              <Input
                                secureTextEntry={true}
                                style={stl.textBlack}
                                name="Codigo"
                                value={this.state.codigo}
                                onSubmitEditing={() => {
                                  Keyboard.dismiss;
                                }}
                                onChangeText={codigo => {
                                  this.setState({ codigo: codigo, hasChange: true });
                                }}
                              />
                            </Item>
                            <Item floatingLabel>
                              <Label style={stl.textBlack}>Nueva Contraseña</Label>
                              <Input
                                onSubmitEditing={event => {
                                  this._passConfirm._root.focus();
                                }}
                                getRef={c => (this._passNew = c)}
                                secureTextEntry={true}
                                style={stl.textBlack}
                                name="NewPass"
                                value={this.state.password}
                                onSubmitEditing={() => {
                                  Keyboard.dismiss;
                                }}
                                onChangeText={pass => {
                                  this.setState({ password: pass, hasChange: true });
                                }}
                              />
                            </Item>
                            <Item floatingLabel>
                              <Label style={stl.textBlack}>
                                Confirmar Contraseña
                             </Label>
                              <Input
                                getRef={c => (this._passConfirm = c)}
                                secureTextEntry={true}
                                style={stl.textBlack}
                                name="ConfirmPass"
                                value={this.state.passwordConfirm}
                                onSubmitEditing={() => {
                                  Keyboard.dismiss;
                                }}
                                onChangeText={confPass => {
                                  this.setState({ passwordConfirm: confPass, hasChange: true });
                                }}
                              />
                            </Item>
                            <Row size={1} style={stl.center}>
                              <Button style={[stl.btn, stl.primary]} onPress={() => this.CambiarPassword()}>
                                <Text style={stl.btnText}>Enviar Ayuda</Text>
                              </Button>
                            </Row>
                          </View>
                        )}
                        <Text style={stl.txtError}> {this.state.error}</Text>
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
