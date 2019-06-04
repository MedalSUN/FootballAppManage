import React from 'react'
import { Text, ScrollView, RefreshControl } from 'react-native'
import { Container, Content, View, Root } from 'native-base'
import { Query } from 'react-apollo'
import { ALL_PERSON_TEAMS } from '../../gql/queries'
import PlayerItem from './components/PlayerItem'
import Styles from './style'

export default class ApprovalPage extends React.Component {
  static navigationOptions = (
    (props) => {
      return {
        headerTitle: '审批管理',
        headerTitleStyle: {
          marginLeft: 165
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
    return <Query query={ALL_PERSON_TEAMS} fetchPolicy='cache-and-network' variables={{ condition: { checked: false } }}>
      {({ data, error, loading, refetch }) => {
        if (loading) return <Text>Loading...</Text>
        if (error) return <Text>`Error! ${error.message}`</Text>
        console.log(data)
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
                  {
                    this.state.isRefetch === true && refetch() && this.finishedRefresh()
                  }
                  {/* 头部标题 */}
                  <View style={Styles.rowFlex}>
                    <View style={Styles.topBox}>
                      <Text style={Styles.topText}>用户</Text>
                    </View>
                    <View style={Styles.topBox}>
                      <Text style={Styles.topText}>申请球队</Text>
                    </View>
                    <View style={Styles.topBox}>
                      <Text style={Styles.topText}>审批</Text>
                    </View>
                  </View>
                  {
                    data && data.allPersonTeams.nodes.map((p, i) => {
                      return <PlayerItem key={i} userLogo={p.personByPersonId.imageByPlayerImg.url} id={p.personByPersonId.id}
                        playerName={p.personByPersonId.playerName} teamLogo={p.footballTeamByTeamId.imageByTeamLogo.url}
                        teamName={p.footballTeamByTeamId.teamName}/>
                    })
                  }
                </Content>
              </Container>
            </ScrollView>
          </Root>
        )
      }}
    </Query>
  }
}
