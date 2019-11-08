import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  Thumbnail,
  Button,
  Text,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Textarea
} from "native-base";
import * as proveedor from "../Services/proveedor";
import dismissKeyboard from "react-native/Libraries/Utilities/dismissKeyboard";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { stl } from "./styles/styles";

export class RegistrarProveedor extends Component {
  constructor() {
    super();

    this.state = {
      nombre: "",
      email: "",
      descripcion: "",
      direccion: "",
      telefono: "",
      image: null,
      submitted: false,
      isLoading: false,
      error: null
    };
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
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
      error: ""
    });
    dismissKeyboard();
    proveedor
      .crear(
        this.state.nombre,
        this.state.email,
        this.state.descripcion,
        this.state.direccion,
        this.state.telefono,
        this.state.foto
      )
      .then(response => {
        if (response.statusType == "success") {
          this.setState(this.initialState);
          this.props.navigate("Servicios");
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
    let { image } = this.state;
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
                <View size={3}>
                  <Col>
                    <Form style={stl.form}>
                      <Item
                        floatingLabel
                        error={this.state.submitted && !this.state.email}
                      >
                        <Label style={stl.textwhite}>Mail público</Label>
                        <Input
                          style={stl.textwhite}
                          autoCompleteType="email"
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
                        error={this.state.submitted && !this.state.nombre}
                      >
                        <Label style={stl.textwhite}>Nombre completo</Label>
                        <Input
                          style={stl.textwhite}
                          name="nombre"
                          autoCompleteType="name"
                          value={this.state.nombre}
                          onChangeText={nombre => {
                            this.setState({ nombre });
                          }}
                        />
                      </Item>
                      {this.state.submitted && !this.state.nombre && (
                        <Text style={stl.txtError}>El nombre es requerido</Text>
                      )}

                      <Item floatingLabel>
                        <Label style={stl.textwhite}>Teléfono</Label>
                        <Input
                          style={stl.textwhite}
                          name="telefono"
                          autoCompleteType="tel"
                          value={this.state.telefono}
                          onChangeText={telefono => {
                            this.setState({ telefono });
                          }}
                        />
                      </Item>

                      <Item floatingLabel>
                        <Label style={stl.textwhite}>Dirección</Label>
                        <Input
                          style={stl.textwhite}
                          name="direccion"
                          autoCompleteType="street-address"
                          value={this.state.direccion}
                          onChangeText={direccion => {
                            this.setState({ direccion });
                          }}
                        />
                      </Item>
                      <View style={stl.areaText}>
                        <Label style={stl.textwhite}>Descripción</Label>
                        <Textarea
                          style={[stl.textwhite, stl.txtArea]}
                          ligth
                          rowSpan={5}
                          name="descripcion"
                          bordered
                          placeholderTextColor="whitesmoke"
                          placeholder="Descripcion"
                          value={this.state.descripcion}
                          onChangeText={descripcion => {
                            this.setState({ descripcion });
                          }}
                        />
                      </View>
                      <View style={stl.vista}>
                        <TouchableOpacity onPress={this._pickImage}>
                          {!image && (
                            <View style={stl.btnImg}>
                              <Icon
                                style={stl.iconCam}
                                type="FontAwesome"
                                name="camera"
                              />
                            </View>
                          )}
                          {image && (
                            <Image source={{ uri: image }} style={stl.btnImg} />
                          )}
                        </TouchableOpacity>
                      </View>
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
                </View>
              </Grid>
            </TouchableWithoutFeedback>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
