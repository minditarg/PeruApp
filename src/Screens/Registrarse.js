import React, { Component } from "react";
import { View, Image, StyleSheet, SafeAreaView } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Button, Text, Form, Item, Textarea, Input, Label, Icon, Content } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { stringify } from "query-string";
import * as usuario from '../Services/usuario';
import * as session from '../Services/session';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

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
      error: '',
    });
    dismissKeyboard();
    usuario.crear(this.state.email, this.state.email)
      .then((response) => {
        if (response.statusType == "success") {
          session.authenticate(this.state.email, this.state.email)
            .then((response) => {
              this.setState(this.initialState);
              this.props.navigation.navigate("RegistrarProveedor");
            })
            .catch((exception) => {
              const error = api.exceptionExtractError(exception);
              this.setState({
                isLoading: false,
                ...(error ? { error } : {}),
              });

              if (!error) {
                throw exception;
              }
            });
        } else {
          this.setState({ error: response.message });
        }
      })
      .catch((exception) => {
        const error = api.exceptionExtractError(exception);
        this.setState({
          isLoading: false,
          ...(error ? { error } : {}),
        });

        if (!error) {
          throw exception;
        }
      });
  }

  render() {
    return (
      <SafeAreaView style={stl.container}>
        <ScrollView style={stl.scrollView}>
          <View style={stl.vista}>
            <View style={stl.center}>
              <Image style={stl.logo} source={require('../../assets/icono1.jpg')} />
            </View>
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
            <Row>
              <Col>
                <Button
                  style={stl.btn}
                  bordered light
                  onPress={() => this.props.navigation.navigate("Login")}
                >
                  <Text style={stl.btnText}> Cancelar</Text>
                </Button>
              </Col>
              <Col>

                <Button block style={stl.btn} onPress={() => this.HandleRegistroBtn()}>
                  <Text style={stl.btnText} >Crear cuenta</Text>
                </Button>
              </Col></Row>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const stl = StyleSheet.create({
  vista: {
    paddingTop: 30,
    paddingBottom: 30
  },
  scrollView: {

  },
  content: {
    paddingTop: 50,
    paddingBottom: 20
  },
  container: {
    backgroundColor: '#044fb3',
    flex: 1
  },
  center: { justifyContent: 'flex-end', alignItems: 'center', },
  logo: { width: 40, height: 40, borderRadius: 100 },
  text1: { color: 'red', fontWeight: 'bold', fontSize: 15 },
  text2: { color: 'white', fontWeight: 'bold', fontSize: 20 },
  btn: {
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20, textAlign: 'center'
  },
  btnText: { textAlign: 'center' },
  form: {
    marginLeft: 20,
    marginRight: 30
  },
  itm: { borderBottomColor: 'whitesmoke' },
  lbl: {
    color: 'whitesmoke'

  },
  input: {
    color: 'whitesmoke'
  },
  txtArea: {
    marginLeft: 15,

    marginVertical: 20,
    color: 'whitesmoke'
  },
  btnAyuda: {
    color: 'silver'
  },
  alignRight: {
    alignItems: 'flex-end',
  }, btnFoto: {
    borderRadius: 100,
    marginLeft: 15,
    width: 90,
    height: 90
  }
})