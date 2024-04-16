import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../screens/jobSearching/Main';
import SearchJob from '../screens/jobSearching/SearchJob';
import JobDetails from '../screens/jobSearching/JobDetails';
import LoginForUser from '../screens/jobSearching/LoginForUser';
import SignUpForUser from '../screens/jobSearching/SignUpForUser';
import SavedJobs from '../screens/jobSearching/SavedJobs';

const Stack = createStackNavigator();
const JobSearchingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='Main'
        component={Main}
      />
      <Stack.Screen
        name='SearchJob'
        component={SearchJob}
        options={{
          headerShown: true,
          headerTitle: ''
        }}
      />
      <Stack.Screen
        name='JobDetails'
        component={JobDetails}
        options={{ headerShown: true, headerTitle: '' }}
      />

      <Stack.Screen
        name='LoginForUser'
        component={LoginForUser}
      />

      <Stack.Screen
        name='SignUpForUser'
        component={SignUpForUser}
      />

      <Stack.Screen
        name='SavedJobs'
        component={SavedJobs}
        options={{
           headerShown: true, 
           headerTitle: 'Saved Jobs' ,
           headerTitleAlign:'center'
          }}

      />
    </Stack.Navigator>
  )
}

export default JobSearchingNavigator

const styles = StyleSheet.create({})