import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from '../actions/types'

export default function (state = {}, action) {
  console.log('in reducer:', action)
  // console.log('in reducer state:', state)
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true, userId: action.userId, chatId: action.chatId }
    case UNAUTH_USER:
      return { ...state, authenticated: false }
    case AUTH_ERROR:
      return { ...state, error: action.payload }
  }

  return state
}
