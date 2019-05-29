/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  contentStyle: {
    backgroundColor: '#F2F2F2'
  },
  contentBox: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 600
  },
  rowFlex: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  matchBox: {
    width: 360,
    height: 100,
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFFFFF'
  },
  matchBoxTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  topFont: {
    fontSize: 15,
    color: 'rgb(235,172,0)',
    fontFamily: 'Helvetica Neue'
  },
  teamName: {
    fontSize: 18,
    color: 'rgb(235,172,0)',
    fontFamily: 'Helvetica Neue'
  },
  matchBoxBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  imgSize: {
    width: 30,
    height: 30,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15
  }

})
