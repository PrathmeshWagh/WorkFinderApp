import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters'
import { BG_COLOR, TEXT_COLOR } from '../util/Colors'

const CustomBorderButton = ({title,onPress}) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
        <Text style={styles.btnTitle}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomBorderButton

const styles = StyleSheet.create({
    btnContainer:{
        width:'90%',
        height:verticalScale(50),
        borderWidth:1,
        alignSelf:'center',
        marginTop:moderateVerticalScale(20),
        borderRadius:moderateScale(10),
        justifyContent:'center',
        alignItems:'center'

    },
    btnTitle:{
        color:TEXT_COLOR,
        fontFamily:'600',
        fontSize:moderateScale(18),
        
    }
})