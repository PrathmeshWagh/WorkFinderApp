import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { moderateScale } from 'react-native-size-matters'
import { BG_COLOR, TEXT_COLOR } from '../../util/Colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const JobDetails = ({ route }) => {
  const data = route.params.data 
  const [savedjob, setSavedJob] = useState(false)
  const isFocused = useIsFocused()
  const [isLogin, setIsLogin] = useState(false)
  const [savedJobId, setSavedJobId] = useState('')
  const[isJobApplied, setJobApplied] =useState(false)
  const [AppliedJobId, setAppliedJobId] = useState('')

  useEffect(() => {
    getData()
    getSavedJobs()
    getAppliedJOb()
  }, [isFocused])
  

  const getData = async () => {
    const id = await AsyncStorage.getItem("USERID")
    const type = await AsyncStorage.getItem("USER_TYPE")

    if (id != null && type != null) {
      if (type == 'user') {
        setIsLogin(true)
      }
    }

  }

  const saveJobHandler = async () => {
    const id = await AsyncStorage.getItem("USERID")
    firestore()
    .collection('savedJobs')
    .add({
      ...data, 
      userId: id
    }).then((data) => {
      console.log('saved successfulky');
      getSavedJobs()
    }).catch(error => {
      console.error('Error saving job:', error);
    });
  }

  const applyJobHandler = async () => {
    const id = await AsyncStorage.getItem("USERID")
    firestore()
    .collection('applied_jobs')
    .add({
      ...data, 
      userId: id
    }).then((data) => {
      console.log('job applied successfulky');
      getAppliedJOb()
      
    }).catch(error => {
      console.error('Error saving job:', error);
    });
  }

  const getSavedJobs = async () => {
    const id = await AsyncStorage.getItem("USERID");
    firestore()
    .collection('savedJobs')
    .where('userId', '==', id)
    .get()
    .then((snapshot) => {
      if (snapshot.docs.length > 0) {
        snapshot.docs.forEach((item) => {
          if (item.data().id == data.id) {
            setSavedJob(true);
            setSavedJobId(item.id)
          }
        });
      }else{
        setSavedJob(false)
        setSavedJobId('')
      }

    });
  };

  const getAppliedJOb = async () => {
    const id = await AsyncStorage.getItem("USERID");
    firestore()
    .collection('applied_jobs')
    .where('userId', '==', id)
    .get()
    .then((snapshot) => {
      if (snapshot.docs.length > 0) {
        snapshot.docs.forEach((item) => {
          if (item.data().id == data.id) {
            setJobApplied(true);
            setAppliedJobId(item.id)
          }
        });
      }else{
        setJobApplied(false)
        setAppliedJobId('')
      }

    });
  };

  const removedSavedJob = () => {
    firestore()
    .collection('savedJobs')
    .doc(savedJobId)
    .delete()
    .then(() => {
      console.log('removed successfully')
      getSavedJobs()
    })
  }

  const removedAppliedJob = () => {
    console.log(('ff'));
    firestore()
    .collection('applied_jobs')
    .doc(AppliedJobId)
    .delete()
    .then(() => {
      console.log('removed successfully')
      getAppliedJOb()
    })
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.jobTitle}</Text>

      <Text style={[styles.salary, { marginTop: 40 }]}>{'Job Description:   ' + data.jobDesc}</Text>

      <Text style={[styles.salary,]}>{'Salary:   ' + data.salary + ' L/year'}</Text>

      <Text style={styles.salary}>{'Category:   ' + data.category + ''}</Text>
      <Text style={styles.salary}>{'Skills Requied:   ' + data.skill}</Text>
      <Text style={styles.salary}>{'Experience:   ' + data.reqExperience + ' Year'}</Text>
      <Text style={styles.salary}>{'Company:   ' + data.company}</Text>
      <Text style={styles.salary}>{'Posted by:   ' + data.posterName}</Text>

      <View style={styles.applyBtnContainer}>
        <TouchableOpacity style={styles.saveBox} disabled={isLogin ? false : true} onPress={() => {
          if (savedjob) {
            removedSavedJob()
          } else {
            saveJobHandler()
          }
        }}>
          <Icon name={savedjob ? 'star' : 'star-outline'} color={savedjob ? 'orange' : 'black'} size={24} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.applyJobBox, { backgroundColor: !isLogin ? '#ececec' : 'black' }]} disabled={isLogin ? false : true} onPress={() =>{
          if(!isJobApplied){
            applyJobHandler()
          }else{
            removedAppliedJob()
          }
        }}>
          <Text style={[styles.applyJobText, { color: !isLogin ? 'black' : BG_COLOR }]}>{isJobApplied ? 'Applied' : 'Apply Job'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default JobDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    paddingHorizontal: moderateScale(20)

  },
  title: {
    fontSize: moderateScale(30),
    fontWeight: '700',
    color: 'black',
    alignSelf: 'center',
    marginTop: moderateScale(20)
  },
  salary: {
    color: '#2e2e2e',
    fontSize: moderateScale(15),
    fontWeight: '600',
    marginTop: moderateScale(20)
  },
  applyBtnContainer: {

    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: moderateScale(20),
    // left:moderateScale(20)
  },
  saveBox: {
    width: '25%',
    height: moderateScale(35),
    borderWidth: 0.5,
    borderRadius: moderateScale(10),

    justifyContent: 'center',
    alignItems: 'center'
  },
  applyJobBox: {
    width: '70%',
    height: moderateScale(40),
    borderWidth: 0.5,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: TEXT_COLOR
  },
  applyJobText: {
    color: BG_COLOR,
    fontSize: moderateScale(15),
    fontWeight: '600',

  }
})