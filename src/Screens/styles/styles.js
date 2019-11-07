import { StyleSheet } from "react-native";
const Primary = "#2392e5";
const darkBlue = "#235be5";
const faceColor = "#4a6ea8";
const googleColor = "#f7f7f7";
const textWhite = "whitesmoke";
const colorError = "#ff2727";

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
  vista: {
    paddingTop: 30,
    paddingBottom: 30
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
  btnTextRs: { textTransform: "capitalize" },
  txtArea: {
    // marginLeft: 15,
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
  iconCam: {
    color: "#444",
    fontSize: 40
  }
});
