import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import NoLoginComponent from '../../../component/NoLoginComponent';
import { BG_COLOR } from '../../../util/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const User = () => {
  const isFocused = useIsFocused()
  const [isLogin, setIsLogin] = useState(false)
  const [userData, setUserData] = useState(null)
  //  console.log(userData);
  useEffect(() => {
    getData()
    userProfileData()
  }, [isFocused])

  const getData = async () => {
    const id = await AsyncStorage.getItem("USERID")
    const type = await AsyncStorage.getItem("USER_TYPE")
    // console.log('type', type);

    if (id != null && type != null) {
      if (type == 'user') {
        setIsLogin(true)
      }
    }
  }

  const userProfileData = async () => {
    const id = await AsyncStorage.getItem('USERID')
    firestore()
      .collection('users')
      .doc(id)
      .get()
      .then((data) => {
        setUserData(data.data())
      })
  }
  return (
    <View style={styles.container}>
      {!isLogin ?
        <NoLoginComponent
          source={require('../../../img/searching3.jpg')}
          title='Get discovered by recruiters from top companies'
          subTitle='+700 more'
        /> :
        <View style={styles.profileContainer}>
          <TouchableOpacity >
            <Icon name='account-circle' size={80} color='black' />
          </TouchableOpacity>

          <Text style={styles.userNameText}>{userData?.name}</Text>
          <Text style={[styles.userNameText, { fontSize: 16, fontWeight: '400' }]}>{userData?.email}</Text>
          <TouchableOpacity style={styles.editProfileBox}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      }


    </View>
  )
}

export default User

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    paddingHorizontal: moderateScale(20)
  },
  profileContainer: {
    marginTop: moderateScale(20),
    alignItems: 'center'
  },
  userNameText: {
    fontSize: moderateScale(20),
    fontWeight: '500',
    color: 'black',
    marginTop: moderateScale(15)

  },
  editProfileBox:{
    borderWidth:0.5,
    width:'40%',
    height:moderateScale(50),
    borderRadius:moderateScale(10),
    marginTop:moderateScale(20),
    alignItems:'center',
    justifyContent:'center'
  },
  editProfileText:{
    fontSize: moderateScale(15),
    fontWeight: '500',
    color: 'black',

  }
})