import React, { Component } from "react";
import { FlatList, TouchableOpacity, View, ScrollView } from "react-native";
import works from "../../../Datos/Trabajos.json";

import { Container, Content, Button, Icon, Text } from "native-base";
import { stl } from "../styles/styles";
import { CardList } from "../../Componentes/CardList";
import RNModal from "rn-modal-picker";

class FeedServicios extends Component {
  constructor() {
    super();
    this.state = {
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
          name: "Greece Greece GreeceGreece "
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
  render() {
    return (
      <Container style={stl.containerList}>
        <View style={stl.SearchBar}>
          <ScrollView horizontal style={stl.SearchBar2}>
            <Button
              style={stl.EmptyFilter}
              transparent
              onPress={() => {
                this.HandleEliminarBtn(obj);
              }}
            >
              <Icon style={stl.EmptyFilterIcon} type="EvilIcons" name="trash" />
            </Button>
            <View style={[stl.filter, stl.filterCat]}>
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
                pickerStyle={stl.pickerStyle2}
                pickerItemTextStyle={stl.listTextViewStyle}
                selectedLabel={this.state.selectedText}
                placeHolderLabel={"Categoria"}
                selectLabelTextStyle={stl.selectLabelTextStyle2}
                placeHolderTextStyle={stl.selectLabelTextStyle2}
                dropDownImageStyle={stl.dropDownImageStyle2}
                selectedValue={(index, item) =>
                  this._selectedValue(index, item)
                }
              />
            </View>
            <View style={[stl.filter, stl.filterCat]}>
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
                pickerStyle={stl.pickerStyle2}
                pickerItemTextStyle={stl.listTextViewStyle}
                selectedLabel={this.state.selectedText}
                placeHolderLabel={"SubCategoria"}
                selectLabelTextStyle={stl.selectLabelTextStyle2}
                placeHolderTextStyle={stl.selectLabelTextStyle2}
                dropDownImageStyle={stl.dropDownImageStyle2}
                selectedValue={(index, item) =>
                  this._selectedValue(index, item)
                }
              />
            </View>
            <View style={[stl.filter, stl.filterCat]}>
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
                pickerStyle={stl.pickerStyle2}
                pickerItemTextStyle={stl.listTextViewStyle}
                selectedLabel={this.state.selectedText}
                placeHolderLabel={"Localidad"}
                selectLabelTextStyle={stl.selectLabelTextStyle2}
                placeHolderTextStyle={stl.selectLabelTextStyle2}
                dropDownImageStyle={stl.dropDownImageStyle2}
                selectedValue={(index, item) =>
                  this._selectedValue(index, item)
                }
              />
            </View>
          </ScrollView>
        </View>
        <Content>
          <FlatList
            style={stl.listaPadding}
            data={works}
            renderItem={({ item }) => (
              <CardList
                navigation={this.props.navigation}
                trash={false}
                Image
                obj={item}
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </Content>
      </Container>
    );
  }
}
export default FeedServicios;
