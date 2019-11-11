/* global fetch */

import _ from 'lodash';

import * as sessionSelectors from '../session/selectors';
import apiConfig from './config';

export const exceptionExtractError = (exception) => {
	if (!exception.Errors) return false;
	let error = false;
	const errorKeys = Object.keys(exception.Errors);
	if (errorKeys.length > 0) {
		error = exception.Errors[errorKeys[0]][0].message;
	}
	return error;
};


export async function fetchApi(endpoint, payload = {}, metodo = 'get', multipart = false) {
	try {
		const accessToken = sessionSelectors.get().tokens;

		let response = await fetch(
			apiConfig.url + endpoint,
			{
				method: metodo,
				headers: {
					'Accept': 'application/json',  
					"Authorization": 'Bearer ' + accessToken, 
					'Content-Type': 'multipart/form-data',
					
				},
				...(metodo === 'post' ? { body: payload } : {}),
			}
		);
		let responseJson = await response.json();
		return responseJson;
	} catch (error) {
		console.log(error);
	}
};



