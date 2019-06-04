/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  // =========== ScoreForm的样式
  contentStyle: {
    backgroundColor: '#F2F2F2',
    height: 600
  },
  matchBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: 380,
    marginTop: 20
  },
  imgSize: {
    width: 30,
    height: 30,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15
  },
  rowFlex: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  columnFlex: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  teamName: {
    fontSize: 18,
    color: 'rgb(235,172,0)',
    fontFamily: 'Helvetica Neue'
  },
  loginForm: {
    marginTop: 40,
    marginLeft: 25,
    marginRight: 40,
    width: 300,
    height: 200,
    justifyContent: 'center'
  },
  loginButtonView: {
    width: 100,
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
  rowStyle1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  teamSelectBox: {
    marginTop: 20
  },
  buttonBox: {
    width: 100,
    height: 30,
    marginRight: 20,
    backgroundColor: 'rgb(250,122,21)',
    borderWidth: 1,
    borderColor: 'rgb(250,122,21)',
    borderRadius: 20
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  teamSelectButton: {
    fontSize: 13,
    fontFamily: 'Helvetica Neue',
    color: '#808080'
  },
  // matchDetailsSelectPage 页面
  teamLogoSize: {
    width: 30,
    height: 30,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    marginRight: 20
  },
  teamBox: {
    marginTop: 20
  },
  selectPlayerTextBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  selectText: {
    fontSize: 30,
    fontFamily: 'Helvetica Neue',
    color: '#FFCC00'
  },
  playerNameText: {
    fontSize: 18,
    fontFamily: 'Helvetica Neue',
    color: '#FF9900'
  },
  allPlayerContainer: {
    paddingTop: 30
  },
  playerHeaderImg: {
    width: 30,
    height: 30,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    marginRight: 20
  },
  playerBox: {
    marginLeft: 150,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})
