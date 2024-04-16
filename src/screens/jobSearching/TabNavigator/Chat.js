import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import NoLoginComponent from '../../../component/NoLoginComponent';
import { BG_COLOR } from '../../../util/Colors';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = () => {
  const isFocused = useIsFocused()
  const [isLogin, setIsLogin] = useState(false)
 //   console.log(isLogin);
  useEffect(() => {
    getData()
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
  return (
    <View style={styles.container}>
      {!isLogin &&
        <NoLoginComponent
          source={require('../../../img/searching2.jpg')}
          title='Here is where recruiter directly reach you for jobs'
          subTitle='keep your profile update to help recruiter discover you to relevent jobs roles'
        />}
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR
  }
})