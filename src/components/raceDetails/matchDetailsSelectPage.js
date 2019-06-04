import React from 'react'
import { Text, Image, TouchableOpacity } from 'react-native'
import { Container, Content, View } from 'native-base'
import { Query } from 'react-apollo'
import Styles from './style'
import { ALL_FOOTBALL_TEAM, ALL_TEAM_PLAYER } from '../../gql/queries'

export default class matchDetailsSelectPage extends React.Component {
  static navigationOptions = (
    (props) => {
      return {
        headerTitle: '选择',
        headerTitleStyle: {
          marginLeft: 135
        }
      }
    }
  )

  constructor (props) {
    super(props)
    this.state = {
      selectContent: ''
    }
    // this.selectContent = ''
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount = () => {
    const { navigation } = this.props
    const selectContent = navigation.getParam('selectContent', '')
    console.log(selectContent)
    if (selectContent === 'team') {
      this.setState({
        selectContent: 'team'
      })
    } else {
      this.setState({
        selectContent: 'player'
      })
    }
  }

  // 获取选择项，并传递到父页面
  getTeamItem = (name, numberId) => {
    const { navigation } = this.props
    const getSelectItem = navigation.getParam('getSelectItem', '')
    getSelectItem(name, numberId)
    navigation.goBack()
  }

  //  获取球员选择项，传递到父页面
  getPlayerItem = (playerName, personId) => {
    const { navigation } = this.props
    const getSelectPlayer = navigation.getParam('getSelectPlayer', '')
    const selectContent = navigation.getParam('selectContent', '')
    if (selectContent === 'shooterPlayer') {
      getSelectPlayer('shooterPlayer', playerName, personId)
      navigation.goBack()
    } else {
      getSelectPlayer('assistPlayer', playerName, personId)
      navigation.goBack()
    }
  }

  render () {
    const { navigation } = this.props
    const teamAName = navigation.getParam('teamAName', '')
    const teamBName = navigation.getParam('teamBName', '')
    const teamId = navigation.getParam('teamId', '')
    return (
      <View>
        {
          this.state.selectContent === 'team' && <View style={Styles.contentStyle}>
            <Query query={ALL_FOOTBALL_TEAM}
              variables={ { condition: { teamName: teamAName } }}>
              {({ data, error, loading }) => {
                if (loading) return <Text>Loading...</Text>
                if (error) return <Text>`Error! ${error.message}`</Text>
                return (
                  <View>
                    {
                      data.allFootballTeams.nodes.map((p, i) => {
                        return <View key={i} style={[Styles.teamBox, Styles.rowFlex]}>
                          <Image style={Styles.teamLogoSize} source={ { uri: p.imageByTeamLogo.url }}/>
                          <TouchableOpacity onPress={() => this.getTeamItem(p.teamName, p.id)}>
                            <Text style={Styles.teamName}>{p.teamName}</Text>
                          </TouchableOpacity>
                        </View>
                      })
                    }
                  </View>
                )
              }}
            </Query>
            <Query query={ALL_FOOTBALL_TEAM} variables={ { condition: { teamName: teamBName } }}>
              {({ data, error, loading }) => {
                if (loading) return <Text>Loading...</Text>
                if (error) return <Text>`Error! ${error.message}`</Text>
                return (
                  <View>
                    {
                      data.allFootballTeams.nodes.map((p, i) => {
                        return <View key={i} style={[Styles.teamBox, Styles.rowFlex]}>
                          <Image style={Styles.teamLogoSize} source={ { uri: p.imageByTeamLogo.url }}/>
                          <TouchableOpacity onPress={() => this.getTeamItem(p.teamName, p.id)}>
                            <Text style={Styles.teamName}>{p.teamName}</Text>
                          </TouchableOpacity>
                        </View>
                      })
                    }
                  </View>
                )
              }}
            </Query>
          </View>
        }
        {
          this.state.selectContent === 'player' && <Query query={ALL_TEAM_PLAYER} variables={{ condition: { teamId: teamId, checked: true } }}>
            {({ data, error, loading }) => {
              if (loading) return <Text>Loading...</Text>
              // if (error) return <Text>`Error! ${error.message}`</Text>
              if (error) return <Text>请先选择球队再选择球员</Text>
              return (
                <View style={Styles.contentStyle}>
                  {/* 球队成员 */}
                  <View>
                    <View style={Styles.selectPlayerTextBox}>
                      <Text style={Styles.selectText}>球队成员</Text>
                    </View>
                    {/* 展示球队的所有球员 */}
                    <View style={Styles.allPlayerContainer}>
                      {
                        data.allPersonTeams.nodes.map((p, i) => {
                          return (
                            <TouchableOpacity onPress={ () => { this.getPlayerItem(p.personByPersonId.playerName, p.personByPersonId.id) }}
                              key={i} style={[Styles.playerBox, Styles.marginTop15]}>
                              <Image style={Styles.playerHeaderImg} source={{ uri: p.personByPersonId.imageByPlayerImg.url }}/>
                              <Text style={Styles.playerNameText}>{p.personByPersonId.playerName}</Text>
                            </TouchableOpacity>
                          )
                        })
                      }
                    </View>
                  </View>
                </View>
              )
            }}
          </Query>

        }

      </View>
    )
  }
}
