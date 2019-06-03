import { getToken } from './util'
import ApolloClient from 'apollo-boost/lib/index.umd'

export const client = new ApolloClient({
  uri: 'http://172.20.0.254:5000/graphql',
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
