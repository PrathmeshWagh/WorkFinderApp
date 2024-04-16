import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import JobPostingNavigator from './JobPostingNavigator';
import JobSearchingNavigator from './JobSearchingNavigator';
import SelectUserScreen from '../screens/onBoarding.js/SelectUserScreen';
import SplashScreen from '../screens/onBoarding.js/SplashScreen';
import DashBoardForCompany from '../screens/jobPosting/DashBoardForCompany';
import AddJob from '../screens/jobPosting/Tabs/AddJob';
import EditJob from '../screens/jobPosting/Tabs/EditJob';
import UpdateProfileForCompany from '../screens/jobPosting/UpdateProfileForCompany';
import ChangeProfilePicForCompany from '../screens/jobPosting/ChangeProfilePicForCompany';

const Stack = createStackNavigator();


const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='SplashScreen'  component={SplashScreen}/>
        <Stack.Screen name='SelectUserScreen' component={SelectUserScreen} />
        <Stack.Screen name='JobPostingNavigator' component={JobPostingNavigator}/>
        <Stack.Screen name='JobSearchingNavigator' component={JobSearchingNavigator} />
        <Stack.Screen name='DashBoardForComapny' component={DashBoardForCompany}/>
        <Stack.Screen name='AddJob' component={AddJob} />
        <Stack.Screen name='EditJob' component={EditJob} />
        <Stack.Screen name='UpdateProfileForCompany' component={UpdateProfileForCompany} />
        <Stack.Screen name='ChangeProfilePicForCompany' component={ChangeProfilePicForCompany} />
      


      </Stack.Navigator>
    </NavigationContainer>
    
  )
}

export default MainNavigator
