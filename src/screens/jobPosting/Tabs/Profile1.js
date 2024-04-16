import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../../util/Colors'
import { moderateScale, scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ProfileOptionItem from '../../../component/ProfileOptionItem';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../../component/Loader';


const Profile1 = ({ onJobPress }) => {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const [name, setName] = useState('')
  const [jobs, setJobs] = useState('');
  const [loading, setLoading] = useState(false)
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  useEffect(() => {
    getData()
  }, [isFocused])

  const getData = async () => {
    setName(await AsyncStorage.getItem('NAME'))
    setJobs(await AsyncStorage.getItem('JOBS'))
    let img = await AsyncStorage.getItem('PROFILE_IMG')
    if (img !== null) {
      setProfileImageUrl(img);
    }
  }

  const openPicker = async () => {
    const res = await launchImageLibrary({ mediaType: 'mixed' })
    if (!res.didCancel) {
      console.log(res.assets[0].uri);
      setProfileImageUrl(res.assets[0].uri);
      setShowUploadButton(true)

    }
  };

  const uploadProfilePic = async () => {
    if (!profileImageUrl) {
      console.error('No profile image selected');
      return;
    }

    setLoading(true)
    const id = await AsyncStorage.getItem('USERID')
    const reference = storage().ref(profileImageUrl);

    const pathToFile = profileImageUrl
    // uploads file
    await reference.putFile(pathToFile);

    const url = await storage().ref(profileImageUrl).getDownloadURL();

    firestore()
      .collection('job_posters')
      .doc(id)
      .update({
        profileImageUrl: url
      })
      .then(async () => {
        setLoading(false)
        await AsyncStorage.setItem('PROFILE_IMG', url)
        setProfileImageUrl(url);
        // navigation.goBack()
      })
      .catch(error => {
        setLoading(false)
        console.log('errorr', error)
      })
  }

  const handleUploadPress = () => {
    uploadProfilePic();
    setShowUploadButton(false);
  };

  const logoutHandler = async () => {
    try {
      // Clear any user data stored locally (replace with your AsyncStorage keys)
      await AsyncStorage.removeItem('USERID');
      await AsyncStorage.removeItem('NAME');
      await AsyncStorage.removeItem('JOBS');
      await AsyncStorage.removeItem('PROFILE_IMG');

      // Redirect the user to the login screen or any other desired screen
      navigation.navigate('SelectUserScreen');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Find My Job</Text>
      {!profileImageUrl ? (
        <TouchableOpacity >
          <Icon name='account-circle' size={80} color='black' style={styles.profileIcon} />
        </TouchableOpacity>
      ) : (
        <Image source={{ uri: profileImageUrl }} style={styles.profileImage} />
      )}

      {showUploadButton && ( // Render the upload button only when showUploadButton is true
        <TouchableOpacity onPress={handleUploadPress}>
          <Text style={styles.uploadButtonText}>Upload Image</Text>
        </TouchableOpacity>

      )}

      <Loader visible={loading} />


      <Text style={styles.userNameText}>{name}</Text>
      <Text style={styles.changeProilePict} onPress={() => navigation.navigate('UpdateProfileForCompany')}>Update Profile</Text>
      <TouchableOpacity onPress={() => openPicker()}>
        <Text style={styles.changeProilePict}>Change Profile Picture</Text>
      </TouchableOpacity>

      <ProfileOptionItem icon={'briefcase-outline'} title={'My Jobs (' + jobs + ')'} onPress={() => onJobPress()} />
      <ProfileOptionItem icon={'handshake-outline'} title={'Contact Us'} />
      <ProfileOptionItem icon={'theme-light-dark'} title={'App Theme'} />
      <ProfileOptionItem icon={'logout'} title={'Logout'} onPress={logoutHandler} />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR
  },
  heading: {
    fontSize: moderateScale(30),
    fontWeight: '600',
    color: TEXT_COLOR,
    marginLeft: moderateScale(10)
  },
  profileIcon: {
    alignSelf: 'center',
    marginTop: moderateScale(20),
  },
  profileImage: {
    height: scale(120),
    width: scale(120),
    borderRadius: scale(60),
    alignSelf: 'center',
    marginTop: moderateScale(20),
  },
  changeProilePict: {
    textDecorationLine: 'underline',
    marginTop: moderateScale(10),
    color: TEXT_COLOR,
    fontSize: moderateScale(16),
    alignSelf: 'center'
  },
  userNameText: {
    fontSize: moderateScale(25),
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: moderateScale(20)
  },

  uploadButtonText: {
    fontSize: moderateScale(16),
    color: TEXT_COLOR,
    alignSelf: 'center',
    marginTop: moderateScale(10),
    textDecorationLine: 'underline',
    fontWeight: '500'
  }
})

export default Profile1;
