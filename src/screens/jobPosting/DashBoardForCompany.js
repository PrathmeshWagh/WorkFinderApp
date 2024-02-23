import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BG_COLOR } from '../../util/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MyJob from './Tabs/MyJob';
import SearchCandidates from './Tabs/SearchCandidates';
import Chats from './Tabs/Chats';
import Profile1 from './Tabs/Profile1';
import AddJob from './Tabs/AddJob';

const DashBoardForCompany = ({ navigation }) => {

    const [selectedTab, setselectedTab] = useState(0)

    return (
        <SafeAreaView style={styles.container}>
            {selectedTab == 0 ?
                <MyJob />
                : selectedTab == 1 ?
                    <SearchCandidates /> :
                    selectedTab == 2 ?
                        <Chats /> :
                        <Profile1 />
            }
            <View style={styles.bottomView}>
                <TouchableOpacity
                    style={[styles.bottomTab, { borderTopWidth: selectedTab == 0 ? 3 : 0, borderTopColor: 'red' }]}
                    onPress={() => {
                        setselectedTab(0)
                    }}>
                    <Icon name='home' size={30} color={selectedTab == 0 ? 'red' : 'black'} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.bottomTab, { borderTopWidth: selectedTab == 1 ? 3 : 0, borderTopColor: 'red' }]}
                    onPress={() => {
                        setselectedTab(1)
                    }}>
                    <Icon name='account-search' size={30} color={selectedTab == 1 ? 'red' : 'black'} />
                </TouchableOpacity>


                <TouchableOpacity
                    style={[styles.bottomTab, ]}
                    onPress={() => {
                        // setselectedTab(2)
                        navigation.navigate('AddJob')
                    }}

                >
                    <Icon name='plus-box' size={30} color={'black'} />
                </TouchableOpacity>


                <TouchableOpacity
                    style={[styles.bottomTab, { borderTopWidth: selectedTab == 2 ? 3 : 0, borderTopColor: 'red' }]}
                    onPress={() => {
                        setselectedTab(2)
                    }}
                >
                    <Icon name='chat' size={30} color={selectedTab == 2 ? 'red' : 'black'} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.bottomTab, { borderTopWidth: selectedTab == 3 ? 3 : 0, borderTopColor: 'red' }]}
                    onPress={() => {
                        setselectedTab(3)
                    }}
                >
                    <Icon name='account' size={30} color={selectedTab == 3 ? 'red' : 'black'} />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default DashBoardForCompany

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'BG_COLOR
        backgroundColor: '#ffffffff'
    },
    bottomView: {
        width: '100%',
        height: verticalScale(60),
        backgroundColor: BG_COLOR,
        // // shadowColor: 'rgba(0,0,0,.5)',
        // shadowOpacity: .6,
        // shadowOffset: { x: -2, y: -2 }, 
        elevation: 10,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'

    },
    bottomTab: {
        height: '100%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabIcon: {
        width: scale(24),
        height: scale(24),
    }
})