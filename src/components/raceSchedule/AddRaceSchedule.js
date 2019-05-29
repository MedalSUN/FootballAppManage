import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Container, Content, Input, Form, Item, View, Button, Root, Toast } from 'native-base'
import { Query } from 'react-apollo'
import { ADD_MATCH_SCHEDULE } from '../../gql/mutation'
import { client } from '../../shared_client'
import Styles from './style'

export default class AddRaceSchedule extends React.Component {
  static navigationOptions = (
    (props) => {
      return {
        headerTitle: '赛程管理',
        headerTitleStyle: {
          marginLeft: 170
        }
      }
    }
  )
  constructor (props) {
    super(props)
    this.state = {
      teamAName: '',
      teamAId: '',
      teamBName: '',
      teamBId: '',
      courtName: '',
      courtId: '',
      orderNumber: 0,
      wheelNumber: 0,
      matchDate: ''
    }
  }

  // 方法，用于获取选择页的选择项的名称和uuid编号
  getSelectItem = (area, name, numberId) => {
    console.log(name)
    console.log(area)
    console.log(numberId)
    if (area === 'teamA') {
      this.setState({
        teamAName: name,
        teamAId: numberId
      })
    } else if (area === 'teamB') {
      this.setState({
        teamBName: name,
        teamBId: numberId
      })
    } else {
      this.setState({
        courtName: name,
        courtId: numberId
      })
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
    if (message === '赛程增加成功') {
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

  // 提交之后将所有归零
  changeBack = () => {
    this.setState({
      teamAName: '',
      teamAId: '',
      teamBName: '',
      teamBId: '',
      courtName: '',
      courtId: '',
      orderNumber: 0,
      wheelNumber: 0,
      matchDate: ''
    })
  }

  // 点击确定之后提交
  handleSubmit = () => {
    client.mutate({
      mutation: ADD_MATCH_SCHEDULE,
      variables: {
        'input': {
          '_orderNumber': parseInt(this.state.orderNumber),
          '_wheelNumber': parseInt(this.state.wheelNumber),
          '_matchDate': this.state.matchDate,
          '_teamAId': this.state.teamAId,
          '_teamBId': this.state.teamBId,
          '_matchLocation': this.state.courtId
        }
      }
    }).then((reponse) => {
      console.log(reponse)
      this.showToast(reponse.data.changeMatchSchedule.string)
      this.changeBack()
    })
  }
  render () {
    const { navigation } = this.props
    return (
      <Root>
        <Container>
          <Content style={Styles.contentStyle}>
            <Form style={Styles.loginForm}>
              <Item>
                <Input
                  fontSize='1'
                  placeholder="比赛场序"
                  onChangeText={value => this.handleInputChange('orderNumber', value)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  allowFontScaling
                  style={Styles.loginFormInput}
                />
              </Item>
              <Item>
                <Input
                  fontSize='1'
                  placeholder="比赛轮数"
                  onChangeText={value => this.handleInputChange('wheelNumber', value)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  allowFontScaling
                  style={Styles.loginFormInput}
                />
              </Item>
              <Item>
                <Input
                  fontSize='1'
                  placeholder="比赛时间(2018-05-05)"
                  onChangeText={value => this.handleInputChange('matchDate', value)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  allowFontScaling
                  style={Styles.loginFormInput}
                />
              </Item>

              <View style={[Styles.rowStyle1, Styles.teamSelectBox]}>
                <TouchableOpacity onPress={() => navigation.navigate('selectPage', { selectContent: 'teamA', getSelectItem: this.getSelectItem })}>
                  <View style={[Styles.buttonBox, Styles.rowStyle]}>
                    <Text style={Styles.teamSelectButton}>点击选择主队</Text>
                  </View>
                </TouchableOpacity>
                <View>
                  <Text>选择的球队为：{this.state.teamAName}</Text>
                </View>
              </View>
              <View style={[Styles.rowStyle1, Styles.teamSelectBox]}>
                <TouchableOpacity onPress={() => navigation.navigate('selectPage', { selectContent: 'teamB', getSelectItem: this.getSelectItem })}>
                  <View style={[Styles.buttonBox, Styles.rowStyle]}>
                    <Text style={Styles.teamSelectButton}>点击选择客队</Text>
                  </View>
                </TouchableOpacity>
                <View>
                  <Text>选择的球队为：{this.state.teamBName}</Text>
                </View>
              </View>
              <View style={[Styles.rowStyle1, Styles.teamSelectBox]}>
                <TouchableOpacity onPress={() => navigation.navigate('selectPage', { selectContent: 'matchLocation', getSelectItem: this.getSelectItem })}>
                  <View style={[Styles.buttonBox, Styles.rowStyle]}>
                    <Text style={Styles.teamSelectButton}>点击选择球场</Text>
                  </View>
                </TouchableOpacity>
                <View>
                  <Text>选择的球场为：{this.state.courtName}</Text>
                </View>
              </View>
            </Form>
            <View style={Styles.loginButtonView}>
              <Button onPress={this.handleSubmit} block style={Styles.loginButton} >
                <Text style={Styles.loginButtonText} allowFontScaling>确定</Text>
              </Button>
            </View>

          </Content>
        </Container>
      </Root>
    )
  }
}
