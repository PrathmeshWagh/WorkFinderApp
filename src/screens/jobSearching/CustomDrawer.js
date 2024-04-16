import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, } from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../util/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawer = ({ props }) => {
    const isFocused = useIsFocused()
    const [isLogin, setIsLogin] = useState(false)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')

    useEffect(() => {
        getData()
    }, [isFocused])

    const getData = async () => {
        const id = await AsyncStorage.getItem("USERID")
        const type = await AsyncStorage.getItem("USER_TYPE");
        const name = await AsyncStorage.getItem("NAME")
        const email = await AsyncStorage.getItem("EMAIL")

        if (id != null && type != null) {
            if (type == 'user') {
                setIsLogin(true)
                setName(name)
                setEmail(email)

            }
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.iconWithProfileTextContainer}>
                <View>
                    <Icon name='account-circle' size={40} color={'#349eeb'} />
                </View>
                <View>
                    <Text style={[styles.headline, { width: isLogin ? '100%' : '80%' }]}>{isLogin ? name : 'Build Your Profile'}</Text>
                    <Text style={[styles.subHeadline, { width: isLogin ? '100%' : '60%' }]}>{isLogin ? email : 'Job Opportunities Are Waiting for you'}</Text>
                </View>
            </View>
            {!isLogin &&
                <View style={styles.btnView}>
                    <TouchableOpacity style={styles.loginBtn} onPress={() => console.log('a')}>
                        <Text style={[styles.btnText, { color: '#ffffff' }]}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.signBtn} onPress={() => console.log('b')}>
                        <Text style={styles.btnText}>Register</Text>
                    </TouchableOpacity>
                </View>
            }


            <View style={styles.sepratorLine} />


            <FlatList
                contentContainerStyle={{ marginTop: 30 }}
                data={[
                    { title: 'Saved Jobs', icon: 'star-outline' },
                    { title: 'Rate Us', icon: 'handshake-outline' },
                    { title: 'Theme', icon: 'theme-light-dark' },
                ]}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={styles.iconAndNameContainer}
                            onPress={() => {
                                if (index == 0) {
                                    props.navigation.closeDrawer();
                                    props.navigation.navigate('SavedJobs')
                                }
                            }}
                        >
                            <View style={styles.innerIconAndText}>
                                <Icon name={item.icon} size={24} color={'black'} />
                                <Text style={styles.rateUsText}>{item.title}</Text>
                            </View>

                            <Icon name='chevron-right' size={24} color={'black'} />
                        </TouchableOpacity>

                    )
                }}

            />
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
        marginTop: moderateScale(10),
        paddingHorizontal: moderateScale(10)
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
        width: '40%',
        height: verticalScale(30),
        backgroundColor: TEXT_COLOR,
        borderRadius: moderateScale(30),
        justifyContent: 'center',
        alignItems: 'center'

    },
    btnText: {
        fontWeight: '500',
        fontSize: moderateScale(16)
    },
    signBtn: {
        width: '40%',
        height: verticalScale(30),
        borderWidth: 1,
        borderRadius: moderateScale(30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    sepratorLine: {
        width: '100%',
        height: verticalScale(0.5),
        backgroundColor: '#9c9c9c',
        opacity: 0.5,
        alignSelf: 'center',
        marginTop: moderateScale(20)
    },
    iconAndNameContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        height: verticalScale(40)
    },
    innerIconAndText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rateUsText: {
        color: 'black',
        fontSize: moderateScale(14),
        fontWeight: '600',
        marginLeft: moderateScale(10)

    }
})