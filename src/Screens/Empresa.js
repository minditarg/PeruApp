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
import RNModal from "rn-modal-picker";

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
  CheckBox,
  Toast,
  ListItem
} from "native-base";
import { stl } from "./styles/styles";
import * as sessionService from "../Services/session";
import apiConfig from "../Services/api/config";

import dismissKeyboard from "react-native/Libraries/Utilities/dismissKeyboard";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import * as proveedorService from "../Services/proveedor";
import * as commonService from "../Services/common";
import { connect } from "react-redux";

class Empresa extends Component {
  constructor() {
    super();
    let usuarioLogueado = sessionService.usuarioLogueado();
    commonService.listadoLocalidades();
    let localidad = usuarioLogueado.Proveedor.localidad
      ? usuarioLogueado.Proveedor.localidad
      : { id: "", nombre: "" };
    this.initialState = {
      localidadId: localidad.id,
      pass: "",
      confPass: "",
      localidadSeleccionadoText: localidad.nombre,
      nombre: usuarioLogueado.Proveedor.nombre,
      email: usuarioLogueado.Proveedor.email,
      descripcion: usuarioLogueado.Proveedor.descripcion,
      direccion: usuarioLogueado.Proveedor.direccion,
      telefono: usuarioLogueado.Proveedor.telefono,
      foto: apiConfig.pathFiles + usuarioLogueado.Proveedor.foto,
      fotoNueva: null,
      submitted: false,
      isLoading: false,
      cambiarPass: false,
      error: null,
      hasChange: false
    };
    this.state = this.initialState;
    console.log(this.state);
  }
  componentDidMount() {
    this.getPermissionAsync();
  }

  igualarEstados() {
    this.initialState = {
      nombre: this.state.nombre,
      email: this.state.email,

      descripcion: this.state.descripcion,
      direccion: this.state.direccion,

      telefono: this.state.telefono,
      foto: this.state.foto,
      fotoNueva: null,
      submitted: false,
      isLoading: false,
      error: null,
      hasChange: false
    };
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
      aspect: [1, 1]
    });
    if (!result.cancelled) {
      this.setState({ fotoNueva: result, foto: result.uri, hasChange: true });
    }
  };
  HandleCancelarBtn() {
    this.setState(this.initialState);
    this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true });
  }
  HandleGuardarBtn() {
    this.setState({
      isLoading: true
    });
    dismissKeyboard();
    this.props.provService
      .actualizar(
        this.state.nombre,
        this.state.email,
        this.state.descripcion,
        this.state.direccion,
        this.state.localidadId,
        this.state.telefono,
        this.state.fotoNueva
      )
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
  _cambioLocalidad(nombre, id) {
    this.setState({
      localidadSeleccionadoText: nombre,
      localidadId: id,
      hasChange: true
    });
  }
  logout() {
    this.props.session.logout();
    this.props.navigation.navigate("Select");
  }
  render() {
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
                        this.setState({ email, hasChange: true });
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
                        this.setState({ nombre, hasChange: true });
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
                      keyboardType="phone-pad"
                      autoCompleteType="tel"
                      value={this.state.telefono}
                      onChangeText={telefono => {
                        this.setState({ telefono, hasChange: true });
                      }}
                    />
                  </Item>

                  <View style={stl.pickerSelect2}>
                    <Text
                      style={[stl.textBlack, stl.pickerlbl, stl.LabelSelect2]}
                    >
                      Localidad:
                    </Text>

                    <RNModal
                      dataSource={this.props.localidades.map((s, i) => {
                        return { id: s.id, name: s.nombre };
                      })}
                      dummyDataSource={this.props.localidades.map((s, i) => {
                        return { id: s.id, name: s.nombre };
                      })}
                      defaultValue={true}
                      pickerTitle={"Localidad"}
                      showSearchBar={true}
                      disablePicker={false}
                      changeAnimation={"none"}
                      searchBarPlaceHolder={"Buscar....."}
                      showPickerTitle={true}
                      searchBarContainerStyle={stl.searchBarContainerStyle}
                      pickerStyle={stl.pickerStyle}
                      pickerItemTextStyle={stl.listTextViewStyle}
                      selectedLabel={this.state.localidadSeleccionadoText}
                      placeHolderLabel={"Seleccione localidad"}
                      selectLabelTextStyle={stl.selectLabelTextStyle}
                      placeHolderTextStyle={stl.placeHolderTextStyle}
                      dropDownImageStyle={stl.dropDownImageStyle}
                      selectedValue={(index, seleccionado) => {
                        this._cambioLocalidad(
                          seleccionado.name,
                          seleccionado.id
                        );
                      }}
                    />
                  </View>
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
                        this.setState({ direccion, hasChange: true });
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
                        this.setState({ descripcion, hasChange: true });
                      }}
                    />
                  </Item>
                  <Text style={stl.txtError}> {this.state.error}</Text>

                  <ListItem
                    onPress={() => {
                      this.setState({
                        cambiarPass: !this.state.cambiarPass
                      });
                      console.log(this.state.cambiarPass);
                    }}
                  >
                    <CheckBox
                      onPress={() => {
                        this.setState({
                          cambiarPass: !this.state.cambiarPass
                        });
                        console.log(this.state.cambiarPass);
                      }}
                      checked={this.state.cambiarPass}
                      color="#235be5"
                    />
                    <Text style={stl.checboxLabel}>Cambiar contraseña</Text>
                  </ListItem>
                  {this.state.cambiarPass && (
                    <View style={stl.PassChangeForm}>
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
                          value={this.state.NewPass}
                          onSubmitEditing={() => {
                            Keyboard.dismiss;
                          }}
                          onChangeText={pass => {
                            this.setState({ pass, hasChange: true });
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
                          value={this.state.ConfirmPass}
                          onSubmitEditing={() => {
                            Keyboard.dismiss;
                          }}
                          onChangeText={confPass => {
                            this.setState({ confPass, hasChange: true });
                          }}
                        />
                      </Item>
                    </View>
                  )}
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
                      disabled={!this.state.hasChange}
                      style={classesBtn}
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
  }
}
const mapStateToProps = state => {
  return {
    session: sessionService,
    provService: proveedorService,
    localidades: commonService.getStore().localidades
  };
};
export default connect(mapStateToProps)(Empresa);
