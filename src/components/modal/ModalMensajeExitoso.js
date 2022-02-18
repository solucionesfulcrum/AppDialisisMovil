import React from 'react'
import {View, Modal, Text, TouchableOpacity, Dimensions, StyleSheet, Image} from 'react-native'

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
    boton:{
        marginTop: 20,
    },
    alertImage:{
        width: 60,
        height: 60,
        marginBottom: 5,
    },
});

const ModalMensajes=({visible,setVisible,label, setOpacado})=>{
    return(
        <>
        <View  style={{alignItems: 'center'}}>
            <Modal visible={visible} transparent={true} animationType='slide' presentationStyle='overFullScreen'>
                <View style={{marginTop: height/2.5, alignItems: 'center'}}>
                    <View style={{margin: 20,padding: 35, alignItems: 'center',backgroundColor: 'white',shadowColor: '#000000', shadowOpacity: 1,shadowOffset: {width:0,height:2}, shadowRadius: 10, elevation: 5}}>
                    <Image
                        style={styles.alertImage}
                        source={require('../../resource/static/images/icons/check.png')}
                    />
                    <View style={styles.boton} onPress={()=>(setVisible(false), setOpacado(1))}>
                    <Text>
                        ¡ {label} !
                    </Text>
                    </View>
                    </View>
                </View>
            </Modal>
        </View>
        </>
    )
}
export default ModalMensajes;