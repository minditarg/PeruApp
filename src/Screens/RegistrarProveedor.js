import React, { Component } from "react";
import { View, Image, StyleSheet, SafeAreaView } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Button, Text, Form, Item, Textarea, Input, Label, Icon, Content, TextInput } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { stringify } from "query-string";
import * as proveedor from '../Services/proveedor';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
export class RegistrarProveedor extends Component {

  constructor() {
    super();

    this.state = {
      nombre: String,
      email: String,
      descripcion: String,
      direccion: String,
      telefono: String,
      image: null,
      submitted: false,
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  HandleRegistroBtn() {
    this.setState({
      isLoading: true,
      submitted: true,
      error: '',
    });
    dismissKeyboard();
    proveedor.crear(this.state.nombre, this.state.email, this.state.descripcion, this.state.direccion, this.state.telefono, this.state.foto)
      .then((response) => {
        if (response.statusType == "success") {
          this.setState(this.initialState);
          this.props.navigate("Servicios");
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

    let { image } = this.state;
    return (
      <SafeAreaView style={stl.container}>
        <ScrollView style={stl.scrollView}>
          <View style={stl.vista}>
            <View style={stl.center}>
              <Image style={stl.logo} source={require('../../assets/icono1.jpg')} />
            </View>

            <Form style={stl.form}>

              <Item style={stl.itm} floatingLabel error={this.state.submitted && !this.state.email} >
                <Label style={stl.lbl}>Mail público</Label>
                <Input
                  style={stl.input}
                  autoCompleteType="email"
                  keyboardType="email-address"
                  name="email"
                  value={this.state.email}
                  onChangeText={email => {
                    this.setState({ email });
                  }}
                />
              </Item>
              {this.state.submitted && !this.state.email && (<Text style={stl.text1}> El email es requerido</Text>)}

              <Item style={stl.itm} floatingLabel error={this.state.submitted && !this.state.nombre} >
                <Label style={stl.lbl}>Nombre completo</Label>
                <Input
                  style={stl.input}
                  name="nombre"
                  autoCompleteType="name"
                  value={this.state.nombre}
                  onChangeText={nombre => {
                    this.setState({ nombre });
                  }}
                />
              </Item>
              {this.state.submitted && !this.state.nombre && (<Text style={stl.text1}> El nombre es requerido</Text>)}


              <Item style={stl.itm} floatingLabel >
                <Label style={stl.lbl}>Teléfono</Label>
                <Input
                  style={stl.input}
                  name="telefono"
                  autoCompleteType="tel"
                  value={this.state.telefono}
                  onChangeText={telefono => {
                    this.setState({ telefono });
                  }}
                />
              </Item>

              <Item style={stl.itm} floatingLabel >
                <Label style={stl.lbl}>Dirección</Label>
                <Input
                  style={stl.input}
                  name="direccion"
                  autoCompleteType="street-address"
                  value={this.state.direccion}
                  onChangeText={direccion => {
                    this.setState({ direccion });
                  }}
                />
              </Item>
              <View style={{ paddingTop: 10 }}  >
                <Label style={stl.lbl}>Descripción</Label>
                <Textarea
                  style={stl.txtArea}
                  ligth rowSpan={5}
                  name="descripcion"
                  bordered placeholderTextColor="whitesmoke" placeholder="Descripcion"
                  value={this.state.descripcion}
                  onChangeText={descripcion => {
                    this.setState({ descripcion });
                  }}
                />
              </View>
              <View style={stl.vista}>
                <Button block onPress={this._pickImage}>
                  {!image && <Text style={stl.btnText}> Subir imagen</Text>}
                  {image && <Text style={stl.btnText}> Cambiar imagen</Text>} 
              </Button>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
              </View>
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