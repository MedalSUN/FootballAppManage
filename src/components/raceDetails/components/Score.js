import React from 'react'
import { Text, Image, TouchableOpacity } from 'react-native'
import { Container, Content, View } from 'native-base'
import { Query } from 'react-apollo'
import { client } from '../../../shared_client'
import { ALL_MATCH } from '../../../gql/queries'
import Styles from './style'

export default class Score extends React.Component {
  render () {
    const { navigation } = this.props
    return <Query query={ALL_MATCH} fetchPolicy='network-only' variables={{ orderBy: 'ORDER_NUMBER_ASC' }}>
      {({ data, error, loading }) => {
        if (loading) return <Text>Loading...</Text>
        if (error) return <Text>`Error! ${error.message}`</Text>
        return (
          <View style={[Styles.contentStyle, Styles.contentBox]}>
            {
              data.allMatchSchedules.nodes.map((p, i) => {
                console.log(p.id)
                return <View key={i}>
                  {
                    !p.matchGoalById && <TouchableOpacity style={Styles.matchBox} onPress={() => navigation.navigate('ScoreForm', {
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
        )
      }}
    </Query>
  }
}
