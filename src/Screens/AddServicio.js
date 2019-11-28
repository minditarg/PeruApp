import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView
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
  Label,
  Toast,
  Spinner
} from "native-base";
import { stl } from "../Screens/styles/styles";
import * as servicioService from "../Services/servicios";
import dismissKeyboard from "react-native/Libraries/Utilities/dismissKeyboard";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as sessionService from "../Services/session";

export class AddServicio extends Component {
  constructor() {
    super();
    this.initialState = {
      categorias: [{ id: 0, nombre: "Seleccione categoría" }],
      subcategorias: [{ id: 0, nombre: "Seleccione subcategoría" }],
      submitted: false,
      isLoading: false,
      nombre: "",
      descripcion: "",
      foto: [],
      visible: false,
      categoria: undefined,
      subcategoria: undefined
    };
    this.state = this.initialState;
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
      aspect: [1, 1]
    });
    if (!result.cancelled) {
      this.setState({ foto: [...this.state.foto, result] });
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
        console.log("then", response);
        if (response.statusType == "success") {
          this.setState({
            isLoading: false
          });
          Toast.show({
            text: response.message,
            buttonText: "OK",
            position: "top",
            type: "success"
          });
          sessionService.actualizarUsuario().then(response => {
            this.setState({
              submitted: false,
              isLoading: false,
              nombre: "",
              descripcion: "",
              foto: [],
              visible: false,
              categoria: undefined,
              subcategoria: undefined
            });
            this.props.navigation.navigate("Servicios");
          });
        } else {
          this.setState({ isLoading: false, error: response.message });
          Toast.show({
            text: response.message,
            buttonText: "OK",
            position: "top",
            type: "danger"
          });
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
  onChangeSubcategoria(value) {
    console.log(value);
    this.setState({
      subcategoria: value
    });
  }

  cambiarSubcategorias() {
    console.log(this.state.subcategorias);
    // this.setState({
    //   subcategoria: 1
    // });
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
      let arrayToOrder = this.state.foto;
      let iconClassArray = [stl.imgActionIcon];
      let firstItemClassArray = [stl.imgAction, stl.imgActionFirst];

      if (i < 1) {
        iconClassArray.push(stl.imgActionIconFirst);
        firstItemClassArray.push(stl.firstItem);
      }
      return (
        <View key={s.uri} style={stl.touchableImg}>
          <Image source={{ uri: s.uri }} style={stl.btnImgServ} />
          <View style={stl.imgActions}>
            <TouchableOpacity
              style={firstItemClassArray}
              onPress={() => {
                Alert.alert(
                  "Seleccionar Imagen",
                  "¿Establecer como portada?",
                  [
                    {
                      text: "Volver",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    {
                      text: "SI",
                      onPress: () => {
                        arrayToOrder = arrayToOrder.filter(x => x.uri != s.uri);
                        arrayToOrder.unshift(s);
                        this.setState({
                          foto: arrayToOrder
                        });
                      }
                    }
                  ],
                  { cancelable: true }
                );
              }}
            >
              <Icon type="FontAwesome" style={iconClassArray} name="star" />
            </TouchableOpacity>
            <TouchableOpacity
              style={stl.imgAction}
              onPress={() => {
                Alert.alert(
                  "Eliminar imagen",
                  "¿Quiere eliminar la imagen?",
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
              <Icon
                type="FontAwesome"
                style={[stl.imgActionIcon, stl.imgDeleteIcon]}
                name="trash"
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    });

    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <SafeAreaView style={stl.containerList}>
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
                  <View>
                    <Text style={[stl.textBlack, stl.pickerlbl]}>
                      Categoría
                    </Text>
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
                        value={this.state.categoria}
                        selectedValue={this.state.categoria}
                        onValueChange={this.onChangeCategoria.bind(this)}
                      >
                        {categoriasItems}
                      </Picker>
                    </Item>
                  </View>
                  <View>
                    <Text style={[stl.textBlack, stl.pickerlbl]}>
                      SubCategoría
                    </Text>

                    <Item
                      picker
                      style={[stl.picker, stl.itmPicker]}
                      error={this.state.submitted && !this.state.email}
                    >
                      <Picker
                        mode="dropdown"
                        placeholder="SubCategoria"
                        iosIcon={<Icon name="arrow-down" />}
                        style={[stl.textBlack, stl.pickerInput]}
                        name="subcategoria"
                        selectedValue={this.state.subcategoria}
                        onValueChange={this.onChangeSubcategoria.bind(this)}
                      >
                        {subcategoriasItems}
                      </Picker>
                    </Item>
                  </View>
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
                  {this.state.isLoading && (
                    <View style={stl.loading}>
                      <View style={stl.loadingbk}>
                        <Spinner color="white" />
                      </View>
                    </View>
                  )}
                </Form>
              </Content>
            </TouchableWithoutFeedback>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
