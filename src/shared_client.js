import { getToken } from './util'
import ApolloClient from 'apollo-boost/lib/index.umd'

export const client = new ApolloClient({
  uri: 'http://192.168.43.17:5000/graphql',
  request: async (operation) => {
    const token = await getToken()
    let config = {}
    if (token) {
      config.headers = {
        authorization: `Bearer ${token}`
      }
    }
    operation.setContext(config)
  }
})
