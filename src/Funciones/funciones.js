import fetchival from "fetchival";
import _ from "lodash";

export const fetchApi = (
  endPoint,
  payload = {},
  method = "get",
  headers = {}
) => {
  // const accessToken = sessionSelectors.get().tokens.access.value;
  console.log("regatooo");
  const accessToken = store.getState().appChoose.userToken;

  return fetchival(`${"http://10.30.30.125:3001/api/"}${endPoint}`, {
    headers: _.pickBy(
      {
        ...(accessToken
          ? {
              Authorization: `Bearer ${accessToken}`
            }
          : {}),
        ...headers
      },
      item => !_.isEmpty(item)
    )
  })
    [method.toLowerCase()](payload)
    .catch(e => {
      if (e.response && e.response.json) {
        e.response.json().then(json => {
          if (json) throw json;
          throw e;
        });
      } else {
        throw e;
      }
    });
};
