import React from 'react'
import { Text } from 'react-native'
import { Container, Content, View } from 'native-base'
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
  render () {
    return <Query query={ALL_PERSON_TEAMS} variables={{ condition: { checked: false } }}>
      {({ data, error, loading }) => {
        if (loading) return <Text>Loading...</Text>
        if (error) return <Text>`Error! ${error.message}`</Text>
        console.log(data)
        return (
          <View>
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
          </View>
        )
      }}
    </Query>
  }
}
