import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters'
import { BG_COLOR, TEXT_COLOR } from '../util/Colors'

const SolidButton = ({ title, onPress, color, width }) => {
  const containerStyles = {
    width: width ? width : '90%',
    height: verticalScale(50),
    backgroundColor: color ? color : TEXT_COLOR,
    alignSelf: 'center',
    marginTop: moderateVerticalScale(20),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <TouchableOpacity style={containerStyles} onPress={onPress}>
        <Text style={styles.btnTitle}>{title}</Text>
    </TouchableOpacity>
  )
}

export default SolidButton

const styles = StyleSheet.create({
  btnTitle: {
    fontWeight: '500',
    fontFamily: '600',
    fontSize: moderateScale(18),
    color: BG_COLOR
  }
})
