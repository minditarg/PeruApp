import React, { Component } from "react";
import {
  View,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
import { Col } from "react-native-easy-grid";
import {
  Button,
  Text,
  Form,
  Item,
  Textarea,
  Input,
  Label,
  Icon,
  Content
} from "native-base";
import { stl } from "./styles/styles";
import * as sessionService from "../Services/session";
import * as proveedorService from "../Services/proveedor";
import dismissKeyboard from "react-native/Libraries/Utilities/dismissKeyboard";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

export class Empresa extends Component {
  constructor() {
    super();
    let usuarioLogueado = sessionService.usuarioLogueado();
    this.state = {
      nombre: usuarioLogueado.Proveedor.nombre,
      email: usuarioLogueado.Proveedor.email,
      descripcion: usuarioLogueado.Proveedor.descripcion,
      direccion: usuarioLogueado.Proveedor.direccion,
      telefono: usuarioLogueado.Proveedor.telefono,
      foto: usuarioLogueado.Proveedor.foto,
      fotoNueva: { base64: usuarioLogueado.Proveedor.foto },
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
        alert("Disculpe, necesitamos permiso para acceder a la cámara!");
      }
    }
  };

  _pickImage = async () => {
    this.componentDidMount();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3]
    });
    if (!result.cancelled) {
      this.setState({ fotoNueva: result, foto: result.base64 });
    }
  };

  HandleGuardarBtn() {
    dismissKeyboard();
    proveedorService
      .actualizar(
        this.state.nombre,
        this.state.email,
        this.state.descripcion,
        this.state.direccion,
        this.state.telefono,
        this.state.fotoNueva
      )
      .then(response => {
        if (response.statusType == "success") {
          this.props.navigation.navigate("Servicios");
        } else {
          this.setState({ error: response.message });
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

  logout() {
    sessionService.logout();
    console.log(this.props.navigation);
    this.props.navigation.navigate("Login");
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <SafeAreaView style={stl.containerList}>
          <ScrollView style={stl.scrollView}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <Content style={stl.card}>
                <Form style={stl.form}>
                  <View style={stl.vista}>
                    <TouchableOpacity onPress={this._pickImage}>
                      {!this.state.foto && (
                        <View style={stl.btnImg}>
                          <Icon
                            style={stl.iconCam}
                            type="FontAwesome"
                            name="camera"
                          />
                        </View>
                      )}
                      {this.state.foto && (
                        <Image
                          source={{
                            uri: "data:image/png;base64," + this.state.foto
                          }}
                          style={stl.btnImg}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  <Button
                    block
                    style={[stl.btn, stl.primary]}
                    onPress={() => this.logout()}
                  >
                    <Text style={stl.btnText}>Cerrar Sesión</Text>
                  </Button>

                  <Item
                    floatingLabel
                    error={this.state.submitted && !this.state.email}
                  >
                    <Label style={stl.textBlack}>Mail público</Label>
                    <Input
                      style={stl.textBlack}
                      onSubmitEditing={event => {
                        this._nombre._root.focus();
                      }}
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
                    <Label style={stl.textBlack}>Nombre completo</Label>
                    <Input
                      onSubmitEditing={event => {
                        this._tel._root.focus();
                      }}
                      getRef={c => (this._nombre = c)}
                      style={stl.textBlack}
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
                    <Label style={stl.textBlack}>Teléfono</Label>
                    <Input
                      onSubmitEditing={event => {
                        this._dire._root.focus();
                      }}
                      getRef={c => (this._tel = c)}
                      style={stl.textBlack}
                      name="telefono"
                      autoCompleteType="tel"
                      value={this.state.telefono}
                      onChangeText={telefono => {
                        this.setState({ telefono });
                      }}
                    />
                  </Item>

                  <Item floatingLabel>
                    <Label style={stl.textBlack}>Dirección</Label>
                    <Input
                      onSubmitEditing={event => {
                        this._descripcion._root.focus();
                      }}
                      getRef={c => (this._dire = c)}
                      style={stl.textBlack}
                      name="direccion"
                      autoCompleteType="street-address"
                      value={this.state.direccion}
                      onChangeText={direccion => {
                        this.setState({ direccion });
                      }}
                    />
                  </Item>
                  <Item floatingLabel>
                    <Label style={stl.textBlack}>Descripción</Label>
                    <Input
                      onSubmitEditing={event => {
                        Keyboard.dismiss;
                      }}
                      getRef={c => (this._descripcion = c)}
                      multiline
                      style={stl.textBlack}
                      ligth
                      rowSpan={5}
                      name="descripcion"
                      bordered
                      placeholder="Descripcion"
                      value={this.state.descripcion}
                      onChangeText={descripcion => {
                        this.setState({ descripcion });
                      }}
                    />
                  </Item>
                  <Text style={stl.txtError}> {this.state.error}</Text>
                  <View style={stl.btnsRow}>
                    <Button
                      style={stl.btn}
                      bordered
                      onPress={() => this.props.navigation.navigate("Login")}
                    >
                      <Text style={stl.btnText}> Cancelar</Text>
                    </Button>

                    <Button
                      block
                      style={[stl.btn, stl.primary]}
                      onPress={() => this.HandleGuardarBtn()}
                    >
                      <Text style={stl.btnText}>Guardar Cambios</Text>
                    </Button>
                  </View>
                </Form>
              </Content>
            </TouchableWithoutFeedback>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
