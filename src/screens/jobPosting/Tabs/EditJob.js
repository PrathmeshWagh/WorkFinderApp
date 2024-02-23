import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BG_COLOR } from '../../../util/Colors'
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomTextInput from '../../../component/CustomTextInput';
import SolidButton from '../../../component/SolidButton';
import CustomDropDown from '../../../component/CustomDropDown';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../component/Loader';

const Category = [
    {
        label: "Web Development ",
        value: "Web Development ",
    },
    {
        label: "Mobile Development",
        value: "Mobile Development",
    },
    {
        label: "Design",
        value: "Design",
    },
]

const data = [
    {
        label: "React Native",
        value: "React Native",
    },
    {
        label: "React Js",
        value: "React Js",
    },
    {
        label: "JavaScript",
        value: "JavaScript",
    },
];

const EditJob = () => {

    const route = useRoute();
    const navigation = useNavigation();
    const [jobTitle, setjobTitle] = useState(route.params.data.jobTitle);
    const [jobDesc, setJobDesc] = useState(route.params.data.jobDesc);
    const [reqExperience, setReqExperience] = useState(route.params.data.reqExperience);
    const [salary, setSalary] = useState(route.params.data.salary);
    const [company, setCompany] = useState(route.params.data.company);
    const [category, setCategory] = useState(route.params.data.category);
    const [skill, setSkill] = useState(route.params.data.skill);
    const [showCategoryDropDown, setShowCategoryDropDown] = useState(false);
    const [showSkillDropDown, setShowSkillDropDown] = useState(false);
    const [loading, setLoading] = useState(false)


    const postJob = async () => {
        let id = await AsyncStorage.getItem('USERID');
        let name = await AsyncStorage.getItem('NAME');

        const cleanedCategory = category.replace(/^\s+|\s+$/g, '').replace(/,/g, '');
        const cleanedSkill = skill.replace(/^\s+|\s+$/g, '').replace(/,/g, '');


        setLoading(true)
        firestore().collection('jobs').add({
            postedBy: id,
            posterName: name,
            jobTitle: jobTitle,
            jobDesc, reqExperience, salary, company, skill: cleanedSkill, category: cleanedCategory
        }).then(() => {
            setLoading(false)
            navigation.goBack()
        }).catch((error) => {
            setLoading(false)
            console.log('error', error)
        })

    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>


                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name='close' size={22} color='black' />
                    </TouchableOpacity>
                    <Text style={styles.title}>Edit Job</Text>
                </View>
                <CustomTextInput
                    placeholder={'ex- React Native Developer'}
                    label={'Job Title'}
                    secureTextEntry={false}
                    value={jobTitle}
                    onChangeText={(text) => setjobTitle(text)}
                />
                <CustomTextInput
                    placeholder={'ex. this Is React Native Developer Job'}
                    label={'Job Description'}
                    secureTextEntry={false}
                    value={jobDesc}
                    onChangeText={(text) => setJobDesc(text)}
                />
                <CustomTextInput
                    placeholder={'ex- 2'}
                    label={'Require Experience'}
                    secureTextEntry={false}
                    value={reqExperience}
                    onChangeText={(text) => setReqExperience(text)}
                    keyboardType={'number-pad'}
                />
                <CustomDropDown
                    label={'Category'}
                    showDropDown={showCategoryDropDown}
                    onDismiss={() => setShowCategoryDropDown(false)}
                    value={category}
                    setValue={setCategory}
                    listItem={Category}
                />
                <CustomDropDown
                    label={'Skills'}
                    showDropDown={showSkillDropDown}
                    onDismiss={() => setShowSkillDropDown(false)}
                    value={skill}
                    setValue={setSkill}
                    listItem={data}
                />
                <CustomTextInput
                    placeholder={'ex - 10Lpa'}
                    label={'Package'}
                    secureTextEntry={false}
                    value={salary}
                    onChangeText={(text) => setSalary(text)}
                    keyboardType={'number-pad'}
                />
                <CustomTextInput
                    placeholder={'ex - TCS'}
                    label={'Company'}
                    secureTextEntry={false}
                    value={company}
                    onChangeText={(text) => setCompany(text)}
                />
                <SolidButton title={'Post Job'} onPress={() => postJob()} />
            </ScrollView>
            <Loader visible={loading} />
        </SafeAreaView>
    );
};

export default EditJob;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR
    },
    header: {
        width: '100%',
        height: verticalScale(45),
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: moderateScale(20)
    },
    title: {
        fontSize: moderateScale(18),
        marginLeft: moderateScale(15),
        fontWeight: '600',
        color: 'black'
    },
});
