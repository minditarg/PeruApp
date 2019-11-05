
const urlApi= "http://10.30.30.125:3001/api/";
export async function Fetchiar(endpoint, payload = {}, metodo = 'get') {
  try {
    let response = await fetch(
      urlApi + endpoint,
      {
        method: metodo,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        ...(metodo==='post' ? { body: JSON.stringify(payload)} : {}),
      }
    );
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}

/*

export function Fetchiar(endpoint, payload = {}, metodo = 'get'){

  console.log("ñoquis con papa");
  if(metodo === 'get'){
    return fetch("https://pokeapi.co/api/v2/pokemon/"+ endpoint, {
      method: 'get',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        respuesta= response.json();
      })
      .then(responseData => {
      
      //  console.log(responseData);
        return responseData;
      })
      .catch(error => {
          console.log("el error es" + error);
      });

  }else if(metodo ==='post'){
    return fetch("https://pokeapi.co/api/v2/pokemon/"+ endpoint, {
      method: 'post',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        if (res.error) {
          throw res.error;
        }
      //  console.log(responseData);
        return responseData;
      })
      .catch(error => {
          console.log("el error es" + error);
      });
    }

    }

*/