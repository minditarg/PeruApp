import React, { Component } from "react";
import { FlatList, TouchableOpacity, View, ScrollView } from "react-native";
import works from "../../../Datos/Trabajos.json";

import { Container, Content, Button, Icon, Text } from "native-base";
import { stl } from "../styles/styles";
import { CardList } from "../../Componentes/CardList";
import RNModal from "rn-modal-picker";
import * as servicioService from "../../Services/servicios";
import * as commonService from "../../Services/common";
import { connect } from "react-redux";

class FeedServicios extends Component {
  constructor() {
    super();

    this.state = {
      subcategorias: [],
      localidadSeleccionadaText: "Localidad",
      localidadId: "",
      subcategoriaSeleccionadaText: "Subacategoría",
      subcategoriaId: "",
      categoriaSeleccionadaText: "Categoría",
      categoriaId: "",
      esSupervisado: false
    };
  }

  componentDidMount() {
    let esSup = this.props.navigation.getParam("esSupervisado");
    this.setState({esSupervisado: esSup})

    servicioService.buscar(esSup);
    commonService.listadoCategorias();
    commonService.listadoLocalidades();
}

  _cambioCategoria(nombre, id) {
    this.setState({
      categoriaSeleccionadaText: nombre,
      categoriaId: id,
      subcategoriaId: "",
      subcategoriaSeleccionadaText: "Subcategoría"
    });
    this.setState({
      subcategorias: this.props.categorias.find(item => item.id === id)
        .subcategorias
    });
    servicioService.buscar(this.state.esSupervisado,id, "", this.state.localidadId);
  }

  _cambioSubcategoria(nombre, id) {
    this.setState({ subcategoriaSeleccionadaText: nombre, subcategoriaId: id });
    servicioService.buscar(this.state.esSupervisado,this.state.categoriaId, id, this.state.localidadId);
  }
  _cambioLocalidad(nombre, id) {
    this.setState({ localidadSeleccionadaText: nombre, localidadId: id });
    servicioService.buscar(
      this.state.esSupervisado,
      this.state.categoriaId,
      this.state.subcategoriaId,
      id
    );
  }
  HandleLimpiarBuscadorBtn() {
    servicioService.buscar(this.state.esSupervisado);
    this.setState({
      subcategoriaId: "",
      subcategoriaSeleccionadaText: "Subcategoría",
      categoriaId: "",
      categoriaSeleccionadaText: "Categoría",
      localidadId: "",
      localidadSeleccionadaText: "Localidad",
      subcategorias: []
    });
  }
  onBtnPress() {
    console.log("caca");
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
                this.HandleLimpiarBuscadorBtn();
              }}
            >
              <Icon style={stl.EmptyFilterIcon} type="EvilIcons" name="trash" />
            </Button>
            <View style={[stl.filter, stl.filterCat]}>
              <RNModal
                dataSource={this.props.categorias.map((s, i) => {
                  return { id: parseInt(s.id), name: s.nombre };
                })}
                keyExtractor={item => item.id.toString()}
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
                placeHolderLabel={"Categoría"}
                selectLabelTextStyle={stl.selectLabelTextStyle2}
                placeHolderTextStyle={stl.selectLabelTextStyle2}
                dropDownImageStyle={stl.dropDownImageStyle2}
                selectedValue={(index, seleccionado) => {
                  return this._cambioCategoria(
                    seleccionado.name,
                    seleccionado.id
                  );
                }}
              />
            </View>
            <View style={[stl.filter, stl.filterCat]}>
              <RNModal
                dataSource={this.state.subcategorias.map((s, i) => {
                  return { id: s.id, name: s.nombre };
                })}
                dummyDataSource={this.state.subcategorias.map((s, i) => {
                  return { id: s.id, name: s.nombre };
                })}
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
                  this._cambioSubcategoria(seleccionado.name, seleccionado.id);
                }}
              />
            </View>
            <View style={[stl.filter, stl.filterCat]}>
              <RNModal
                dataSource={this.props.localidades.map((s, i) => {
                  return { id: s.id, name: s.nombre };
                })}
                dummyDataSource={this.props.localidades.map((s, i) => {
                  return { id: s.id, name: s.nombre };
                })}
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
                selectedLabel={this.state.localidadSeleccionadaText}
                placeHolderLabel={"Localidad"}
                selectLabelTextStyle={stl.selectLabelTextStyle2}
                placeHolderTextStyle={stl.selectLabelTextStyle2}
                dropDownImageStyle={stl.dropDownImageStyle2}
                selectedValue={(index, seleccionado) => {
                  this._cambioLocalidad(seleccionado.name, seleccionado.id);
                }}
              />
            </View>
          </ScrollView>
        </View>
        <Content>
          <FlatList
            style={stl.listaPadding}
            data={this.props.serviciosEncontrados}
            renderItem={({ item }) => (
              <CardList
                onPress={() => {
                  servicioService.get(item.id);
                  this.props.navigation.push("ServicioDetail", { id: item.id });
                }}
                navigation={this.props.navigation}
                trash={false}
                Image
                accion={() => this.onBtnPress()}
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
    categorias: commonService.getStore().categorias,
    localidades: commonService.getStore().localidades
  };
};
export default connect(mapStateToProps)(FeedServicios);
