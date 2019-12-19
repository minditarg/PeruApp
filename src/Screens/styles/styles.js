import { StyleSheet } from "react-native";
const Primary = "#2392e5";
const darkBlue = "#235be5";
const faceColor = "#4a6ea8";
const googleColor = "#f7f7f7";
const textWhite = "whitesmoke";
const colorError = "#ff2727";
const bkGray = "#ededed";
export const stl = StyleSheet.create({
  imgBkground: { width: "100%", height: "100%" },
  imgLogoGrande: {
    flex: 1,
    width: "100%",
    aspectRatio: 1.48,
    resizeMode: "contain"
  },
  center: { justifyContent: "center", alignItems: "center" },
  btnSelect: {
    margin: 5,
    paddingTop: 20,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    height: 80
  },

  btn: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    margin: 15,
    padding: 0,
    textAlign: "center",
    borderRadius: 5
  },
  primary: {
    backgroundColor: Primary
  },
  darkBlue: {
    backgroundColor: darkBlue
  },
  Face: {
    margin: 0,
    backgroundColor: faceColor
  },
  Google: {
    margin: 0,
    backgroundColor: googleColor
  },
  btnText: { padding: 0, textAlign: "center" },
  btnTextRsGoogle: { textTransform: "capitalize", color: "#444" },
  btnTextRsFace: { textTransform: "capitalize" },

  txtArea: {
    marginVertical: 20
  },
  btnSaltar: {
    position: "absolute",
    right: 0,
    bottom: 50,
    backgroundColor: "rgba(0,0,0,.5)"
  },
  padding10: { padding: 10 },
  form: {
    marginLeft: 20,
    marginRight: 30,
    marginBottom: 20
  },
  textwhite: {
    color: textWhite
  },
  txtError: {
    color: colorError,
    fontWeight: "bold",
    fontSize: 15,
    paddingLeft: 15
  },
  btnsRow: {
    flexDirection: "row",
    marginHorizontal: -10,
    justifyContent: "space-around"
  },
  mTop20: { marginTop: 20 },
  iconoImg: {
    height: 30,
    width: 30,
    margin: 0,
    padding: 0
  },
  paddingTop30: {
    paddingTop: "30%"
  },
  vista: {
    paddingTop: 30,
    paddingBottom: 30,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  areaText: {
    marginTop: 20,
    marginLeft: 15
  },
  btnImg: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#ddd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  btnImgServ: {
    width: 150,
    height: 150,
    borderRadius: 5,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center"
  },
  iconCam: {
    color: "#444",
    fontSize: 40
  },
  headerStyle: {
    backgroundColor: "#044fb3",
    borderBottomColor: "red",
    borderBottomWidth: 4
  },
  headerAvatar: {
    margin: 5,
    padding: 15,
    height: 30,
    aspectRatio: 1
  },
  headerIcon: {
    margin: 5,
    height: 40,
    aspectRatio: 1
  },
  btnAvatar: {
    padding: 0,
    margin: 10,
    height: 40,
    width: 40
  },
  containerList: {
    backgroundColor: bkGray,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  card: {
    paddingLeft: 10,
    paddingVertical: 5,
    flex: 1,
    borderRadius: 3,
    shadowColor: "#ffff",
    backgroundColor: "#fff",
    marginVertical: 3,
    borderColor: "white",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.01,
    shadowRadius: 1.41,

    elevation: 1
  },

  cardEnModal: {
    paddingLeft: 10,
    paddingVertical: 5,

    borderRadius: 3,
    shadowColor: "#ffff",
    backgroundColor: "#fff",
    marginVertical: 3,
    borderColor: "white",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.01,
    shadowRadius: 1.41,

    elevation: 1
  },
  cardFluid: {
    paddingLeft: 10,
    borderRadius: 3,
    shadowColor: "#ffff",
    backgroundColor: "#fff",
    marginVertical: 3,
    borderColor: "white",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.01,
    shadowRadius: 1.41,

    elevation: 1
  },
  tituloModal: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
    marginBottom: 15
  },
  link: {
    color: "#444"
  },
  codigoYt: {
    backgroundColor: "yellow"
  },
  cardHor: {
    flexDirection: "row"
  },
  cardImg: {
    margin: 10,
    height: 50,
    aspectRatio: 1,
    borderRadius: 5
  },
  cardBody: {
    flex: 2,
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start"
  },
  cardLeft: { flex: 1 },
  cardRight: { flex: 1 },
  cardTitulo: {
    fontSize: 20,

    color: "#444"
  },
  cardSubtitulo: {
    fontSize: 15,
    marginTop: -5,
    paddingTop: 0,
    color: "#444"
  },
  iconstar: {
    color: "#e0ba1b",
    fontSize: 20,
    marginRight: 2
  },
  puntaje: {
    flexDirection: "row",
    marginTop: -2
  },
  btnRounded: {
    position: "absolute",
    right: 20,
    bottom: 25,
    borderRadius: 100,
    width: 60,
    zIndex: 7,
    height: 60
  },
  iconPlus: {
    color: textWhite
  },
  listaPadding: {
    paddingBottom: 90
  },
  textBlack: {
    color: "#444"
  },
  picker: {
    marginLeft: 15,
    marginTop: 20,
    paddingBottom: 0,
    marginBottom: 0
  },
  pickerInput: {
    padding: 0,
    height: 40
  },
  pickerInputText: {
    backgroundColor: "red"
  },
  vistaimgs: {
    width: "100%",
    justifyContent: "space-around",
    flexWrap: "wrap"
  },
  imgbtn: {
    marginBottom: 5
  },
  touchableImg: {
    marginBottom: 15
  },
  loading: {
    position: "absolute",
    top: "50%",
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  btnEliminarFoto: {
    position: "absolute",
    bottom: -20,
    right: -20
  },
  iconEliminarFoto: {
    fontSize: 30,
    aspectRatio: 1,
    padding: 5,

    color: colorError,

    justifyContent: "center"
  },
  loadingbk: {
    width: 100,
    height: 100,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.5)",
    borderRadius: 5
  },
  imgActions: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "row"
  },
  imgAction: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,.5)",
    padding: 3
  },
  imgActionFirst: {
    borderRightColor: "#333",
    borderRightWidth: 1
  },
  imgActionIcon: {
    fontSize: 20,
    alignSelf: "center",
    color: "#fff"
  },
  imgActionIconFirst: {
    color: "#ffc107"
  },
  firstItem: {
    backgroundColor: "rgba(0,0,0,0)"
  },
  imgDeleteIcon: {
    color: "#000"
  },
  disabled: {
    backgroundColor: "#eee"
  },
  itmPicker: {
    flex: 1,
    margin: 0,
    padding: 0
  },

  pickerlbl: {
    marginTop: 20,
    color: "#888",
    marginLeft: 20,
    marginBottom: -30,
    padding: 0
  },
  BotonesTipoServicio: {
    flexDirection: "column",
    flex: 1,
    paddingBottom: 60,
    paddingHorizontal: "10%",
    alignContent: "center",
    justifyContent: "space-around"
  },
  SelectCatText: {
    textAlign: "center",
    padding: 10,
    justifyContent: "center",
    alignContent: "center",
    flex: 0.3
  },
  TextPregunta: {
    textAlign: "center",
    fontSize: 25,
    color: "#444"
  },
  Premium: {
    backgroundColor: "#24e263"
  },
  Supervisado: {
    backgroundColor: "#e28c24"
  },
  Standar: {
    backgroundColor: "#2392e5"
  },
  btnTextTipoServicio: {
    fontWeight: "bold",
    fontSize: 18
  },
  selectLabelTextStyle: {
    fontFamily: "Roboto",
    color: "#000",
    textAlign: "left",
    width: "99%",
    padding: 10,
    flexDirection: "row"
  },
  placeHolderTextStyle: {
    fontFamily: "Roboto",
    color: "#D3D3D3",
    padding: 10,
    textAlign: "left",
    width: "99%",
    flexDirection: "row"
  },
  dropDownImageStyle: {
    marginLeft: 10,
    width: 10,
    height: 10,
    alignSelf: "center"
  },
  listTextViewStyle: {
    fontFamily: "Roboto",
    color: "#000",
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: "left",
    color: "#444"
  },
  pickerStyle: {
    marginLeft: 23,
    fontFamily: "Roboto",
    paddingRight: 25,
    marginRight: 10,
    marginBottom: 2,
    borderBottomColor: "#aaa",
    borderBottomWidth: 1,
    borderRadius: 0,
    flexDirection: "row"
  },
  LabelSelect2: {
    marginBottom: 10
  },
  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: "row",
    height: 40,
    borderRadius: 0,
    fontFamily: "Roboto",
    borderBottomWidth: 1,
    borderColor: "#aaa",
    marginLeft: 10,
    marginRight: 10
  },
  SearchBar: {
    backgroundColor: "white",
    height: 60,
    margin: -10,

    marginBottom: 10
  },
  filter: {
    width: 110,
    color: "#444",
    paddingTop: 10,
    textAlign: "center",
    paddingBottom: 10
  },

  pickerStyle2: {
    color: "#333",
    width: 110
  },

  selectLabelTextStyle2: {
    paddingTop: 10,

    textAlign: "center"
  },
  dropDownImageStyle2: {
    display: "none"
  },
  EmptyFilter: {
    width: 60,
    color: "#444",
    paddingTop: 20,
    textAlign: "center",
    alignItems: "center",
    alignContent: "center"
  },
  EmptyFilterIcon: {
    color: "#444",
    fontSize: 35
  },
  labelSeccion: {
    marginLeft: -10
  },
  tituloSeccion: {
    padding: 10,
    fontWeight: "bold",
    paddingLeft: 20
  },
  tituloSeccionCard: {
    paddingHorizontal: 10,
    paddingVertical: 0,
    fontWeight: "bold",
    fontSize: 20,
    flex: 1
  },
  CardEmpresa: {
    borderRadius: 25,
    backgroundColor: "red"
  },
  imgEmpresa: {
    flex: 1,
    aspectRatio: 1,
    paddingTop: 10
  },
  imgEmp: {
    height: 100,
    width: 100,
    margin: 5
  },
  tituloEmpresa: {},
  MarginTop15: {
    marginTop: 15
  },
  txtEmpresa: { paddingHorizontal: 15, paddingTop: 15 },
  TelEmpresa: {
    fontWeight: "bold",
    color: darkBlue,
    textAlign: "right",
    paddingHorizontal: 15,
    paddingVertical: 7
  },
  btnFloatImg: {
    width: 60,
    height: 60
  },
  MailEmpresa: {
    fontWeight: "bold",
    color: darkBlue,
    paddingHorizontal: 15,
    paddingVertical: 7,
    flex: 1
  },
  DescEmpresa: {
    margin: 5,
    paddingLeft: 10,
    flex: 3
  },
  DescEmpresaCard: {
    paddingLeft: 10,
    flex: 3
  },
  modal: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9,
    bottom: 0,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.8)"
  },

  imgModal: {
    aspectRatio: 1,
    width: "100%",
    zIndex: 9,
    alignSelf: "center"
  },
  pointEnCard: {
    paddingLeft: 10
  },
  PassChangeForm: {
    backgroundColor: "#eee",
    marginLeft: 15
  },
  checboxLabel: {
    marginLeft: 5
  },
  puntajeEnCard: {
    marginLeft: 10
  }
});
