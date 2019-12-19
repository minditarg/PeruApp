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
import { stl } from "../styles/styles";
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
  Content,
  Spinner,
  Toast
} from "native-base";
import dismissKeyboard from "react-native/Libraries/Utilities/dismissKeyboard";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as sessionService from "../../Services/session";
import * as clienteService from "../../Services/clientes";
import apiConfig from "../../Services/api/config";
class ClientePerfil extends Component {
  constructor() {
    super();
    if (sessionService.usuarioLogueado() != null) {
      let usuarioLogueado = sessionService.usuarioLogueado();
      this.initialState = {
        email: usuarioLogueado.email,
        nombre: usuarioLogueado.nombre,
        telefono: usuarioLogueado.Cliente.telefono,
        direccion: usuarioLogueado.Cliente.direccion,
        foto: apiConfig.pathFiles + usuarioLogueado.avatar,
        fotoNueva: null,

        submitted: false,
        isLoading: false,
        error: null,
        hasChange: false
      };
      this.state = this.initialState;
    }
  }
  logout() {
    sessionService.logout();
    this.props.navigation.navigate("Select");
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
  igualarEstados() {
    this.state = this.initialState;
  }
  _pickImage = async () => {
    this.componentDidMount();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [1, 1]
    });
    if (!result.cancelled) {
      this.setState({ fotoNueva: result, foto: result.uri, hasChange: true });
    }
  };

  HandleGuardarBtn() {
    this.setState({
      isLoading: true
    });
    dismissKeyboard();

    clienteService
      .actualizar(this.state.nombre, this.state.fotoNueva)
      .then(response => {
        if (response.statusType == "success") {
          this.setState({
            isLoading: false,
            hasChange: false
          });
          this.igualarEstados();
          this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true });
          Toast.show({
            text: response.message,
            buttonText: "OK",
            position: "top",
            type: "success"
          });
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
    if (sessionService.usuarioLogueado() != null) {
      let classesBtn = [stl.btn, stl.primary];
      if (!this.state.hasChange) {
        classesBtn.push(stl.disabled);
      }
      return (
        <KeyboardAvoidingView behavior="padding" enabled>
          <SafeAreaView style={stl.containerList}>
            <ScrollView ref="_scrollView" style={stl.scrollView}>
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
                              uri: this.state.foto
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
                      <Label style={stl.textBlack}>Mail </Label>
                      <Input
                        style={stl.textBlack}
                        onSubmitEditing={event => {
                          this._nombre._root.focus();
                        }}
                        autoCompleteType="email"
                        keyboardType="email-address"
                        name="email"
                        disabled="true"
                        value={this.state.email}
                      />
                    </Item>
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
                          this.setState({ nombre, hasChange: true });
                        }}
                      />
                    </Item>
                    {this.state.submitted && !this.state.nombre && (
                      <Text style={stl.txtError}>El nombre es requerido</Text>
                    )}

                    <Text style={stl.txtError}> {this.state.error}</Text>
                    <View style={stl.btnsRow}>
                      <Button
                        style={stl.btn}
                        bordered
                        onPress={() => this.HandleCancelarBtn()}
                      >
                        <Text style={stl.btnText}> Cancelar</Text>
                      </Button>

                      <Button
                        block
                        style={classesBtn}
                        disabled={!this.state.hasChange}
                        onPress={() => this.HandleGuardarBtn()}
                      >
                        <Text style={stl.btnText}>Guardar Cambios</Text>
                      </Button>
                    </View>
                  </Form>
                  {this.state.isLoading && (
                    <View style={stl.loading}>
                      <View style={stl.loadingbk}>
                        <Spinner color="white" />
                      </View>
                    </View>
                  )}
                </Content>
              </TouchableWithoutFeedback>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      );
    } else {
      return this.props.navigation.navigate("Login");
    }
  }
}
export default ClientePerfil;
