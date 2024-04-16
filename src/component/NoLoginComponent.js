import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import SolidButton from './SolidButton'
import { useNavigation } from '@react-navigation/native'

const NoLoginComponent = ({ source, title, subTitle }) => {
    const navigation = useNavigation();
    return (
        <>
            <View style={styles.container}>
                <Image source={source} style={styles.imageBox} />
                <Text style={styles.titleText}>{title}</Text>
                <Text style={styles.subtitleText}>{subTitle}</Text>
            </View>
            <SolidButton title={'Register For Free'} color={'#ff8c00'} widht='60%' onPress={()=> navigation.navigate('SignUpForUser')} />
            
            <Text style={{ color:'black',textAlign: 'center',marginTop:verticalScale(20) }}>Already have an account? <Text style={{ color: 'blue', fontWeight: '500', fontSize: moderateScale(15) }} onPress={() =>navigation.navigate('LoginForUser')}>Login</Text></Text>

        </>

    )
}

export default NoLoginComponent

const styles = StyleSheet.create({
    container: {
        marginTop: moderateScale(50),
        paddingHorizontal: moderateScale(20),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(50)
    },
    imageBox: {
        width: moderateScale(220),
        height: moderateScale(220),
        marginBottom: moderateScale(30)
    },
    titleText: {
        textAlign: 'center',
        fontSize: moderateScale(22),
        fontWeight: '700',
        color: 'black'
    },
    subtitleText: {
        marginTop: moderateScale(10),
        width: '85%',
        fontSize: moderateScale(12),
        color: 'black',
        textAlign: 'center'
    }
})