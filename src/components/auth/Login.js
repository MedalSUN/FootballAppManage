
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
        headerTitle: '登录',
        headerTitleStyle: {
          marginLeft: 190
        }
      }
    }
  )

  constructor (props) {
    super(props)

    this.state = {
      email: '',
      emailError: false,
      password: '',
      passwordError: false
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
    const email = 'test@test.test'
    const password = '123'
    if (email.length === 0) {
      return this.setState({ emailError: true })
    }
    this.setState({ emailError: false })

    if (password.length === 0) {
      return this.setState({ passwordError: true })
    }
    this.setState({ passwordError: false })
    console.log('before authenticate email', email)
    console.log('before authenticate pw', password)
    console.log('before authenticate', this.props)
    this.props
      .authenticate(email, password)
      .then(({ data }) => {
        console.log('data', data.authenticate)
        console.log('this.props', this.props)
        this.props.signinUser(data.authenticate.authReturnType.jwt, data.authenticate.authReturnType.id)
        this.setState({ ...this.state, token: data.authenticate.authReturnType.jwt })
        return this.props.screenProps.changeLoginState(true, data.authenticate.authReturnType.jwt)
      })
      .catch(e => {
        console.log('error', e)
        if (/email/i.test(e.message)) {
          this.setState({ emailError: true })
        }
        if (/password/i.test(e.message)) {
          this.setState({ passwordError: true })
        }
      })
  };

  render () {
    const { emailError, passwordError } = this.state
    const { navigation } = this.props

    return (

      <Container>

        <Content>
          {/* <Text>token:{this.state.token}</Text> */}

          <Image style={Styles.topImage} source={require('../../../img/logo.png')} resizeMode="contain"/>
          <Form style={Styles.loginForm}>
            <Item error={emailError} >
              <Input
                fontSize='1'
                placeholder="请输入邮箱"
                onChangeText={value => this.handleInputChange('email', value)}
                keyboardType="email-address"
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
              passwordError={passwordError}
              label="Password"
              name="password"
              fontSize={Styles.fontSize15}
            />
          </Form>

          <View style={Styles.loginButtonView}>
            <Button onPress={this.handleSubmit} block style={Styles.loginButton} >
              <Text style={Styles.loginButtonText} allowFontScaling>登录</Text>
            </Button>
          </View>
          <View style={Styles.signupView} >
            <Button block transparent style={Styles.noAccountButton} disabled>
              <Text style={Styles.greyText} allowFontScaling>没有账号？</Text>
            </Button>
            <Button transparent onPress={() => navigation.navigate('Register')} style={Styles.goSignupButton} >
              <Text style={Styles.whiteText } allowFontScaling>去注册</Text>
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

// const mapStateToProps = state => ({
//   selectedRepositoryIds: state.selectedRepositoryIds,
// });

// export default graphql(
// eslint-disable-next-line no-class-assign
Login = graphql(
  gql`
    mutation authenticate($email:String!,$password:String!) {
      authenticate(input: {
        email: $email,
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
      authenticate: (email, password) => mutate({ variables: { email, password } })
    })
  }
)(Login)

export default connect(mapStateToProps, actions)(Login)
