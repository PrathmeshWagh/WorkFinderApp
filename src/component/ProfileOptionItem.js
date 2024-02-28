import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ProfileOptionItem = ({ title, icon, onPress }) => {
    return (
        <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Icon name={icon} size={20} />
                <Text style={styles.titleText}>{title}</Text>
            </View>

            <View>
                <Icon name='chevron-right' size={24} />
            </View>
        </TouchableOpacity>
    )
}

export default ProfileOptionItem

const styles = StyleSheet.create({
    optionContainer: {
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: moderateVerticalScale(20)
    },
    titleText: {
        fontSize:moderateScale(16),
        fontWeight:'500',
        color:'black',
        marginLeft: moderateScale(15)
    }
})