import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BG_COLOR } from '../../util/Colors'
import { moderateScale, verticalScale } from 'react-native-size-matters';
import CustomTextInput from '../../component/CustomTextInput';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';

const SearchJob = () => {
    const navigation = useNavigation()
    const [skils, setSkills] = useState('')
    const [jobs, setJobs] = useState([])


    const searchJob = (txt) => {

        if (txt.trim() === '') {
            setJobs([]); 
            return;
        }

        firestore().collection('jobs')
            .orderBy('jobTitle')
            .startAt(txt)
            .endAt(txt + '\uf8ff')
            .get()
            .then((snapshots) => {
                let temp = []
                snapshots.docs.forEach(item =>{
                    temp.push({...item.data(), id:item.id})
                });
                setJobs(temp);

            })
            .catch(error => {
                console.log('Error While Searching Job', error);
            })
    }

    const renderJobTitle = ({ item }) => {


        return (
            <TouchableOpacity style={styles.jobTitleBox} onPress={() => navigation.navigate('JobDetails',{data:item})}>
                <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
                    <Text style={styles.title}>{item.jobTitle}</Text>
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
            <Text style={styles.searchjobText}>SearchJob</Text>
            <CustomTextInput
                placeholder={'Search Job Here.....'}
                label={'Search Job'}
                value={skils}
                onChangeText={(text) => {
                    setSkills(text);
                    searchJob(text);
                }}
            />

            <FlatList
                data={jobs}
                keyExtractor={(item, index) => index}
                renderItem={renderJobTitle}
            />
        </View>
    )
}

export default SearchJob

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
})