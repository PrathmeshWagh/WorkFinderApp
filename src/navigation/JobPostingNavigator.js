import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForCompanyScreen from '../screens/jobPosting/LoginForCompanyScreen';
import SignUpForCompanyScreen from '../screens/jobPosting/SignUpForCompanyScreen';
import DashBoardForCompany from '../screens/jobPosting/DashBoardForCompany';
import AddJob from '../screens/jobPosting/Tabs/AddJob';


const Stack = createStackNavigator();

const JobPostingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='LoginForCompanyScreen' component={LoginForCompanyScreen}/>
      <Stack.Screen name='SignUpForCompanyScreen' component={SignUpForCompanyScreen}/>
      <Stack.Screen name='DashBoardForComapny' component={DashBoardForCompany}/>
      <Stack.Screen name='AddJob' component={AddJob}/>

    </Stack.Navigator>
  )
}

export default JobPostingNavigator

const styles = StyleSheet.create({})