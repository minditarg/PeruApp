import React, { Component } from "react";
import {
  View,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  SafeAreaView
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Button, Text, Form, Item, Input, Label } from "native-base";
import * as usuario from "../Services/usuario";
import * as session from "../Services/session";
import * as api from "../Services/api";
import dismissKeyboard from "react-native/Libraries/Utilities/dismissKeyboard";
import { stl } from "./styles/styles";

export class Registrarse extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      submitted: false,
      isLoading: false,
      error: null
    };
  }
  HandleRegistroBtn() {
    this.setState({
      isLoading: true,
      submitted: true,
      error: ""
    });
    dismissKeyboard();
    usuario
      .crear(this.state.email, this.state.password)
      .then(response => {
        console.log(response);
        if (response.statusType == "success") {
          session
            .authenticate(this.state.email, this.state.password)
            .then(response => {
              if (response.statusType == "success") {
                this.props.navigation.navigate("RegistrarProveedor");
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
                          onSubmitEditing={event => {
                            this._pass._root.focus();
                          }}
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
                          getRef={c => (this._pass = c)}
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
                          onPress={() =>
                            this.props.navigation.navigate("Login")
                          }
                        >
                          <Text style={stl.btnText}> Cancelar</Text>
                        </Button>
                        <Button
                          block
                          style={[stl.btn, stl.primary]}
                          onPress={() => this.HandleRegistroBtn()}
                        >
                          <Text style={stl.btnText}>Crear cuenta</Text>
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
