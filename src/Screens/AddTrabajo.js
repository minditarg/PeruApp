import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
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
  Toast,
  Item,
  Input,
  Textarea,
  Label
} from "native-base";
import RNModal from "rn-modal-picker";
import { stl } from "../Screens/styles/styles";
import { connect } from "react-redux";
import dismissKeyboard from "react-native/Libraries/Utilities/dismissKeyboard";
import * as sessionService from "../Services/session";
import * as serviciosService from "../Services/servicios";
import * as trabajosService from "../Services/trabajos";
import * as clientesService from "../Services/clientes";
import { ThemeColors } from "react-navigation";

 class AddTrabajo extends Component {
  constructor() {
    super();
    serviciosService.listadoPorProveedor();
    this.initialState = {
      submitted: false,
      isLoading: false,
      puntaje: "",
      descripcion: "",
      servicioId: undefined,
      //listadoServicios: serviciosService.getStore().servicios,
      listadoClientes: [],
      clienteId: undefined,
      clienteSeleccionadoText: ""
    };
    this.state = this.initialState;
  }
  componentDidMount() {
    clientesService.listado().then(response => {
      this.setState({
        listadoClientes: response.map((s, i) => {
          return { id: s.id, name: s.Usuario.nombre };
        })
      });
    });
  }

  HandleRegistroBtn() {
    this.setState({
      isLoading: true,
      submitted: true,
      error: ""
    });
    dismissKeyboard();
    trabajosService
      .crear(
        this.state.clienteId,
        this.state.servicioId,
        this.state.puntaje,
        this.state.descripcion
      )
      .then(response => {
        console.log("then", response);
        if (response.statusType == "success") {
          this.setState({
            isLoading: false
          });
          // Toast.show({
          //   text: response.message,
          //   buttonText: "OK",
          //   position: "top",
          //   type: "success"
          // });
          trabajosService.listadoPorProveedor().then(response => {
            this.state = this.initialState;
            this.props.navigation.navigate("Trabajos", {
              toast: {
                text: response.message,
                buttonText: "OK",
                position: "top",
                type: "success"
              }
            });
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

  render() {
    serviciosItems= null;
    if(this.props.listadoServicios){
      serviciosItems = this.props.listadoServicios.map((s, i) => {
        return (
          <Picker.Item key={s.id.toString()} value={s.id} label={s.nombre} />
        );
      }) ;
      serviciosItems.unshift(
        <Picker.Item key={"empty"} label="Seleccione un servicio" value="null" />
      );
    }
    

    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <SafeAreaView style={stl.containerList}>
          <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <Content style={stl.card}>
                <Form style={stl.form}>
                  <View>
                    <Text style={[stl.textBlack, stl.pickerlbl]}>
                      Servicio que ofreciste
                    </Text>
                    <Item
                      picker
                      style={stl.picker}
                      error={this.state.submitted && !this.state.servicioId}
                    >
                      <Picker
                        mode="dropdown"
                        placeholder="Seleccione el servicio ofrecido"
                        iosIcon={<Icon name="arrow-down" />}
                        style={[stl.textBlack, stl.pickerInput]}
                        name="servicio"
                        selectedValue={this.state.servicioId}
                        onValueChange={servicioSeleccionado => {
                          this.setState({ servicioId: servicioSeleccionado });
                        }}
                      >
                        {serviciosItems}
                      </Picker>
                    </Item>
                    {this.state.submitted && !this.state.servicioId && (
                      <Text style={stl.txtError}>
                        {" "}
                        El servicio es requerido
                      </Text>
                    )}
                  </View>
                  <View style={stl.areaText}>
                    <Label style={stl.textBlack}>Descripción del trabajo</Label>
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
                  <View style={stl.pickerSelect2}>
                    <Text
                      style={[stl.textBlack, stl.pickerlbl, stl.LabelSelect2]}
                    >
                      El cliente fue:
                    </Text>

                    <RNModal
                      dataSource={this.state.listadoClientes}
                      dummyDataSource={this.state.listadoClientes}
                      defaultValue={false}
                      pickerTitle={"¿Quien fue el cliente?"}
                      showSearchBar={true}
                      disablePicker={false}
                      changeAnimation={"none"}
                      searchBarPlaceHolder={"Buscar....."}
                      showPickerTitle={true}
                      searchBarContainerStyle={stl.searchBarContainerStyle}
                      pickerStyle={stl.pickerStyle}
                      pickerItemTextStyle={stl.listTextViewStyle}
                      selectedLabel={this.state.clienteSeleccionadoText}
                      placeHolderLabel={"Por favor, seleccione un cliente"}
                      selectLabelTextStyle={stl.selectLabelTextStyle}
                      placeHolderTextStyle={stl.placeHolderTextStyle}
                      dropDownImageStyle={stl.dropDownImageStyle}
                      selectedValue={(index, seleccionado) => {
                        this.setState({
                          clienteSeleccionadoText: seleccionado.name,
                          clienteId: seleccionado.id
                        });
                      }}
                    />
                    {this.state.submitted && !this.state.clienteId && (
                      <Text style={stl.txtError}> El cliente es requerido</Text>
                    )}
                  </View>
                  <View>
                    <Text style={[stl.textBlack, stl.pickerlbl]}>
                      Que puntaje le pones al cliente:
                    </Text>
                    <Item
                      picker
                      style={stl.picker}
                      error={this.state.submitted && !this.state.puntaje}
                    >
                      <Picker
                        mode="dropdown"
                        placeholder="Seleccione el puntaje"
                        iosIcon={<Icon name="arrow-down" />}
                        style={[stl.textBlack, stl.pickerInput]}
                        name="puntaje"
                        selectedValue={this.state.puntaje}
                        onValueChange={puntaje => this.setState({ puntaje })}
                      >
                        <Picker.Item
                          label="Por favor, seleccione el puntaje"
                          value="0"
                        />
                        <Picker.Item label="1 Muy malo" value="1" />
                        <Picker.Item label="2 Malo" value="2" />
                        <Picker.Item label="3 Regular" value="3" />
                        <Picker.Item label="4 Bueno" value="4" />
                        <Picker.Item label="5 Excelente " value="5" />
                      </Picker>
                    </Item>
                    {this.state.submitted && !this.state.puntaje && (
                      <Text style={stl.txtError}> El puntaje es requerido</Text>
                    )}
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
                      <Text style={stl.btnText}>Crear Trabajo</Text>
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

const mapStateToProps = state => {
  return {
    listadoServicios: serviciosService.getStore().servicios
  };
};
export default connect(mapStateToProps)(AddTrabajo);
