import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale, scale } from 'react-native-size-matters'
import { BG_COLOR } from '../util/Colors'

const Loader = ({visible}) => {
    return (
        <Modal transparent={true} visible={visible} style={{ flex: 1 }}>
            <View style={styles.innermodalcontainer}>
                <View style={styles.modalContentBox}>
                    <ActivityIndicator size='large' />
                </View>
            </View>
        </Modal>
    )
}

export default Loader

const styles = StyleSheet.create({
    innermodalcontainer:{
        width:'100%', 
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,.5)'
    },
    modalContentBox:{
        width:scale(80),
        height:scale(80),
        backgroundColor:BG_COLOR,
        borderRadius:moderateScale(10),
        alignItems:'center',
        justifyContent:'center'
    }
})