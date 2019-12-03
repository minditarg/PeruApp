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
  Item,
  Input,
  Textarea,
  Label
} from "native-base";
import RNModal from "rn-modal-picker";
import { stl } from "../Screens/styles/styles";

export class AddTrabajo extends Component {
  constructor() {
    super();
    this.state = {
      titulo: "",
      submitted: false,
      image: null,
      selected2: undefined,
      dataSource: [
        {
          id: 1,
          name: "Afghanistan"
        },
        {
          id: 2,
          name: "Bahrain"
        },
        {
          id: 3,
          name: "Canada"
        },
        {
          id: 4,
          name: "Denmark"
        },
        {
          id: 5,
          name: "Egypt"
        },
        {
          id: 6,
          name: "France"
        },
        {
          id: 7,
          name: "Greece"
        },
        {
          id: 8,
          name: "Hong Kong"
        },
        {
          id: 9,
          name: "India"
        },
        {
          id: 10,
          name: "Japan"
        },
        {
          id: 11,
          name: "Kenya"
        },
        {
          id: 12,
          name: "Liberia"
        }
      ],
      placeHolderText: "Please Select Country",
      selectedText: ""
    };
  }

  _selectedValue(index, item) {
    this.setState({ selectedText: item.name });
  }
  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }
  render() {
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
                      error={this.state.submitted && !this.state.email}
                    >
                      <Picker
                        mode="dropdown"
                        placeholder="Categoria"
                        iosIcon={<Icon name="arrow-down" />}
                        style={[stl.textBlack, stl.pickerInput]}
                        name="categoria"
                        selectedValue={this.state.selected2}
                        onValueChange={this.onValueChange2.bind(this)}
                      >
                        <Picker.Item label="titulo servicio" value="key0" />
                        <Picker.Item label="titulo servicio 2" value="key1" />
                        <Picker.Item label="titulo servicio 3" value="key2" />
                        <Picker.Item label=" titulo servicio 4" value="key3" />
                        <Picker.Item label="titulo servicio 5" value="key4" />
                      </Picker>
                    </Item>
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
                      dataSource={this.state.dataSource}
                      dummyDataSource={this.state.dataSource}
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
                      selectedLabel={this.state.selectedText}
                      placeHolderLabel={this.state.placeHolderText}
                      selectLabelTextStyle={stl.selectLabelTextStyle}
                      placeHolderTextStyle={stl.placeHolderTextStyle}
                      dropDownImageStyle={stl.dropDownImageStyle}
                      selectedValue={(index, item) =>
                        this._selectedValue(index, item)
                      }
                    />
                  </View>
                  <View>
                    <Text style={[stl.textBlack, stl.pickerlbl]}>
                      Que puntaje le pones al cliente:
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
                        selectedValue={this.state.selected2}
                        onValueChange={this.onValueChange2.bind(this)}
                      >
                        <Picker.Item label="1 Pesimo" value="key1" />
                        <Picker.Item label="2 Muy malo" value="key2" />
                        <Picker.Item label="3 Malo" value="key3" />
                        <Picker.Item label="4 Regular" value="key4" />
                        <Picker.Item label="5 " value="key5" />
                        <Picker.Item label="6 " value="key6" />
                        <Picker.Item label="7 Bien" value="key7" />
                        <Picker.Item label="8 Muy bien" value="key8" />
                        <Picker.Item label="9 Sobresaliente" value="key9" />
                        <Picker.Item label="10 Excelente" value="key10" />
                      </Picker>
                    </Item>
                  </View>
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
