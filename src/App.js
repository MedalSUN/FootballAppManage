import React from 'react'

import { createStackNavigator } from 'react-navigation'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

// 引入登陆相关页面
import Login from './components/auth/Login'
// 引入底部导航栏
import BottomTabNavigator from './components/nav/BottomTabNavigator'

import { signIn, signOut, getToken } from './util'
import AV from 'leancloud-storage'
import { AV_APP_ID as appId, AV_APP_KEY as appKey } from './constants'
import { TextMessage, Realtime, Event } from 'leancloud-realtime'
import { TypedMessagesPlugin, ImageMessage } from 'leancloud-realtime-plugin-typed-messages'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import reduxThunk from 'redux-thunk'

import { client } from '../src/shared_client'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// 登录模块
const AuthStack = createStackNavigator({
  Login: { screen: Login }
})

const LoggedInStack = createStackNavigator({
  HomeScreen: { screen: BottomTabNavigator, navigationOptions: { header: null } }
})

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      loggedIn: false
    }
  }

  // eslint-disable-next-line react/no-deprecated
  // async componentWillMount () {
  //   const token = await getToken()
  //   if (token) {
  //     this.setState({
  //       loggedIn: true
  //     })
  //   }
  // }

  componentDidMount () {
    AV.initialize(appId, appKey)
    global.AV = AV

    console.log('av is:', AV)

    var realtime = new Realtime({
      appId: appId,
      appKey: appKey,
      plugins: [TypedMessagesPlugin] // 注册富媒体消息插件
    })

    global.realtime = realtime
  }

  handleChangeLoginState = (loggedIn, jwt) => {
    this.setState({
      loggedIn: loggedIn
    })
    if (loggedIn) {
      signIn(jwt)
    } else {
      // 执行登出操作
      signOut()
    }
  };

  // 用于执行退出登录操作
  // logOut = () => {
  //   console.log('执行退出登录操作')
  //   this.setState({
  //     loggedIn: false
  //   })
  //   signOut()
  // }

  render () {
    return (
      <ApolloProvider client={client}>
        {/* <ChatScreen /> */}
        <Provider store={store}>
          {this.state.loggedIn
            ? <LoggedInStack screenProps={{ changeLoginState: this.handleChangeLoginState }} />
            : <AuthStack screenProps={{ changeLoginState: this.handleChangeLoginState }}/>}
        </Provider>
      </ApolloProvider>
    )
  }
}
// import React from 'react'
// import { Text } from 'react-native'
// import { Container, Content } from 'native-base'
// import { Query } from 'react-apollo'

// export default class App extends React.Component {
//   static navigationOptions = (
//     (props) => {
//       return {
//         headerTitle: 'APP',
//         headerTitleStyle: {
//           marginLeft: 110
//         }
//       }
//     }
//   )
//   render () {
//     return (
//       <Container>
//         <Content>
//           <Text>你好世界</Text>
//         </Content>
//       </Container>
//     )
//   }
// }
