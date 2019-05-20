import {
  AUTH_USER,
  UNAUTH_USER
} from './types'
import { AsyncStorage } from 'react-native'
// import { push } from 'react-router-redux'

// import {withRouter} from "react-router-dom";
// import { browserHistory } from 'react-router';
// import { push } from 'react-router-redux';

export function signinUser (jwt, id) {
  console.log('in signin action', jwt)
  console.log('in signin action', id)
  return function (dispatch) {
    dispatch({ type: AUTH_USER, userId: id })
    // - Save the JWT token
    AsyncStorage.setItem('jwt', jwt)
    // AsyncStorage.setItem('current_id', id)
    // - redirect to the route '/feature'
    //    push('/feature');
  }
}

export function signoutUser () {
  AsyncStorage.removeItem('jwt')
  //   AsyncStorage.removeItem('current_id')
  return { type: UNAUTH_USER }
}
