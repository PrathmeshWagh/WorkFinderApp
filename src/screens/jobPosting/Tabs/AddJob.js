import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../../util/Colors'
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomTextInput from '../../../component/CustomTextInput';
import SolidButton from '../../../component/SolidButton';
import CustomDropDown from '../../../component/CustomDropDown';
import { useNavigation } from '@react-navigation/native';
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

const AddJob = () => {
  const navigation = useNavigation();

  const [jobTitle, setjobTitle] = useState('');
  const [badJobTitle, setBadJobTitle] = useState('');

  const [jobDesc, setJobDesc] = useState('');
  const [badJobDesc, setBadJobDesc] = useState('');

  const [reqExperience, setReqExperience] = useState('');
  const [badReqExperience, setBadReqExperience] = useState('');

  const [salary, setSalary] = useState('');
  const [badSalary, setBadSalary] = useState('');

  const [company, setCompany] = useState('');
  const [badCompany, setBadCompany] = useState('');

  const [category, setCategory] = useState('');
  const [badCategory, setBadCategory] = useState('');

  const [skill, setSkill] = useState('');
  const [badskill, setBadSkill] = useState('');

  const [showCategoryDropDown, setShowCategoryDropDown] = useState(false);
  const [showSkillDropDown, setShowSkillDropDown] = useState(false);
  const [loading, setLoading] = useState(false)


  const postJob = async () => {
    let id = await AsyncStorage.getItem('USERID');
    let name = await AsyncStorage.getItem('NAME');

    const cleanedCategories = category.trim().split(',').map(cat => cat.trim());
    const cleanedSkills = skill.trim().split(',').map(skill => skill.trim());

    // Filter out any empty categories or skills
    const filteredCategories = cleanedCategories.filter(cat => cat);
    const filteredSkills = cleanedSkills.filter(skill => skill);

    // Join the cleaned categories and skills with commas and spaces
    const cleanedCategory = filteredCategories.join(', ');
    const cleanedSkill = filteredSkills.join(', ');


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

  const validate = () => {
    let validJobTitle = true
    let validJobDesc = true
    let validJobCateg = true
    let validSkill = true
    let validReqExp = true
    let validPackg = true
    let validCompany = true

    if (jobTitle == '') {
      validJobTitle = false
      setBadJobTitle('Please Enter Job Title')
    } else if (jobTitle != '') {
      validJobTitle = true
      setBadJobTitle('')
    }

    if (jobDesc == '') {
      validJobDesc = false;
      setBadJobDesc('Please Enter Job Description');
    } else if (jobDesc != '' && jobDesc.length < 50) {
      validJobDesc = false;
      setBadJobDesc('Please Enter Description min 50 character');
    } else if (jobDesc != '' && jobDesc.length >= 50) {
      validJobDesc = true;
      setBadJobDesc('');
    }

    if (category == '') {
      validJobCateg = false;
      setBadCategory('Please Enter Job Category');
    } else if (category != '') {
      validJobCateg = true;
      setBadCategory('');
    }

    if (skill == '') {
      validSkill = false;
      setBadSkill('Please Enter Job Skills');
    } else if (skill != '') {
      validSkill = true;
      setBadSkill('');
    }

    if (reqExperience == '') {
      validReqExp = false;
      setBadReqExperience('Please Enter Required Experience');
    } else if (reqExperience != '' && reqExperience.length > 2) {
      validReqExp = false;
      setBadReqExperience('Please Enter valid Experience')
    } else if (reqExperience != '' && reqExperience.length <= 2) {
      validReqExp = true;
      setBadReqExperience('')
    }

    if (salary == '') {
      validPackg = false;
      setBadSalary('Please Enter Package');
    } else if (salary != '') {
      validPackg = true;
      setBadSalary('');
    }

    if (company == '') {
      validCompany = false;
      setBadCompany('Please Enter Company Name');
    } else if (company != '') {
      validCompany = true;
      setBadCompany('');
    }

    return validJobTitle && 
    validJobDesc && 
    validJobCateg && 
    validSkill && 
    validReqExp && 
    validCompany && 
    validPackg
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>


        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name='close' size={22} color='black' />
          </TouchableOpacity>
          <Text style={styles.title}>Post Job</Text>
        </View>


        <CustomTextInput
          placeholder={'ex- React Native Developer'}
          label={'Job Title'}
          secureTextEntry={false}
          value={jobTitle}
          onChangeText={(text) => setjobTitle(text)}
        />
        {badJobTitle != '' && <Text style={styles.errorMsg}>{badJobTitle}</Text>}
        <CustomTextInput
          placeholder={'ex. this Is React Native Developer Job'}
          label={'Job Description'}
          secureTextEntry={false}
          value={jobDesc}
          onChangeText={(text) => setJobDesc(text)}
        />
        {badJobDesc != '' && <Text style={styles.errorMsg}>{badJobDesc}</Text>}
        <CustomTextInput
          placeholder={'ex- 2'}
          label={'Require Experience'}
          secureTextEntry={false}
          value={reqExperience}
          onChangeText={(text) => setReqExperience(text)}
          keyboardType={'number-pad'}
        />
        {badReqExperience != '' && <Text style={styles.errorMsg}>{badReqExperience}</Text>}
        <CustomDropDown
          label={'Category'}
          showDropDown={showCategoryDropDown}
          onDismiss={() => setShowCategoryDropDown(false)}
          value={category}
          setValue={setCategory}
          listItem={Category}
        />
        {badCategory != '' && <Text style={styles.errorMsg}>{badCategory}</Text>}
        <CustomDropDown
          label={'Skills'}
          showDropDown={showSkillDropDown}
          onDismiss={() => setShowSkillDropDown(false)}
          value={skill}
          setValue={setSkill}
          listItem={data}
        />
        {badskill != '' && <Text style={styles.errorMsg}>{badskill}</Text>}
        <CustomTextInput
          placeholder={'ex - 10Lpa'}
          label={'Package'}
          secureTextEntry={false}
          value={salary}
          onChangeText={(text) => setSalary(text)}
          keyboardType={'number-pad'}
        />
        {badSalary != '' && <Text style={styles.errorMsg}>{badSalary}</Text>}
        <CustomTextInput
          placeholder={'ex - TCS'}
          label={'Company'}
          secureTextEntry={false}
          value={company}
          onChangeText={(text) => setCompany(text)}
        />
        {badCompany != '' && <Text style={styles.errorMsg}>{badCompany}</Text>}
        <SolidButton backgroundColor={TEXT_COLOR} title={'Post Job'} onPress={() => {
          if(validate()){
            postJob()
          }
        }} />
      </ScrollView>
      <Loader visible={loading} />
    </SafeAreaView>
  );
};

export default AddJob;

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
  errorMsg:{
    color:'red',
    marginLeft:moderateScale(20)
  }
});
