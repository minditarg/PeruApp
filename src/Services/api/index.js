/* global fetch */

import _ from "lodash";

import * as sessionSelectors from "../session/selectors";
import apiConfig from "./config";

export const exceptionExtractError = exception => {
  if (!exception.Errors) return false;
  let error = false;
  const errorKeys = Object.keys(exception.Errors);
  if (errorKeys.length > 0) {
    error = exception.Errors[errorKeys[0]][0].message;
  }
  return error;
};

export function fetchApi(
  endpoint,
  payload = {},
  metodo = "get",
  multipart = false
) {
  console.log("gat1");

  const accessToken = sessionSelectors.get().tokens;
  return fetch(apiConfig.url + endpoint, {
    method: metodo,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + accessToken,
      "Content-Type": multipart ? "multipart/form-data" : "application/json"
    },
    ...(metodo === "post" ? { body: JSON.stringify(payload) } : {})
  })
    .then(response => {
      return response.json();
    })
    .catch(function(error) {
      return error;
    });
}
