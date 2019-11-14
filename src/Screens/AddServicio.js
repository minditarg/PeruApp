import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  Picker,
  Icon,
  Form,
  Item,
  Input,
  Textarea,
  Label
} from "native-base";
import { stl } from "../Screens/styles/styles";
import * as servicioService from "../Services/servicios";
import dismissKeyboard from "react-native/Libraries/Utilities/dismissKeyboard";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export class AddServicio extends Component {
  constructor() {
    super();
    this.state = {
      categorias: [{ id: 0, nombre: "Seleccione categoría" }],
      subcategorias: [{ id: 0, nombre: "Seleccione subcategoría" }],
      submitted: false,
      titulo: "",
      descripcion: "",
      foto: [],
      categoria: undefined,
      subcategoria: undefined
    };
  }

  
  componentDidMount() {
    servicioService.listadoCategorias().then(response => {
      this.setState({
        categorias: response
      });
    });
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
    //this.componentDidMount();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3]
    });
    if (!result.cancelled) {
      this.setState({ foto: [...this.state.foto, result] });
      console.log(this.state.foto);
    }
  };

  HandleRegistroBtn() {
    this.setState({
      isLoading: true,
      submitted: true,
      error: ""
    });
    dismissKeyboard();
    servicioService
      .crear(
        this.state.nombre,
        this.state.descripcion,
        this.state.foto,
        this.state.subcategoria
      )
      .then(response => {
        if (response.statusType == "success") {
          this.prop.navigation.push("Servicios");

          //this.props.navigation.navigate("Servicios");
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

  onChangeCategoria(value) {
    console.log("onChangeCategoria", value);
    this.setState({
      categoria: value,
      subcategorias: this.state.categorias.find(item => item.id === value)
        .subcategorias
    });
    this.cambiarSubcategorias();
  }

  cambiarSubcategorias() {
    console.log(this.state.subcategorias);
    this.setState({
      subcategoria: 1
    });
    subcategoriasItems = this.state.subcategorias.map((s, i) => {
      return <Picker.Item key={s.id} value={s.id} label={s.nombre} />;
    });
  }
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  render() {
    let foto = this.state.foto;

    let categoriasItems = this.state.categorias.map((s, i) => {
      return <Picker.Item key={s.id} value={s.id} label={s.nombre} />;
    });

    let subcategoriasItems = this.state.subcategorias.map((s, i) => {
      return <Picker.Item key={s.id} value={s.id} label={s.nombre} />;
    });
    let fotos = this.state.foto.map((s, i) => {
      return (
        <TouchableOpacity
          key={s.uri}
          style={stl.touchableImg}
          onPress={() => {
            Alert.alert(
              "Eliminar imagen",
              "¡Quiere eliminar la imagen?",
              [
                {
                  text: "Volver",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                {
                  text: "SI, eliminala",
                  onPress: () =>
                    this.setState({
                      foto: this.state.foto.filter(x => x.uri != s.uri)
                    })
                }
              ],
              { cancelable: true }
            );
          }}
        >
          <Image source={{ uri: s.uri }} style={stl.btnImgServ} />
          <View style={stl.btnEliminarFoto}>
            <Icon
              style={stl.iconEliminarFoto}
              type="FontAwesome"
              name="close"
            />
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <Container style={stl.containerList}>
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Content style={stl.card}>
              <Form style={stl.form}>
                <Item
                  floatingLabel
                  error={this.state.submitted && !this.state.nombre}
                >
                  <Label style={stl.textBlack}>Título</Label>
                  <Input
                    style={stl.textBlack}
                    name="nombre"
                    value={this.state.nombre}
                    onChangeText={nombre => {
                      this.setState({ nombre });
                    }}
                  />
                </Item>
                {this.state.submitted && !this.state.nombre && (
                  <Text style={stl.txtError}> El nombre es requerido</Text>
                )}
                <Item
                  picker
                  style={stl.picker}
                  error={this.state.submitted && !this.state.email}
                >
                  <Picker
                    mode="dropdown"
                    placeholder="Categoria"
                    iosIcon={<Icon name="arrow-down" />}
                    style={[stl.textBlack, stl.pickerInput]}
                    name="categoria"
                    selectedValue={this.state.categoria}
                    onValueChange={this.onChangeCategoria.bind(this)}
                  >
                    {categoriasItems}
                  </Picker>
                </Item>
                <Item
                  picker
                  style={stl.picker}
                  error={this.state.submitted && !this.state.email}
                >
                  <Picker
                    mode="dropdown"
                    placeholder="SubCategoria"
                    iosIcon={<Icon name="arrow-down" />}
                    style={[stl.textBlack, stl.pickerInput]}
                    name="subcategoria"
                    selectedValue={this.state.subcategoria}
                  >
                    {subcategoriasItems}
                  </Picker>
                </Item>

                <View style={stl.areaText}>
                  <Label style={stl.textBlack}>Descripción</Label>
                  <Textarea
                    style={[stl.textBlack, stl.txtArea]}
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
                </View>

                <View style={[stl.vista, stl.vistaimgs]}>
                  {fotos}
                  <TouchableOpacity onPress={this._pickImage}>
                    <View style={stl.btnImgServ}>
                      <Icon
                        style={stl.iconCam}
                        type="FontAwesome"
                        name="camera"
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <Text style={stl.txtError}> {this.state.error}</Text>
                <View style={stl.btnsRow}>
                  <Button
                    style={stl.btn}
                    bordered
                    onPress={() => this.props.navigation.goBack()}
                  >
                    <Text style={stl.btnText}> Cancelar</Text>
                  </Button>

                  <Button
                    block
                    style={[stl.btn, stl.primary]}
                    onPress={() => this.HandleRegistroBtn()}
                  >
                    <Text style={stl.btnText}>Crear Servicio</Text>
                  </Button>
                </View>
              </Form>
            </Content>
          </TouchableWithoutFeedback>
        </ScrollView>
      </Container>
    );
  }
}
