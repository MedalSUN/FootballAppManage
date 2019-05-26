import React from 'react'
import { Text } from 'react-native'
import { Container, Content } from 'native-base'
import { Query } from 'react-apollo'

export default class selectPage extends React.Component {
  static navigationOptions = (
    (props) => {
      return {
        headerTitle: '选择',
        headerTitleStyle: {
          marginLeft: 110
        }
      }
    }
  )
  render () {
    const { navigation } = this.props
    const selectContent = navigation.getParam('selectContent', '')
    // return <Query query={   } variables={{ orderBy: 'ORDER_NUMBER_ASC' }}>
    //   {({ data, error, loading }) => {
    //     if (loading) return <Text>Loading...</Text>
    //     if (error) return <Text>`Error! ${error.message}`</Text>
    //     return (
    //       <Container>
    //         <Content>

    //         </Content>
    //       </Container>
    //     )
    //   }}
    // </Query>
    return <Content>
      <Text>选择页面</Text>
    </Content>
  }
}
