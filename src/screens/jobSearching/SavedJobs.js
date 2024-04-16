import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BG_COLOR } from '../../util/Colors'
import { moderateScale, verticalScale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SavedJobs = () => {
    const navigation = useNavigation()
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        savedJob()
    }, [])


    const savedJob = async (txt) => {
        const id = await AsyncStorage.getItem("USERID");

        firestore()
            .collection('savedJobs')
            .where('userId', '==', id)
            .get()
            .then((snapshots) => {
                let temp = []
                snapshots.docs.forEach(item => {
                    temp.push({ ...item.data(), savedJobId: item.id })
                });
                setJobs(temp);

            })
            .catch(error => {
                console.log('Error While Searching Job', error);
            })


    }

    const removedSavedJob = (id) => {
        firestore()
            .collection('savedJobs')
            .doc(id)
            .delete()
            .then(() => {
                console.log('removed successfully')
                savedJob()
            })
    }

    const renderJobTitle = ({ item }) => {
        return (
            <TouchableOpacity style={styles.jobTitleBox} onPress={() => navigation.navigate('JobDetails', { data: item })}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.title}>{item.jobTitle}</Text>
                    <TouchableOpacity onPress={() => removedSavedJob(item.savedJobId)}>
                        <Icon name='star' size={24} color={'orange'} />
                    </TouchableOpacity>
                </View>

                <Text style={[styles.salary, {}]}>{'Salary: ' + item.salary + ' L/year'}</Text>
                <Text style={styles.salary}>{'Category: ' + item.category + ''}</Text>
                <Text style={styles.salary}>{'Skills Requied: ' + item.skill}</Text>
                <Text style={styles.salary}>{'Experience: ' + item.reqExperience + ' Year'}</Text>
                <Text style={styles.salary}>{'Posted by: ' + item.posterName}</Text>
            </TouchableOpacity>
        )

    }
    return (
        <View style={styles.container}>
            {
                jobs.length > 0 ?

                    <FlatList
                        data={jobs}
                        keyExtractor={(item, index) => index}
                        renderItem={renderJobTitle}
                    /> :
                    <View style={styles.emptyView}>
                        <Text style={styles.noAppliedJobText}>No Applied Jobs </Text>
                    </View>
            }
        </View>
    )
}

export default SavedJobs

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
        paddingHorizontal: moderateScale(20)
    },
    searchjobText: {
        fontSize: moderateScale(20),
        fontWeight: '600',
        color: 'black',

    },
    jobTitleBox: {
        width: '90%',
        backgroundColor: '#f2f2f2',
        alignSelf: 'center',
        marginTop: verticalScale(20),
        borderRadius: verticalScale(10),
        padding: moderateScale(10)
    },
    jobTitleText: {
        fontSize: moderateScale(18),
        fontWeight: '600',
        color: 'black',
    },
    title: {
        fontSize: moderateScale(20),
        fontWeight: '600',
        color: 'black'
    },

    salary: {
        color: '#2e2e2e',
        fontSize: moderateScale(15),
        fontWeight: '600',
        marginTop: moderateScale(10)
    },
    emptyView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    noAppliedJobText: {
        color: 'black',
        fontSize: moderateScale(22),
        fontWeight: '600'
    }
})