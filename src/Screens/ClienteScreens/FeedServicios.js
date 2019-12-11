import React, { Component } from "react";
import { FlatList, TouchableOpacity, View, ScrollView } from "react-native";
import works from "../../../Datos/Trabajos.json";

import { Container, Content, Button, Icon, Text } from "native-base";
import { stl } from "../styles/styles";
import { CardList } from "../../Componentes/CardList";
import RNModal from "rn-modal-picker";
import * as servicioService from "../../Services/servicios";
import { connect } from "react-redux";

class FeedServicios extends Component {
  constructor() {
    super();
    servicioService.buscar();
    servicioService.listadoCategorias();
    this.state = {
      subcategorias:[],
      localidadSeleccionadaText: "",
      localidadId: "",
      subcategoriaSeleccionadaText: "ee",
      subcategoriaId: "",
      categoriaSeleccionadaText: "ee",
      categoriaId: "",
      
      dataSource: [
        {
          id: 1,
          name: "Afghanistane"
        },
        {
          id: 2,
          name: "Bahrain"
        },
      ],
    };
  }

  componentDidMount() {
    // this.setState({
    //   servicios: [],
    // })
  }

  _cambioCategoria(nombre, id) {
    this.setState({ categoriaSeleccionadaText: nombre, categoriaId: id });
    this.setState({subcategorias : this.props.categorias.find(item => item.id === id).subcategorias});
    console.log(this.state.categoriaId, "eeeeeee");
    servicioService.buscar(this.state.categoriaId, this.state.subcategoriaId, this.state.localidadId);
  }
  // buscarServicios() {
  //   servicioService.buscar(categoriaId, subcategoriaId, localidadId).then(response => {
  //     this.setState({ serviciosEncontrados: response });
  //   })
  // }
  _cambioSubcategoria(nombre, id) {
    this.setState({ subcategoriaSeleccionadaText: nombre, subcategoriaId: id });
  }
  _cambioLocalidad(nombre, id) {
    this.setState({ localidadSeleccionadaText: nombre, localidadId: id });
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
                dataSource={this.props.categorias.map((s, i) => { return { id: s.id, name: s.nombre}  })}
                dummyDataSource={this.props.categorias}
                defaultValue={false}
                pickerTitle={"¿Que categoría buscás?"}
                showSearchBar={true}
                disablePicker={false}
                changeAnimation={"none"}
                searchBarPlaceHolder={"Buscar....."}
                showPickerTitle={true}
                searchBarContainerStyle={stl.searchBarContainerStyle}
                pickerStyle={stl.pickerStyle2}
                pickerItemTextStyle={stl.listTextViewStyle}
                selectedLabel={this.state.categoriaSeleccionadaText}
                placeHolderLabel={"Categoria"}
                selectLabelTextStyle={stl.selectLabelTextStyle2}
                placeHolderTextStyle={stl.selectLabelTextStyle2}
                dropDownImageStyle={stl.dropDownImageStyle2}
                selectedValue={(index, seleccionado) =>
                  this._cambioCategoria(seleccionado.name, seleccionado.id)
                }
              />
            </View>
            <View style={[stl.filter, stl.filterCat]}>
              <RNModal
                dataSource={this.state.subcategorias.map((s, i) => { return { id: s.id, name: s.nombre}  })}
                dummyDataSource={this.state.subcategorias.map((s, i) => { return { id: s.id, name: s.nombre}  })}
                defaultValue={false}
                pickerTitle={"¿Que subcategoría buscás?"}
                showSearchBar={true}
                disablePicker={false}
                changeAnimation={"none"}
                searchBarPlaceHolder={"Buscar....."}
                showPickerTitle={true}
                searchBarContainerStyle={stl.searchBarContainerStyle}
                pickerStyle={stl.pickerStyle2}
                pickerItemTextStyle={stl.listTextViewStyle}
                selectedLabel={this.state.subcategoriaSeleccionadaText}
                placeHolderLabel={"Subcategoría"}
                selectLabelTextStyle={stl.selectLabelTextStyle2}
                placeHolderTextStyle={stl.selectLabelTextStyle2}
                dropDownImageStyle={stl.dropDownImageStyle2}
                selectedValue={(index, seleccionado) => {
                  this._cambioSubcategoria(seleccionado.name, seleccionado.id)
                }}
              />
            </View>
            {/* <View style={[stl.filter, stl.filterCat]}>
              <RNModal
                dataSource={this.state.dataSource}
                dummyDataSource={this.state.dataSource}
                defaultValue={false}
                pickerTitle={"¿Que localidad?"}
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
                selectedValue={(index, seleccionado) => {
                  this._cambioLocalidad(seleccionado.name, seleccionado.id)
                }}
              />
            </View> */}
          </ScrollView>
        </View>
        <Content>
          <FlatList
            style={stl.listaPadding}
            data={this.props.serviciosEncontrados}
            renderItem={({ item }) => (
              <CardList
                navigation={this.props.navigation}
                trash={false}
                Image
                obj={item}
                keyExtractor={item => item.id.toString()}
              />
            )}
           
          />
        </Content>
      </Container>
    );
  }
}


const mapStateToProps = state => {
  return {
    serviciosEncontrados: servicioService.getStore().servicios,
    categorias: servicioService.getStore().categorias
  };
};
export default connect(mapStateToProps)(FeedServicios);


