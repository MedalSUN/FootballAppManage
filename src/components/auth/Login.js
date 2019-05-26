
import React from 'react'
import { Container, Button, Content, Form, Item, Input, Text, View } from 'native-base' // 2.3.3
import { Image } from 'react-native'
import { graphql } from 'react-apollo' // 2.0.0
import gql from 'graphql-tag' // 2.5.0
import { connect } from 'react-redux'
import * as actions from '../../actions'
// import BaseStyles from '../../styles'
import Styles from './style'
import PasswordInput from './components/PasswordInput'

class Login extends React.Component {
  static navigationOptions = (
    (props) => {
      return {
        headerTitle: '管理员登录',
        headerTitleStyle: {
          marginLeft: 160
        }
      }
    }
  )

  constructor (props) {
    super(props)

    this.state = {
      accountNumber: '',
      password: ''
    }
  }

  handleInputChange = (field, value) => {
    const newState = {
      ...this.state,
      [field]: value
    }
    this.setState(newState)
  }

  handleSubmit = () => {
    console.log('in handle submit')
    this.setState({ ...this.state, token: 'in handle submit' })
    // const { email, password } = this.state
    const accountNumber = '17616023616'
    const password = '123'
    // if (accountNumber.length === 0) {
    //   return this.setState({ emailError: true })
    // }
    // this.setState({ emailError: false })

    // if (password.length === 0) {
    //   return this.setState({ passwordError: true })
    // }
    // this.setState({ passwordError: false })
    console.log('before adminAuthenticate accountNumber', accountNumber)
    console.log('before adminAuthenticate pw', password)
    console.log('before adminAuthenticate', this.props)
    this.props
      .adminAuthenticate(accountNumber, password)
      .then(({ data }) => {
        console.log('data', data.adminAuthenticate)
        console.log('this.props', this.props)
        this.props.signinUser(data.adminAuthenticate.authReturnType.jwt, data.adminAuthenticate.authReturnType.id)
        this.setState({ ...this.state, token: data.adminAuthenticate.authReturnType.jwt })
        return this.props.screenProps.changeLoginState(true, data.adminAuthenticate.authReturnType.jwt)
      })
      .catch(e => {
        console.log('error', e)
        // if (/email/i.test(e.message)) {
        //   this.setState({ emailError: true })
        // }
        // if (/password/i.test(e.message)) {
        //   this.setState({ passwordError: true })
        // }
      })
  };

  render () {
    return (

      <Container>

        <Content>
          {/* <Text>token:{this.state.token}</Text> */}

          <Image style={Styles.topImage} source={require('../../../img/logo.png')} resizeMode="contain"/>
          <Form style={Styles.loginForm}>
            <Item>
              <Input
                fontSize='1'
                placeholder="请输入管理员账号"
                onChangeText={value => this.handleInputChange('accountNumber', value)}
                autoCapitalize="none"
                autoCorrect={false}
                allowFontScaling
                style={Styles.loginFormInput}
              />

            </Item>

            <PasswordInput
              itemStyle={Styles.inputError}
              placeholder="请输入密码"
              handleInputChange={this.handleInputChange}
              label="Password"
              name="password"
              fontSize={Styles.fontSize15}
            />
          </Form>

          <View style={Styles.loginButtonView}>
            <Button onPress={this.handleSubmit} block style={Styles.loginButton}>
              <Text style={Styles.loginButtonText} allowFontScaling>登录</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}
function mapStateToProps (state) {
  return { errorMessage: 'error!' }
}

// eslint-disable-next-line no-class-assign
Login = graphql(
  gql`
    mutation adminAuthenticate($accountNumber:String!,$password:String!) {
      adminAuthenticate(input: {
        accountNumber: $accountNumber,
        password: $password}) {
        clientMutationId
        authReturnType {
          jwt,
          id
        }
        }      
    }
  `,
  {
    props: ({ mutate }) => ({
      adminAuthenticate: (accountNumber, password) => mutate({ variables: { accountNumber, password } })
    })
  }
)(Login)

export default connect(mapStateToProps, actions)(Login)
