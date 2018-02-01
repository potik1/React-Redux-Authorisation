import axios from 'axios';
import history from '../utils/history';
import {
  AUTHIN_ERROR,
  AUTHUP_ERROR,
  UNAUTH_USER,
  AUTH_USER,
  FETCH_MESSAGE,
} from '../actions/types';

const API_URL = 'http://localhost:3090';

export function signinUser({email, password}) {  //{email:email, password:password}

  return dispatch => {

    axios.post(`${API_URL}/signin`, {email, password}).then(response => {
      //save JWT token
      localStorage.setItem('token', response.data.token);
      //authentication is true
      dispatch({type: AUTH_USER});
      //redirect to the route '/feature'
      history.push('/feature');

    }).catch(() => {
      dispatch(authInError('BAD EMAIL OR PASSWORD'));
    });
  };
}

export function signupUser({email, password}) {

  return dispatch => {
    axios.post(`${API_URL}/signup`, {email, password}).then(response => {
      localStorage.setItem('token', response.data.token);
      dispatch({type: AUTH_USER});
      history.push('/feature');
    }).catch(error => {
      dispatch(authUpError(error.response.data.error));
    });
  };
}

export function authInError(error) {
  return {
    type: AUTHIN_ERROR,
    payload: error,
  };
}
export function authUpError(error) {
  return {
    type: AUTHUP_ERROR,
    payload: error,
  };
}
export function signoutUser() {
  localStorage.removeItem('token');
  return {type: UNAUTH_USER};
}

export function fetchMessage() {
  return dispatch => {
    axios.get(API_URL, {
      headers: {authorization: localStorage.getItem('token')},
    }).then(response => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message,
      });
    });
  };
}
