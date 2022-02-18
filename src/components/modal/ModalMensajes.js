import React from 'react'
import {View, Modal, Text, TouchableOpacity, Dimensions, StyleSheet, Image} from 'react-native'

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
    textmensaje:{
        borderRadius: 5,
        borderWidth: 1,
        marginVertical: 1,
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#13b4ec',
    },
    boton:{
        marginTop: 20,
    },
    alertImage:{
        width: width/8,
        height: height/15,
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
                        source={require('../../resource/static/images/icons/alert.png')}
                    />
                    <Text>
                        ¡ {label} !
                    </Text>
                    <TouchableOpacity style={styles.boton} onPress={()=>(setVisible(false), setOpacado(1))}>
                        <Text style={styles.textmensaje}>Cerrar</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
        </>
    )
}
export default ModalMensajes;