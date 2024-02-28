import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../screens/jobSearching/Main';

const Stack = createStackNavigator();
const JobSearchingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen  name='Main' component={Main}/>
    </Stack.Navigator>
  )
}

export default JobSearchingNavigator

const styles = StyleSheet.create({})