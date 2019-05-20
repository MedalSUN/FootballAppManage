/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  topImage: {
    width: 380,
    height: 140,
    marginTop: 20,
    marginLeft: 20
  },
  loginForm: {
    marginTop: 40,
    marginLeft: 25,
    marginRight: 40,
    justifyContent: 'center'
  },
  inputError: {
    marginTop: 36
  },
  fontSize15: {
    fontSize: 15
  },
  loginButtonView: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 30
  },
  loginButton: {
    height: 50,
    backgroundColor: 'rgb(250,122,21)'
  },
  loginButtonText: {
    color: 'rgb(255,255,255)',
    fontSize: 20
  },
  signupView: {
    marginTop: 70,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  noAccountButton: {
    height: 30
  },
  greyText: {
    color: 'rgb(51,51,51)',
    fontSize: 15
  },
  goSignupButton: {
    height: 30,
    backgroundColor: 'rgb(250,122,21)'
  },
  whiteText: {
    color: 'rgb(255,255,255)',
    fontSize: 15
  },
  // ========注册页面样式
  contentStyle: {
    backgroundColor: '#F2F2F2'
  },
  registerContent: {
    marginTop: 20,
    width: '90%'
    // backgroundColor: 'yellow'
  },
  columnFlex: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  registerImg: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 100
  },
  registerButton: {
    marginTop: 50,
    marginLeft: 30,
    width: 150,
    height: 40,
    borderWidth: 1,
    borderColor: '#FF9900',
    borderRadius: 20,
    backgroundColor: '#FF9900',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  completeText: {
    marginLeft: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgb(51,51,51)',
    fontSize: 15
  }
})
