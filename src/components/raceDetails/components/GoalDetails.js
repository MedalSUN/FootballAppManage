import React from 'react'
import { Text, Image, TouchableOpacity, RefreshControl, ScrollView } from 'react-native'
import { Container, Content, View, Toast, Root } from 'native-base'
import { Query } from 'react-apollo'
import { client } from '../../../shared_client'
import { ALL_MATCH } from '../../../gql/queries'
import Styles from './style'

// 比赛管理主页面
export default class GoalDetails extends React.Component {
  static navigationOptions = (
    (props) => {
      return {
        headerTitle: '比赛详情管理',
        headerTitleStyle: {
          marginLeft: 150
        }
      }
    }
  )
  constructor (props) {
    super(props)
    this.state = {
      refreshing: false,
      isRefetch: false
    }
  }

  testRefresh = () => {
    // 更改state，让其执行refetch
    this.setState({
      refreshing: true,
      isRefetch: true
    })
  }

  finishedRefresh = () => {
    this.setState({ refreshing: false, isRefetch: false })
  }

  render () {
    const { navigation } = this.props
    return <Query query={ALL_MATCH} fetchPolicy='cache-and-network' variables={{ orderBy: 'ORDER_NUMBER_ASC' }}>
      {({ data, error, loading, refetch }) => {
        if (loading) return <Text>Loading...</Text>
        if (error) return <Text>`Error! ${error.message}`</Text>
        return (
          <Root>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.testRefresh}
                  title={'正在加载中'}
                />
              }
            >
              <Container>
                <Content>
                  <View style={[Styles.contentStyle, Styles.contentBox]}>
                    {
                      data.allMatchSchedules.nodes.map((p, i) => {
                        return <View key={i}>
                          {
                            this.state.isRefetch === true && refetch() && this.finishedRefresh()
                          }
                          {/* 当没有任何进球数据时 */}
                          {
                            !p.matchGoalById && <TouchableOpacity style={Styles.matchBox} onPress={() => navigation.navigate('GoalDetailsForm', {
                              teamAId: p.footballTeamByTeamA.id,
                              teamBId: p.footballTeamByTeamB.id,
                              teamAName: p.footballTeamByTeamA.teamName,
                              teamBName: p.footballTeamByTeamB.teamName,
                              matchId: p.id,
                              teamALogo: p.footballTeamByTeamA.imageByTeamLogo.url,
                              teamBLogo: p.footballTeamByTeamB.imageByTeamLogo.url
                            })}>
                              {/* 日期场序轮数 */}
                              <View style={[Styles.matchBoxTop]}>
                                <View style={Styles.rowFlex}>
                                  <Text>日期：</Text>
                                  <Text style={Styles.topFont}>{p.matchDate}</Text>
                                </View>
                                <View style={Styles.rowFlex}>
                                  <Text>轮数：</Text>
                                  <Text style={Styles.topFont}>{p.wheelNumber}</Text>
                                </View>
                                <View style={Styles.rowFlex}>
                                  <Text>场序:</Text>
                                  <Text style={Styles.topFont}>{p.orderNumber}</Text>
                                </View>
                              </View>
                              {/* 主客队 */}
                              <View style={Styles.matchBoxBottom}>
                                <View style={Styles.rowFlex}>
                                  <Image style={Styles.imgSize} source={{ uri: p.footballTeamByTeamA.imageByTeamLogo.url }}/>
                                  <Text style={Styles.teamName}>{p.footballTeamByTeamA.teamName}</Text>
                                </View>
                                <Text>VS</Text>
                                <View style={Styles.rowFlex}>
                                  <Text style={Styles.teamName}>{p.footballTeamByTeamB.teamName}</Text>
                                  <Image style={Styles.imgSize} source={{ uri: p.footballTeamByTeamB.imageByTeamLogo.url }}/>
                                </View>
                              </View>
                            </TouchableOpacity>
                          }
                          {/* 存在进球数据，但是没有完成比赛数据录入的 */}
                          {
                            p.matchGoalById && p.matchGoalById.finished === false && <TouchableOpacity style={Styles.matchBox} onPress={() => navigation.navigate('GoalDetailsForm', {
                              teamAId: p.footballTeamByTeamA.id,
                              teamBId: p.footballTeamByTeamB.id,
                              teamAName: p.footballTeamByTeamA.teamName,
                              teamBName: p.footballTeamByTeamB.teamName,
                              matchId: p.id,
                              teamALogo: p.footballTeamByTeamA.imageByTeamLogo.url,
                              teamBLogo: p.footballTeamByTeamB.imageByTeamLogo.url
                            })}>
                              {/* 日期场序轮数 */}
                              <View style={[Styles.matchBoxTop]}>
                                <View style={Styles.rowFlex}>
                                  <Text>日期：</Text>
                                  <Text style={Styles.topFont}>{p.matchDate}</Text>
                                </View>
                                <View style={Styles.rowFlex}>
                                  <Text>轮数：</Text>
                                  <Text style={Styles.topFont}>{p.wheelNumber}</Text>
                                </View>
                                <View style={Styles.rowFlex}>
                                  <Text>场序:</Text>
                                  <Text style={Styles.topFont}>{p.orderNumber}</Text>
                                </View>
                              </View>
                              {/* 主客队 */}
                              <View style={Styles.matchBoxBottom}>
                                <View style={Styles.rowFlex}>
                                  <Image style={Styles.imgSize} source={{ uri: p.footballTeamByTeamA.imageByTeamLogo.url }}/>
                                  <Text style={Styles.teamName}>{p.footballTeamByTeamA.teamName}</Text>
                                </View>
                                <Text>VS</Text>
                                <View style={Styles.rowFlex}>
                                  <Text style={Styles.teamName}>{p.footballTeamByTeamB.teamName}</Text>
                                  <Image style={Styles.imgSize} source={{ uri: p.footballTeamByTeamB.imageByTeamLogo.url }}/>
                                </View>
                              </View>
                            </TouchableOpacity>
                          }
                        </View>
                      })
                    }
                  </View>
                </Content>
              </Container>
            </ScrollView>
          </Root>
        )
      }}
    </Query>
  }
}
