import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { TextInput } from 'react-native-paper';
import { BG_COLOR } from '../util/Colors';

const CustomTextInput = ({placeholder,label,value,onChangeText,secureTextEntry,keyboardType,maxLength}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput 
      placeholder={placeholder}
      mode='outlined'
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={styles.textInput}
      outlineStyle={{borderRadius:8}}
      keyboardType={keyboardType}
      maxLength={maxLength}
      
      />
    </View>
  )
}

export default CustomTextInput

const styles = StyleSheet.create({
    inputContainer:{
        width:'90%',
        height:verticalScale(45),
        alignSelf:'center',
        marginTop:moderateVerticalScale(20),
        backgroundColor:BG_COLOR
    },
    textInput:{
        paddingLeft:moderateScale(10),
        backgroundColor:BG_COLOR,
        
        
        
    }
})