import {
  AUTHIN_ERROR, AUTHUP_ERROR, AUTH_USER, FETCH_MESSAGE,
  UNAUTH_USER,
} from '../actions/types';


export default function(state={}, action){
  switch (action.type){
    case AUTH_USER:{
      return {...state, errorin:'', errorup:'', authenticated:true};
    }
    case UNAUTH_USER:{
      return {...state, authenticated:false};
    }
    case AUTHIN_ERROR:{
      return {...state, errorin:action.payload};
    }
    case AUTHUP_ERROR:{
      return {...state, errorup:action.payload};
    }
    case FETCH_MESSAGE:{
      return {...state, message:action.payload};
    }
  }
    return state;

}