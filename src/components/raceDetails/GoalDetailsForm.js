import React from 'react'
import { Text, Image, TouchableOpacity } from 'react-native'
import { View, Input, Form, Item, Button, Root, Toast } from 'native-base'
import { Query } from 'react-apollo'
import Styles from './style'
import { client } from '../../shared_client'
import { ADD_MATCH_GOALS, FINISHED_MATCH_GOAL } from '../../gql/mutation'
import { MATCH_GOAL } from '../../gql/queries'

export default class GoalDetailsForm extends React.Component {
    static navigationOptions = (
        (props) => {
          return {
            headerTitle: '比赛详情录入',
            headerTitleStyle: {
              marginLeft: 90
            }
          }
        }
      )

    constructor (props) {
      super(props)
      this.state = {
        assistName: '',
        assistId: '',
        shooterName: '',
        shooterId: '',
        teamName: '',
        goalTime: '',
        teamId: '',
        matchId: '',
        teamAGoals: 0,
        teamBGoals: 0
      }
    }

    componentDidMount () {
      this.getMatchScore()
    }

    // 创建函数：用于获取当前比分
    getMatchScore = () => {
      const { navigation } = this.props
      const matchId = navigation.getParam('matchId', '')
      console.log(matchId)
      client.query({
        query: MATCH_GOAL,
        variables: {
          'condition': {
            'id': matchId
          }
        }
      }).then((reponse) => {
        console.log(reponse)
        let res = reponse.data.allMatchGoals
        console.log(res.nodes)
        if (res.nodes) {
          this.setState({
            teamAGoals: res.nodes.goalA,
            teamBGoals: res.nodes.goalB
          })
        } else {
          this.setState({
            teamAGoals: 0,
            teamBGoals: 0
          })
        }
      })
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
    client.mutate({
      mutation: ADD_MATCH_GOALS,
      variables: {
        'input': {
          '_teamId': this.state.teamId,
          '_matchId': matchId,
          '_shooterId': this.state.shooterId,
          '_goalTime': this.state.goalTime,
          '_assistId': this.state.assistId
        }
      }
    }).then((reponse) => {
      console.log(reponse)
      this.showToast(reponse.data.changeMatchGoalDetails.string)
    })
  }

  // 点击完成比赛数据录入后，将数据表的finished字段改为true
  changeFinished = () => {
    const { navigation } = this.props
    const matchId = navigation.getParam('matchId', '')
    client.mutate({
      mutation: FINISHED_MATCH_GOAL,
      variables: {
        'input': {
          '_matchId': matchId
        }
      }
    }).then((reponse) => {
      console.log(reponse)
      // this.showToast(reponse.data.changeMatchGoalDetails.string)
      navigation.goBack()
    })
  }

  // 方法：用于获取选择的球队
  getSelectItem = (name, numberId) => {
    console.log(name)
    console.log(numberId)
    this.setState({
      teamName: name,
      teamId: numberId
    })
  }

  // 方法：用于获取选择的球员
  getSelectPlayer = (area, name, playerId) => {
    if (area === 'shooterPlayer') {
      this.setState({
        shooterName: name,
        shooterId: playerId
      })
    } else {
      this.setState({
        assistName: name,
        assistId: playerId
      })
    }
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
          {/* 显示当前比分 */}
          <View style={Styles.rowFlex}>
            <View style={Styles.rowFlex}>
              <Text style={Styles.teamName}>{this.state.teamAGoals}</Text>
            </View>
            <Text>  ：</Text>
            <View style={Styles.rowFlex}>
              <Text style={Styles.teamName}>{this.state.teamBGoals}</Text>
            </View>
          </View>

          <Form style={Styles.loginForm}>
            <View style={[Styles.rowStyle1, Styles.teamSelectBox]}>
              <TouchableOpacity onPress={() => navigation.navigate('matchDetailsSelectPage',
                { getSelectItem: this.getSelectItem, teamAName: teamAName, selectContent: 'team', teamBName: teamBName })}>
                <View style={[Styles.buttonBox, Styles.rowStyle]}>
                  <Text style={Styles.teamSelectButton}>点击选择球队</Text>
                </View>
              </TouchableOpacity>
              <View>
                <Text>选择的球队为：{this.state.teamName}</Text>
              </View>
            </View>
            <View style={[Styles.rowStyle1, Styles.teamSelectBox]}>
              <TouchableOpacity onPress={() => navigation.navigate('matchDetailsSelectPage',
                { getSelectPlayer: this.getSelectPlayer, selectContent: 'shooterPlayer', teamId: this.state.teamId })}>
                <View style={[Styles.buttonBox, Styles.rowStyle]}>
                  <Text style={Styles.teamSelectButton}>进球球员</Text>
                </View>
              </TouchableOpacity>
              <View>
                <Text>选择的进球球员为：{this.state.shooterName}</Text>
              </View>
            </View>
            <View style={[Styles.rowStyle1, Styles.teamSelectBox]}>
              <TouchableOpacity onPress={() => navigation.navigate('matchDetailsSelectPage',
                { getSelectPlayer: this.getSelectPlayer, selectContent: 'assistPlayer', teamId: this.state.teamId })}>
                <View style={[Styles.buttonBox, Styles.rowStyle]}>
                  <Text style={Styles.teamSelectButton}>助攻球员</Text>
                </View>
              </TouchableOpacity>
              <View>
                <Text>选择的助攻球员为：{this.state.assistName}</Text>
              </View>
            </View>
            <Item>
              <Input
                fontSize='1'
                placeholder="进球时间"
                onChangeText={value => this.handleInputChange('goalTime', value)}
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
          <View style={Styles.loginButtonView}>
            <Button onPress={this.changeFinished} block style={Styles.loginButton} >
              <Text style={Styles.loginButtonText} allowFontScaling>完成录入</Text>
            </Button>
          </View>
        </View>
      </Root>
    )
  }
}
