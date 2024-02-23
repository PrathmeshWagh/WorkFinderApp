import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../util/Colors'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import CustomTextInput from '../../component/CustomTextInput'
import SolidButton from '../../component/SolidButton'
import CustomBorderButton from '../../component/CustomBorderButton'
import Loader from '../../component/Loader';
import firestore from '@react-native-firebase/firestore'

const SignUpForCompanyScreen = ({ navigation }) => {

  const [name, setName] = useState('');
  const [badName, setBadName] = useState('');

  const [loading, setLoading] = useState(false)

  const [email, setemail] = useState('');
  const [badEmail, setBadEmail] = useState('');

  const [accountCreated, setAccountCreated] = useState(false);

  const [contact, setcontact] = useState('');
  const [badContact, setBadContact] = useState('');

  const [companyName, setcompanyName] = useState('');
  const [badCompanyName, setBadCompanyName] = useState('');

  const [address, setaddress] = useState('')
  const [badAddress, setBadAddress] = useState('');

  const [password, setpassword] = useState('');
  const [badPassword, setBadPassword] = useState('');

  const validate = () => {
    let valid = true;

    if (name.trim() === '') {
      setBadName('Name cannot be empty');
      valid = false;
    } else {
      setBadName('');
    }

    if (!isValidEmail(email)) {
      setBadEmail('Invalid email address');
      valid = false;
    } else {
      setBadEmail('');
    }

    if (contact.trim() === '') {
      setBadContact('Invalid contact number');
      valid = false;
    } else {
      setBadContact('');
    }

    if (companyName.trim() === '') {
      setBadCompanyName('Company name cannot be empty');
      valid = false;
    } else {
      setBadCompanyName('');
    }

    if (address.trim() === '') {
      setBadAddress('Address cannot be empty');
      valid = false;
    } else {
      setBadAddress('');
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


  const registerUser = () => {
    setLoading(true)
    firestore().collection('job_posters').add({
      name,
      email,
      contact,
      address,
      companyName,
      password,

    }).then(() => {
      setName('')
      setemail('')
      setpassword('')
      setcompanyName('')
      setcontact('')
      setaddress('')
      setAccountCreated(true)
      setLoading(false);
      setTimeout(() => {
          navigation.goBack()
      }, 3000);
    }).catch(error => {
      setLoading(false)
      console.log('error', error)
    })
  }



  return (
    <SafeAreaView style={styles.container}>
      {!accountCreated ?   <ScrollView>
        <Image source={require('../../img/appIcon.png')} style={styles.logo} />
        <Text style={styles.loginTitle}>Create Account</Text>
        <CustomTextInput
          placeholder={'Prathmesh wagh'}
          label={'Name'}
          value={name}
          onChangeText={(text) => setName(text)}
          secureTextEntry={false}
        />
        {badName != '' && <Text style={styles.errorMsgText}>{badName}</Text>}
        <CustomTextInput
          placeholder={'test@gmail.com'}
          label={'Email'}
          value={email}
          onChangeText={(text) => setemail(text)}
          secureTextEntry={false}
        />
        {badEmail != '' && <Text style={styles.errorMsgText}>{badEmail}</Text>}

        <CustomTextInput
          placeholder={'7875028667'}
          label={'Contact'}
          value={contact}
          onChangeText={(text) => setcontact(text)}
          secureTextEntry={false}
          keyboardType={'numeric'}
          maxLength={10}
        />
        {badContact != '' && <Text style={styles.errorMsgText}>{badContact}</Text>}
        <CustomTextInput
          placeholder={'ex. Infosys'}
          label={'Company Name'}
          value={companyName}
          onChangeText={(text) => setcompanyName(text)}
          secureTextEntry={false}
        />
        {badCompanyName != '' && <Text style={styles.errorMsgText}>{badCompanyName}</Text>}
        <CustomTextInput
          placeholder={'ex. Jalka Jagtap'}
          label={'Address'}
          value={address}
          onChangeText={(text) => setaddress(text)}
          secureTextEntry={false}
        />
        {badAddress != '' && <Text style={styles.errorMsgText}>{badAddress}</Text>}
        <CustomTextInput
          placeholder={'********'}
          label={'Password'}
          value={password}
          onChangeText={(text) => setpassword(text)}
          secureTextEntry={true}
        />
        {badPassword != '' && <Text style={styles.errorMsgText}>{badPassword}</Text>}
        <SolidButton
          title={'SignUp'}
          onPress={() => {
            if (validate()) {
              registerUser()
            }
          }}
        />

        <CustomBorderButton
          title={'Login'}
          onPress={() => navigation.goBack()}
        />
        <Loader visible={loading} />
      </ScrollView>:
      <View style={styles.doneView}>
        <Image source={require('../../img/yes.png')} style={styles.logo} />
        <Text style={styles.loginTitle}>Account Created</Text>
      </View>
      }
     
    </SafeAreaView>
  )
}

export default SignUpForCompanyScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,

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
  },
  doneView:{
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center'

  }
})