import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import DropDown from 'react-native-paper-dropdown';
import { moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { BG_COLOR } from '../util/Colors';

const CustomDropDown = ({ label, value, setValue, listItem }) => {
    const [showDropDown, setShowDropDown] = useState(false);

    return (
        <View style={styles.container}>
            <DropDown
                label={label}
                mode={"outlined"}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                value={value}
                setValue={setValue}
                list={listItem}
                multiSelect
                theme={{colors:{background:'#FFFFFF'}}}
            />
        </View>
    )
}

export default CustomDropDown

const styles = StyleSheet.create({
    container:{
        width:'90%',
        height:verticalScale(45),
        alignSelf:'center',
        marginTop:moderateVerticalScale(20),
        backgroundColor:BG_COLOR,
    },
})
