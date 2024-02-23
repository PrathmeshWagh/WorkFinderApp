import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../util/Colors'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            getData()
        }, 3000);
    }, [])

    const getData = async() =>{
        let type = await AsyncStorage.getItem("USER_TYPE")
        console.log(type);
        if (type!= null) {
            if (type == 'company') {
                navigation.navigate('DashBoardForComapny')
            }
        }else{
            navigation.navigate('SelectUserScreen')
        }
    }

    return (
        <View style={styles.container}>
            <Image source={require('../../img/appIcon.png')} style={styles.logo} resizeMode='contain' />
            <Text style={styles.name}>FindMyJob</Text>
            <Text style={styles.slogan}>Post & Find Jobs in One Place</Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BG_COLOR
    },
    logo: {
        width: scale(100),
        height: verticalScale(100)
    },
    name: {
        fontSize: moderateScale(40),
        fontWeight: '600',
        marginTop: moderateVerticalScale(10),
        color: TEXT_COLOR
    },
    slogan: {
        fontSize: moderateScale(16),
        fontStyle: 'italic',
        position: 'absolute',
        bottom: moderateVerticalScale(80),
        fontWeight: '700',
        textDecorationLine: 'underline'
    }
})  