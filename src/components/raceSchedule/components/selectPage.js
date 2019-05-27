import React from 'react'
import { Text, Image, TouchableOpacity } from 'react-native'
import { Container, Content, View } from 'native-base'
import { Query } from 'react-apollo'
import { ALL_FOOTBALL_COURT, ALL_FOOTBALL_TEAM } from '../../../gql/queries'
import Styles from './style'

export default class selectPage extends React.Component {
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
    this.selectContent = ''
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount = () => {
    const { navigation } = this.props
    const selectContent = navigation.getParam('selectContent', '')
    console.log(selectContent)
    if (selectContent === 'matchLocation') {
      this.selectContent = ALL_FOOTBALL_COURT
    } else {
      this.selectContent = ALL_FOOTBALL_TEAM
    }
  }

  // 获取选择项，并传递到父页面
  getItem = (area, name, numberId) => {
    const { navigation } = this.props
    const getSelectItem = navigation.getParam('getSelectItem', '')
    getSelectItem(area, name, numberId)
    navigation.goBack()
  }

  render () {
    const { navigation } = this.props
    const selectContent = navigation.getParam('selectContent', '')
    return <Query query={this.selectContent}>
      {({ data, error, loading }) => {
        if (loading) return <Text>Loading...</Text>
        if (error) return <Text>`Error! ${error.message}`</Text>
        return (
          <Container>
            <Content style={Styles.contentStyle}>
              {
                selectContent === 'teamA' && data && data.allFootballTeams.nodes.map((p, i) => {
                  return <View key={i} style={[Styles.teamBox, Styles.rowFlex]}>
                    <Image style={Styles.teamLogoSize} source={ { uri: p.imageByTeamLogo.url }}/>
                    <TouchableOpacity onPress={() => this.getItem('teamA', p.teamName, p.id)}>
                      <Text style={Styles.teamName}>{p.teamName}</Text>
                    </TouchableOpacity>
                  </View>
                })
              }
              {
                selectContent === 'teamB' && data && data.allFootballTeams.nodes.map((p, i) => {
                  return <View key={i} style={[Styles.teamBox, Styles.rowFlex]}>
                    <Image style={Styles.teamLogoSize} source={ { uri: p.imageByTeamLogo.url }}/>
                    <TouchableOpacity onPress={() => this.getItem('teamB', p.teamName, p.id)}>
                      <Text style={Styles.teamName}>{p.teamName}</Text>
                    </TouchableOpacity>
                  </View>
                })
              }
              {
                selectContent === 'matchLocation' && data && data.allFootballCourts.nodes.map((p, i) => {
                  return <View key={i} style={[Styles.courtBox, Styles.rowFlex]}>
                    <TouchableOpacity onPress={() => this.getItem('matchLocation', p.courtName, p.id)}>
                      <Text style={Styles.courtName}>{p.courtName}</Text>
                    </TouchableOpacity>
                  </View>
                })
              }
            </Content>
          </Container>
        )
      }}
    </Query>
  }
}
