import { Button, Item, Input } from 'native-base' // 2.3.3
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Image } from 'react-native'
import Styles from '../style'

class PasswordInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      passwordIsMasked: true
    }
    this.togglePasswordMask = this.togglePasswordMask.bind(this)
  }

  togglePasswordMask () {
    // console.log('toggle  password')
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked
    }))
  }

  render () {
    const { passwordError, handleInputChange, name, placeholder, itemStyle, fontSize } = this.props
    const { passwordIsMasked } = this.state

    return (
      <Item error={passwordError} style={itemStyle}>
        <Input
          placeholder={placeholder}
          onChangeText={value => handleInputChange(name, value)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={passwordIsMasked}
          allowFontScaling
          style={fontSize}
        />
        {/* <Button transparent style={Styles.rightIcon} onPress={this.togglePasswordMask}>
          {this.state.passwordIsMasked
            ? <Image style={Styles.iconImage} source={require('../../../../img/close-eyes.png')} />
            : <Image style={Styles.iconImage} source={require('../../../../img/open-eyes.png')} />}
        </Button> */}
      </Item>
    )
  }
}

PasswordInput.propTypes = {
  handleInputChange: PropTypes.object.isRequired,
  name: PropTypes.func.isRequired,
  placeholder: PropTypes.func.isRequired
}

export default PasswordInput
