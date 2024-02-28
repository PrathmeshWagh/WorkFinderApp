import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerScreen from './DrawerScreen';
import CustomDrawer from './CustomDrawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Home from './TabNavigator/Home';
import Send from './TabNavigator/Send';
import Chat from './TabNavigator/Chat';
import User from './TabNavigator/User';

const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#004996',
            tabBarInactiveTintColor: '#808080',
            tabBarLabelStyle: { fontSize: 13, paddingBottom: 5 },
            tabBarStyle: { height: 55 }

        }}
        >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{

                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='home' color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name='Send'
                component={Send}
                options={{
                    tabBarLabel: 'Send',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='send' color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name='Chat'
                component={Chat}
                options={{
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='chat' color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name='User'
                component={User}
                options={{
                    tabBarLabel: 'User',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='account' color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const Main = () => {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawer props={props} />} initialRouteName='BottomTabs' >
            <Drawer.Screen
                name='DrawerScreen'
                component={DrawerScreen}
               
            />
            <Drawer.Screen 
            name='BottomTabs' 
            component={BottomTab} 
            options={{
                headerTitle:'Find My Job',
                headerTitleAlign:'center'
            }}
            />
        </Drawer.Navigator>
    )
}

export default Main

const styles = StyleSheet.create({})