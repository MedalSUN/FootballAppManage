import React from 'react'
import { Text, Image } from 'react-native'
import { View, Input, Form, Item, Button, Root, Toast } from 'native-base'
import { Query } from 'react-apollo'
import Styles from './style'
import { client } from '../../shared_client'
import { ADD_MATCH_GOALS } from '../../gql/mutation'

export default class ScoreForm extends React.Component {
    static navigationOptions = (
        (props) => {
          return {
            headerTitle: '比分录入',
            headerTitleStyle: {
              marginLeft: 120
            }
          }
        }
      )

    constructor (props) {
      super(props)
      this.state = {
        matchId: '',
        teamANumber: '',
        teamBNumber: ''
      }
    }

    // 输入框变化时，调用方法
    handleInputChange = (field, value) => {
      const newState = {
        ...this.state,
        [field]: value
      }
      this.setState(newState)
    }

    // Toast 提示信息
  showToast = (message) => {
    let type = ''
    if (message === '比分增加成功') {
      type = 'success'
    } else {
      type = 'warning'
    }

    Toast.show({
      text: message,
      textStyle: { textAlign: 'center' },
      position: 'top',
      type: type,
      duration: 1000
    })
  }

  // 点击确定之后提交
  handleSubmit = () => {
    const { navigation } = this.props
    const matchId = navigation.getParam('matchId', '')
    console.log(matchId)
    client.mutate({
      mutation: ADD_MATCH_GOALS,
      variables: {
        'input': {
          '_matchId': matchId,
          '_goalA': parseInt(this.state.teamANumber),
          '_goalB': parseInt(this.state.teamBNumber)
        }
      }
    }).then((reponse) => {
      console.log(reponse)
      this.showToast(reponse.data.changeMatchGoal.string)
    })
  }

  render () {
    const { navigation } = this.props
    const teamAName = navigation.getParam('teamAName', '')
    const teamBName = navigation.getParam('teamBName', '')
    const teamALogo = navigation.getParam('teamALogo', '')
    const teamBLogo = navigation.getParam('teamBLogo', '')
    return (
      <Root>
        <View style={[Styles.columnFlex, Styles.contentStyle]}>
          <View style={Styles.matchBox}>
            <View style={Styles.rowFlex}>
              <Image style={Styles.imgSize} source={{ uri: teamALogo }}/>
              <Text style={Styles.teamName}>{teamAName}</Text>
            </View>
            <Text>VS</Text>
            <View style={Styles.rowFlex}>
              <Text style={Styles.teamName}>{teamBName}</Text>
              <Image style={Styles.imgSize} source={{ uri: teamBLogo }}/>
            </View>
          </View>
          <Form style={Styles.loginForm}>
            <Item>
              <Input
                fontSize='1'
                placeholder="主队进球数"
                onChangeText={value => this.handleInputChange('teamANumber', value)}
                autoCapitalize="none"
                autoCorrect={false}
                allowFontScaling
                style={Styles.loginFormInput}
              />
            </Item>
            <Item>
              <Input
                fontSize='1'
                placeholder="客队进球数"
                onChangeText={value => this.handleInputChange('teamBNumber', value)}
                autoCapitalize="none"
                autoCorrect={false}
                allowFontScaling
                style={Styles.loginFormInput}
              />
            </Item>
          </Form>
          <View style={Styles.loginButtonView}>
            <Button onPress={this.handleSubmit} block style={Styles.loginButton} >
              <Text style={Styles.loginButtonText} allowFontScaling>确定</Text>
            </Button>
          </View>
        </View>
      </Root>
    )
  }
}
