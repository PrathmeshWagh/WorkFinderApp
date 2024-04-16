import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../../util/Colors'
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = () => {
  const Navigation = useNavigation();
  const isFocused = useIsFocused()
  const [isLogin, setIsLogin] = useState(false)
 //   console.log(isLogin);
  useEffect(() => {
    getData()
  }, [isFocused])

  const getData = async () => {
    const id = await AsyncStorage.getItem("USERID")
    const type = await AsyncStorage.getItem("USER_TYPE")
    // console.log('type',type);

    if (id != null && type != null) {
      if (type == 'user') {
        setIsLogin(true)
      }
    }

  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.searchBoxContainer} onPress={() => Navigation.navigate('SearchJob')}>
        <Icon name='magnify' size={20} color={'black'} />
        <Text style={styles.seachText}>Search By Job....</Text>
      </TouchableOpacity>

      {
        !isLogin && 
        <View>


        <Text style={styles.headingText}>Make the most of Job by creating your job profile</Text>

        <View style={styles.starAndTextContainer}>
          <View>
            <Icon name='star' size={22} color={'#EEBC1D'} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.boldText}>Get discovered directly by recruiters</Text>
            <Text>Recruiters will not post a job 60% of the time</Text>
          </View>
        </View>

        <View style={styles.starAndTextContainer}>
          <View>
            <Icon name='star' size={22} color={'#EEBC1D'} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.boldText}>Find relevant job recommendation</Text>
            <Text>Relevance is better for complete profile</Text>
          </View>
        </View>

        <View style={styles.btnView}>
          <TouchableOpacity style={styles.loginBtn} onPress={() => Navigation.navigate('LoginForUser')}>
            <Text style={[styles.btnText, { color: '#ffffff' }]}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signBtn} onPress={() => Navigation.navigate('SignUpForUser')}>
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
        </View>

      </View>
      }
     

      <View>
        <Image source={require('../../../img/abcd.jpg')} style={styles.jobImage} />
      </View>


    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    paddingHorizontal: moderateScale(25)
  },
  searchBoxContainer: {
    marginTop: moderateScale(20),
    height: moderateScale(50),
    borderRadius: moderateScale(30),
    borderWidth: 0.5,
    flexDirection: 'row',
    // justifyContent:'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    borderColor: '#9c9c9c'
  },
  seachText: {
    marginLeft: moderateScale(10)
  },
  headingText: {
    marginTop: moderateScale(20),
    color: 'black',
    fontSize: moderateScale(21),
    fontWeight: '800',
  },
  starAndTextContainer: {
    marginTop: moderateScale(20),
    flexDirection: 'row',

  },
  boldText: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: 'black'
  },
  btnView: {
    marginTop: moderateScale(30),
    flexDirection: 'row',
    justifyContent: 'space-evenly'
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
    fontSize: moderateScale(16),
    color: 'black'
  },
  signBtn: {
    width: '40%',
    height: verticalScale(30),
    borderWidth: 1,
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center'
  },
  jobImage: {
    width: moderateScale(250),
    height: moderateScale(250),
    position: 'absolute',
    left: 60,
    top: 50
  }
})