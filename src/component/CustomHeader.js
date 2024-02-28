import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const CustomHeader = ({title, onPress}) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
            <Icon name={'keyboard-backspace'} size={30} color='black'/>
        </TouchableOpacity>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:verticalScale(40),
        flexDirection:'row',
        paddingLeft:moderateScale(15),
        alignItems:'center'
    },
    titleText:{
        fontSize:moderateScale(18),
        marginLeft:moderateScale(18),
        color:'black',
        fontWeight:'500'
    }
})