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
  SafeAreaView,
  TouchableHighlight
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
import { Col, Row, Grid } from "react-native-easy-grid";

import Modal from "react-native-modal";
import { stl } from "../Screens/styles/styles";
import * as servicioService from "../Services/servicios";
import * as commonService from "../Services/common";
import dismissKeyboard from "react-native/Libraries/Utilities/dismissKeyboard";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as serviciosService from "../Services/servicios";
import * as proveedorService from "../Services/proveedor";
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
      videos: [],
      visible: false,
      categoria: undefined,
      subcategoria: "",
      soyPremium: proveedorService.soyPremium(),
      modalVideoVisible: false,
      videoNuevo: ""
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    commonService.listadoCategorias().then(response => {
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
        this.state.subcategoria,
        this.state.videos
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
          serviciosService.listadoPorProveedor().then(response => {
            this.state = this.initialState;
            this.props.navigation.navigate("Servicios");
          });
        } else {
          this.setState({
            isLoading: false,
            error: `${response.message}: ${response.error}`
          });
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
    if (value > 0) {
      this.setState({
        categoria: value,
        subcategorias: this.state.categorias.find(item => item.id === value)
          .subcategorias
      });
      this.cambiarSubcategorias();
    }
  }
  onChangeSubcategoria(value) {
    this.setState({
      subcategoria: value
    });
  }

  cambiarSubcategorias() {
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

  agregarVideo() {
    this.setState({
      videos: [...this.state.videos, this.state.videoNuevo],
      videoNuevo: "",
      modalVideoVisible: false
    });
  }

  render() {
    let foto = this.state.foto;
    let categoriasItems = this.state.categorias.map((s, i) => {
      return (
        <Picker.Item key={s.id.toString()} value={s.id} label={s.nombre} />
      );
    });
    categoriasItems.unshift(
      <Picker.Item key={"empty"} label="Seleccione categoria" value="null" />
    );
    let subcategoriasItems = this.state.subcategorias.map((s, i) => {
      return (
        <Picker.Item key={s.id.toString()} value={s.id} label={s.nombre} />
      );
    });
    //subcategoriasItems.unshift(<Picker.Item label="Seleccione subcategoria" value="null" />);

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

    let videos = this.state.videos.map((s, i) => {
      let arrayToOrder = this.state.videos;
      let iconClassArray = [stl.imgActionIcon];
      let firstItemClassArray = [stl.imgAction, stl.imgActionFirst];

      if (i < 1) {
        iconClassArray.push(stl.imgActionIconFirst);
        firstItemClassArray.push(stl.firstItem);
      }
      return (
        <View key={s} style={stl.touchableImg}>
          <Image
            source={{ uri: "https://i.ytimg.com/vi/" + s + "/hqdefault.jpg" }}
            style={stl.btnImgServ}
          />
          <View style={stl.imgActions}>
            <TouchableOpacity
              style={stl.imgAction}
              onPress={() => {
                Alert.alert(
                  "Eliminar video",
                  "¿Quiere eliminar la video?",
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
                          videos: this.state.videos.filter(x => x != s)
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
                    <Text style={stl.txtError}> El título es requerido</Text>
                  )}
                  <View>
                    <Text style={[stl.textBlack, stl.pickerlbl]}>
                      Categoría
                    </Text>
                    <Item
                      picker
                      style={stl.picker}
                      error={this.state.submitted && !this.state.categoria}
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
                    {this.state.submitted && !this.state.categoria && (
                      <Text style={stl.txtError}>
                        {" "}
                        La categoría es requerida
                      </Text>
                    )}
                  </View>
                  <View>
                    <Text style={[stl.textBlack, stl.pickerlbl]}>
                      Subcategoría
                    </Text>

                    <Item
                      picker
                      style={[stl.picker, stl.itmPicker]}
                      error={this.state.submitted && !this.state.subcategoria}
                    >
                      <Picker
                        mode="dropdown"
                        placeholder="Subcategoria"
                        iosIcon={<Icon name="arrow-down" />}
                        style={[stl.textBlack, stl.pickerInput]}
                        name="subcategoria"
                        selectedValue={this.state.subcategoria}
                        onValueChange={subcategoria => {
                          this.setState({ subcategoria });
                        }}
                      >
                        {subcategoriasItems}
                      </Picker>
                    </Item>
                    {this.state.submitted && !this.state.subcategoria && (
                      <Text style={stl.txtError}>
                        La subcategoría es requerida
                      </Text>
                    )}
                  </View>
                  <View style={stl.areaText}>
                    <Label style={stl.textBlack}>Descripción</Label>
                    <Textarea
                      style={[stl.textBlack, stl.txtArea]}
                      ligth
                      rowSpan={5}
                      name="descripcion"
                      bordered
                      placeholder="Descripción"
                      value={this.state.descripcion}
                      onChangeText={descripcion => {
                        this.setState({ descripcion });
                      }}
                    />
                  </View>
                  <Row>
                    <Text style={stl.tituloSeccionCard}>Fotos</Text>
                  </Row>

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
                  {this.state.soyPremium && (
                    <Row>
                      <Text style={stl.tituloSeccionCard}>Videos</Text>
                    </Row>
                  )}
                  {this.state.soyPremium && (
                    <View style={[stl.vista, stl.vistaimgs]}>
                      {videos}
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            modalVideoVisible: !this.state.modalVideoVisible
                          });
                        }}
                      >
                        <View style={stl.btnImgServ}>
                          <Icon
                            style={stl.iconCam}
                            type="FontAwesome"
                            name="video-camera"
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}

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

          <Modal
            backdropColor={"black"}
            backdropOpacity={0.7}
            isVisible={this.state.modalVideoVisible}
          >
            <View style={stl.cardEnModal}>
              <Text style={stl.tituloModal}>Nuevo video de YOUTUBE</Text>

              <Text>Ejemplo del codigo dentro del link de youtube</Text>
              <Text style={stl.link}>
                https://www.youtube.com/watch?v=
                <Text style={stl.codigoYt}>4eUsVLk0fao</Text>
              </Text>

              <Item floatingLabel>
                <Label style={stl.textBlack}>Ingrese el Codigo del video</Label>
                <Input
                  style={stl.textBlack}
                  name="videoNuevo"
                  value={this.state.videoNuevo}
                  onChangeText={videoNuevo => {
                    this.setState({ videoNuevo });
                  }}
                />
              </Item>

              <View style={[stl.btnsRow, stl.MarginTop15]}>
                <Button
                  style={stl.btn}
                  bordered
                  onPress={() => {
                    this.setState({ modalVideoVisible: !this.state.modalVideoVisible });
                  }}
                >
                  <Text style={stl.btnText}> Cancelar</Text>
                </Button>

                <Button
                  block
                  style={[stl.btn, stl.primary]}
                  onPress={() => {
                    this.agregarVideo();
                  }}
                >
                  <Text style={stl.btnText}>Cargar Video</Text>
                </Button>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
