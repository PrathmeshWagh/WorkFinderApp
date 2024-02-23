import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, version } from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../util/Colors'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import { verticalScale } from 'react-native-size-matters';
// import { LogLevel, OneSignal } from 'react-native-onesignal';

const SelectUserScreen = ({ navigation }) => {

  // useEffect(() => {
  //   OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  //   // OneSignal Initialization
  //   OneSignal.initialize("32640119-37e1-43f0-8668-937283835d0c");

  //   // requestPermission will show the native iOS or Android notification permission prompt.
  //   // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  //   OneSignal.Notifications.requestPermission(true);

  //   // Method for listening for notification clicks
  //   OneSignal.Notifications.addEventListener('click', (event) => {
  //     console.log('OneSignal: notification clicked:', event);
  //   });
  // }, [])

  return (
    <View style={styles.container}>
      <Image source={require('../../img/appIcon.png')} styles={styles.logo} />
      <Text style={styles.title}>What You Are Looking For</Text>

      <TouchableOpacity style={styles.wantToHire} onPress={() => navigation.navigate('JobPostingNavigator')}>
        <Text style={styles.btnText}>Want To Hire</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.wantToJob}>
        <Text style={[styles.btnText, { color: TEXT_COLOR }]}>Want To Job</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SelectUserScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: TEXT_COLOR

  },
  wantToHire: {
    width: '90%',
    height: verticalScale(50),
    backgroundColor: TEXT_COLOR,
    borderRadius: moderateScale(10),
    marginTop: verticalScale(20),
    justifyContent: 'center',
    alignItems: 'center'
  },
  wantToJob: {
    width: '90%',
    height: verticalScale(50),
    borderColor: TEXT_COLOR,
    borderWidth: 1,
    borderRadius: moderateScale(10),
    marginTop: verticalScale(20),
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: BG_COLOR,
    fontSize: moderateScale(16),
    fontWeight: '600'
  },
  logo: {
    width: scale(100),
    height: scale(100),
    marginTop: moderateVerticalScale(50)
  }

})