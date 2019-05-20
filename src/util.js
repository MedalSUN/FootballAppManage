import { AsyncStorage } from 'react-native'

const AUTH_TOKEN = 'AUTH_TOKEN'

let token

// export const getToken = async () => {
//   if (token) {
//     return Promise.resolve(token)
//   }

//   token = await AsyncStorage.getItem(AUTH_TOKEN)
//   return token
// }

// export const signIn = (newToken) => {
//   token = newToken
//   return AsyncStorage.setItem(AUTH_TOKEN, newToken)
// }

// export const signOut = () => {
//   token = undefined
//   return AsyncStorage.removeItem(AUTH_TOKEN)
// }

//  增加获取token的方法
export const getToken = async () => {
  if (token) {
    return Promise.resolve(token)
  }
  token = await AsyncStorage.getItem('jwt')
  return token
}

// 增加移除token的方法
export const signOut = () => {
  token = undefined
  return AsyncStorage.removeItem('jwt')
}

// 从新设置token
export const signIn = (newToken) => {
  token = newToken
  return AsyncStorage.setItem('jwt', newToken)
}
