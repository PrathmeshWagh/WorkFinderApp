import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../util/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import SolidButton from '../../component/SolidButton';

const CustomDrawer = ({ props }) => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.iconWithProfileTextContainer}>
                <View>
                    <Icon name='account-circle' size={40} color={'#349eeb'} />
                </View>
                <View>
                    <Text style={styles.headline}>Make Your Profile</Text>
                    <Text style={styles.subHeadline}>Job Opportunities Are Waiting for you</Text>
                </View>
            </View>
            <View style={styles.btnView}>
                <TouchableOpacity style={styles.loginBtn} onPress={() =>console.log('a')}>
                    <Text style={[styles.btnText,{color:'#ffffff'}]}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signBtn} onPress={() =>console.log('b')}>
                    <Text style={styles.btnText}>Register</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.sepratorLine} />
        </SafeAreaView>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR
    },
    iconWithProfileTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(10)
    },
    headline: {
        fontSize: 17,
        width: '80%',
        fontWeight: '700',
        color: 'black',
        marginLeft: moderateScale(10)
    },
    subHeadline: {
        fontSize: moderateScale(14),
        width: '60%',
        marginLeft: moderateScale(10),
        marginTop: moderateScale(2),
        color: 'black'
    },
    btnView: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: moderateVerticalScale(20)
    },
    loginBtn: {
        width:'40%',
        height:verticalScale(30),
        backgroundColor: TEXT_COLOR,
        borderRadius:moderateScale(30),
        justifyContent:'center',
        alignItems:'center'

    }, 
    btnText: {
        fontWeight:'500',
        fontSize:moderateScale(16)
    },
    signBtn: {
        width:'40%',
        height:verticalScale(30),
        borderWidth:1,
        borderRadius:moderateScale(30),
        justifyContent:'center',
        alignItems:'center'
    },
    sepratorLine:{
        width:'100%',
        height:verticalScale(0.5),
        backgroundColor:'#9c9c9c',
        opacity:0.5,
        alignSelf:'center',
        marginTop:moderateScale(20)
    }
})