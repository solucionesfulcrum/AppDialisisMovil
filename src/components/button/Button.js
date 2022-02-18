import React from 'react'
import {Text, StyleSheet, TouchableOpacity} from 'react-native'

export const styles = StyleSheet.create({
    textButton:{
        borderWidth: 1,
        paddingHorizontal: 80,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#13b4ec',
        fontSize: 20
    }
})

const Button=({label, onPress, disabled})=>{
return(
    <>
    <TouchableOpacity disabled={disabled} onPress={onPress}>
        <Text style={styles.textButton}>
            {label}
        </Text>
    </TouchableOpacity>
    </>
)
};

export default Button;