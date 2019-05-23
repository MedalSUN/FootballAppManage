import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Container, Content, Input, Form, Item, View, Button } from 'native-base'
import { Query } from 'react-apollo'
import Styles from './style'

export default class AddRaceSchedule extends React.Component {
  static navigationOptions = (
    (props) => {
      return {
        headerTitle: 'AddRaceSchedule',
        headerTitleStyle: {
          marginLeft: 110
        }
      }
    }
  )
  constructor (props) {
    super(props)

    this.state = {
      orderNumber: 0,
      wheelNumber: 0,
      matchDate: ''
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

  // 点击确定之后提交
  handleSubmit = () => {
    console.log('点击确定')
  }
  render () {
    return (
      <Container>
        <Content style={Styles.contentStyle}>
          <Form style={Styles.loginForm}>
            <Item>
              <Input
                fontSize='1'
                placeholder="比赛场序"
                onChangeText={value => this.handleInputChange('orderNumber', value)}
                keyboardType="email-address"
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
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                allowFontScaling
                style={Styles.loginFormInput}
              />
            </Item>
            <Item>
              <Input
                fontSize='1'
                placeholder="比赛时间"
                onChangeText={value => this.handleInputChange('matchDate', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                allowFontScaling
                style={Styles.loginFormInput}
              />
            </Item>

            <View style={[Styles.rowStyle1, Styles.teamSelectBox]}>
              <TouchableOpacity>
                <View style={[Styles.buttonBox, Styles.rowStyle]}>
                  <Text style={Styles.teamSelectButton}>点击选择主队</Text>
                </View>
              </TouchableOpacity>
              <View>
                <Text>选择的球队为：{this.state.teamAName}</Text>
              </View>
            </View>
            <View style={[Styles.rowStyle1, Styles.teamSelectBox]}>
              <TouchableOpacity>
                <View style={[Styles.buttonBox, Styles.rowStyle]}>
                  <Text style={Styles.teamSelectButton}>点击选择客队</Text>
                </View>
              </TouchableOpacity>
              <View>
                <Text>选择的球队为：{this.state.teamBName}</Text>
              </View>
            </View>
            <View style={[Styles.rowStyle1, Styles.teamSelectBox]}>
              <TouchableOpacity>
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
    )
  }
}
