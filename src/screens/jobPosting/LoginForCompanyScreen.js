import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../util/Colors'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import CustomTextInput from '../../component/CustomTextInput'
import SolidButton from '../../component/SolidButton'
import CustomBorderButton from '../../component/CustomBorderButton';
import firestore from '@react-native-firebase/firestore'
import Loader from '../../component/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginForCompanyScreen = ({ navigation }) => {
  const [email, setemail] = useState('');
  const [badEmail, setBadEmail] = useState('');

  const [loading, setloading] = useState(false)
  const [password, setpassword] = useState('');
  const [badPassword, setBadPassword] = useState('');

  const validate = () => {
    let valid = true;

    if (!isValidEmail(email)) {
      setBadEmail('Invalid email address');
      valid = false;
    } else {
      setBadEmail('');
    }

    if (password.trim() === '') {
      setBadPassword('Password cannot be empty');
      valid = false;
    } else {
      setBadPassword('');
    }

    return valid;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const loginUser = () => {
    setloading(true)
    firestore().collection("job_posters").where('email', '==', email).get().then(data => {
      setloading(false)
      console.log('data', data.docs)
      if (data.docs.length > 0) {
        data.docs.forEach((item) =>{
          if (item.data().password == password) {
            setBadEmail("")
            setBadPassword("")
            goToNextScreen(item.id, item.data().email, item.data().name)
          }else{
            setBadPassword("Wrong Password")
          }
        })
      }else{
        setBadEmail("No User Exist With This Email")
      }
    }).catch(error => {
      setloading(false)
      console.log('error', error)
    })
  }

  const goToNextScreen = async (id,email,name) =>{
    await AsyncStorage.setItem("EMAIL",email)
    await AsyncStorage.setItem("NAME",name)
    await AsyncStorage.setItem("USERID",id)
    await AsyncStorage.setItem("USER_TYPE",'company')
    navigation.navigate('DashBoardForComapny')
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../img/appIcon.png')} style={styles.logo} />
      <Text style={styles.loginTitle}>Login</Text>

      <CustomTextInput
        placeholder={'test@gmail.com'}
        label={'Email'}
        secureTextEntry={false}
        value={email}
        onChangeText={(text) => setemail(text)}
      />
      {badEmail != '' && <Text style={styles.errorMsgText}>{badEmail}</Text>}
      <CustomTextInput
        placeholder={'********'}
        label={'Password'}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setpassword(text)}
      />
      {badPassword != '' && <Text style={styles.errorMsgText}>{badPassword}</Text>}


      <Text style={styles.fotgotText}>Forgot Password</Text>
      <SolidButton
        title={'Login'}
        onPress={() => {
          if (validate()) {
            loginUser()
          }
        }

        }
      />
      <CustomBorderButton title={'Create Account'} onPress={() => navigation.navigate('SignUpForCompanyScreen')} />
      <Loader visible={loading} />
    </View>
  )
}

export default LoginForCompanyScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR
  },
  logo: {
    width: scale(60),
    height: scale(60),
    alignSelf: 'center',
    marginTop: moderateVerticalScale(40)
  },
  loginTitle: {
    color: TEXT_COLOR,
    fontSize: moderateScale(25),
    alignSelf: 'center',
    fontWeight: '600',
    marginTop: moderateVerticalScale(50)
  },
  fotgotText: {
    alignSelf: 'flex-end',
    marginRight: moderateScale(20),
    marginTop: moderateScale(20),
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: TEXT_COLOR,
    textDecorationLine: 'underline'
  },
  errorMsgText: {
    color: 'red',
    marginLeft: moderateScale(20)
  }
})