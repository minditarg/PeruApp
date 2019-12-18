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
  TouchableOpacity,
  KeyboardAvoidingView
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
  Textarea,
  Spinner
} from "native-base";
import dismissKeyboard from "react-native/Libraries/Utilities/dismissKeyboard";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import RNModal from "rn-modal-picker";

import * as servicioService from "../Services/servicios";
import * as sessionService from "../Services/session";

import * as proveedor from "../Services/proveedor";
import * as commonService from "../Services/common";
import { connect } from "react-redux";

import { stl } from "./styles/styles";
import { TextInput } from "react-native-gesture-handler";

class RegistrarProveedor extends Component {
  constructor() {
    super();
    commonService.listadoLocalidades();
    this.initialState = {
      localidadSeleccionadaText: "Localidad",
      localidadId: "",
      nombre: "",
      email: "",
      descripcion: "",
      direccion: "",
      telefono: "",
      foto: null,
      submitted: false,
      isLoading: false,
      error: null
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    this.getPermissionAsync();
    this.setState({email: this.props.navigation.getParam("email")})
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
      this.setState({ foto: result });
    }
  };
  _cambioLocalidad(nombre, id) {
    this.setState({ localidadSeleccionadaText: nombre, localidadId: id });
    this.props.servServ.buscar(
      this.state.categoriaId,
      this.state.subcategoriaId,
      id
    );
  }

  _handleCancelar() {
    sessionService.logout();
    this.props.navigation.navigate("Login");
  }
  HandleRegistroBtn() {
    this.setState({
      isLoading: true,
      submitted: true,
      error: ""
    });
    dismissKeyboard();

    this.props.prov
      .crear(
        this.state.nombre,
        this.state.email,
        this.state.descripcion,
        this.state.direccion,
        this.state.localidadId,
        this.state.telefono,
        this.state.foto
      )
      .then(response => {
        if (response.statusType == "success") {
          this.setState(this.initialState);
          this.props.navigation.navigate("Servicios");
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
                            onSubmitEditing={event => {
                              this._name._root.focus();
                            }}
                            onChangeText={email => {
                              this.setState({ email });
                            }}
                          />
                        </Item>
                        {this.state.submitted && !this.state.email && (
                          <Text style={stl.txtError}>
                            El email es requerido
                          </Text>
                        )}

                        <Item
                          floatingLabel
                          error={this.state.submitted && !this.state.nombre}
                        >
                          <Label style={stl.textwhite}>Nombre completo</Label>
                          <Input
                            getRef={c => (this._name = c)}
                            onSubmitEditing={event => {
                              this._telefono._root.focus();
                            }}
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
                          <Text style={stl.txtError}>
                            El nombre es requerido
                          </Text>
                        )}

                        <Item floatingLabel>
                          <Label style={stl.textwhite}>Teléfono</Label>
                          <Input
                            getRef={c => (this._telefono = c)}
                            onSubmitEditing={event => {
                              this._dire._root.focus();
                            }}
                            style={stl.textwhite}
                            name="telefono"
                            keyboardType="phone-pad"
                            autoCompleteType="tel"
                            value={this.state.telefono}
                            onChangeText={telefono => {
                              this.setState({ telefono });
                            }}
                          />
                        </Item>
                        <View style={stl.pickerSelect2}>
                          <Text
                            style={[
                              stl.pickerlbl,
                              stl.textwhite,
                              stl.LabelSelect2
                            ]}
                          >
                            Localidad:
                          </Text>

                          <RNModal
                            dataSource={this.props.localidades.map((s, i) => {
                              return { id: s.id, name: s.nombre };
                            })}
                            dummyDataSource={this.props.localidades.map(
                              (s, i) => {
                                return { id: s.id, name: s.nombre };
                              }
                            )}
                            defaultValue={false}
                            pickerTitle={"Localidad"}
                            showSearchBar={true}
                            disablePicker={false}
                            changeAnimation={"none"}
                            searchBarPlaceHolder={"Buscar....."}
                            showPickerTitle={true}
                            searchBarContainerStyle={
                              stl.searchBarContainerStyle
                            }
                            pickerStyle={stl.pickerStyle}
                            pickerItemTextStyle={stl.listTextViewStyle}
                            selectedLabel={this.state.localidadSeleccionadaText}
                            placeHolderLabel={"Seleccione localidad"}
                            selectLabelTextStyle={[
                              stl.selectLabelTextStyle,
                              stl.textwhite
                            ]}
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
                          <Label style={stl.textwhite}>Dirección</Label>
                          <Input
                            getRef={c => (this._dire = c)}
                            onSubmitEditing={event => {
                              this._descripcion._root.focus();
                            }}
                            style={stl.textwhite}
                            name="direccion"
                            autoCompleteType="street-address"
                            value={this.state.direccion}
                            onChangeText={direccion => {
                              this.setState({ direccion });
                            }}
                          />
                        </Item>
                        <Item floatingLabel>
                          <Label style={stl.textwhite}>Descripción</Label>
                          <Input
                            multiline
                            getRef={c => (this._descripcion = c)}
                            onSubmitEditing={event => {
                              Keyboard.dismiss;
                            }}
                            style={stl.textwhite}
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
                        </Item>
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
                                source={{ uri: this.state.foto.uri }}
                                style={stl.btnImg}
                              />
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
const mapStateToProps = state => {
  return {
    servServ: servicioService,
    prov: proveedor,
    localidades: commonService.getStore().localidades
  };
};
export default connect(mapStateToProps)(RegistrarProveedor);
