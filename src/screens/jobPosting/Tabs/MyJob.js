import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../../util/Colors'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { FlatList } from 'react-native-gesture-handler'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';


const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const MyJob = () => {
  const navigation = useNavigation()
  const isFocused = useIsFocused();
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getJobs()
  }, [isFocused])

  const getJobs = async () => {
    setLoading(true)
    let id = await AsyncStorage.getItem("USERID");
    firestore().collection('jobs').where("postedBy", "==", id)
      .get().then(async (data) => {
        setLoading(false)
        let temp = []
        data.docs.forEach((item) => {
          temp.push({ ...item.data(), id: item.id })
        });
        await AsyncStorage.setItem('JOBS', temp.length + "")
        setJobs(temp)
      })
  }

  const renderJobData = ({ item, index }) => {


    return (
      <View style={styles.jobItem}>
        <Text style={styles.title}>{item.jobTitle}</Text>
        <Text style={styles.desc}>{'Description: ' + item.jobDesc}</Text>
        <Text style={styles.salary}>{'Salary: ' + item.salary + ' L/year'}</Text>

        <Text style={styles.salary}>{'Category: ' + item.category + ''}</Text>
        <Text style={styles.salary}>{'Skills: ' + item.skill}</Text>
        <Text style={styles.salary}>{'Experience: ' + item.reqExperience + ' Year'}</Text>

        <View style={styles.bottomView}>
          <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('EditJob', { data: item })}>
            <Text>Edit Job</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteJob(item.id)}>
            <Text style={{ color: 'red' }}>Delete Job</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const deleteJob = (id) => {
    firestore().collection('jobs').doc(id).delete().then(() => {
      getJobs()
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Find My Job</Text>

      <FlatList
        data={jobs}
        renderItem={renderJobData}
        ListEmptyComponent={() => {
          return (
            <>
             <View style={styles.loaderView}>
              <ShimmerPlaceholder style={styles.loaderTitle} />
              <ShimmerPlaceholder style={styles.loaderTitle} />
              <ShimmerPlaceholder style={styles.loaderTitle} />
              <ShimmerPlaceholder style={styles.loaderTitle} />
              <ShimmerPlaceholder style={styles.loaderTitle} />
              <View style={styles.loaderBottomView}>
                <ShimmerPlaceholder style={styles.loaderBtn} />
                <ShimmerPlaceholder style={styles.loaderBtn} />
              </View>
            </View>

            <View style={styles.loaderView}>
              <ShimmerPlaceholder style={styles.loaderTitle} />
              <ShimmerPlaceholder style={styles.loaderTitle} />
              <ShimmerPlaceholder style={styles.loaderTitle} />
              <ShimmerPlaceholder style={styles.loaderTitle} />
              <ShimmerPlaceholder style={styles.loaderTitle} />
              <View style={styles.loaderBottomView}>
                <ShimmerPlaceholder style={styles.loaderBtn} />
                <ShimmerPlaceholder style={styles.loaderBtn} />
              </View>
            </View>

            <View style={styles.loaderView}>
              <ShimmerPlaceholder style={styles.loaderTitle} />
              <ShimmerPlaceholder style={styles.loaderTitle} />
              <ShimmerPlaceholder style={styles.loaderTitle} />
              <ShimmerPlaceholder style={styles.loaderTitle} />
              <ShimmerPlaceholder style={styles.loaderTitle} />
              <View style={styles.loaderBottomView}>
                <ShimmerPlaceholder style={styles.loaderBtn} />
                <ShimmerPlaceholder style={styles.loaderBtn} />
              </View>
            </View>
            </>
            

            
          )
        }}
      />
    </View>
  )
}

export default MyJob

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
  jobItem: {
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateScale(20),
    backgroundColor: '#f2f2f2',
    borderRadius: moderateScale(20),
    padding: moderateScale(10)
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: 'black'
  },
  desc: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    marginTop: moderateScale(5)
  },
  salary: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    marginTop: moderateScale(5)
  },
  bottomView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: moderateScale(15)
  },
  editBtn: {
    width: '40%',
    height: verticalScale(40),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    // borderColor:'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteBtn: {
    width: '40%',
    height: verticalScale(40),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop:'80%'

  },
  loaderView: {
    width: '90%',
    // height: verticalScale(200),
    alignSelf: 'center',
    marginTop: moderateScale(20)
  },
  loaderTitle: {
    width: "70%",
    height: verticalScale(30),
    borderRadius: moderateScale(10),
    marginVertical: moderateScale(5),
  },
  loaderBottomView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: moderateScale(10)
  },
  loaderBtn: {
    width: '40%',
    height: verticalScale(30),
    borderRadius: moderateScale(10)
  }

})