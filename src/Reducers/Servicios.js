const Servicios = (state = [], action) => {
  switch (action.type) {
    case "LOGIN":
      console.log("login");
      return state;
    default:
      console.log("default");
      return state;
  }
};

export default Servicios;
