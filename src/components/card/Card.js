import React from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native'

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 0.1,
      backgroundColor: '#F2F2F2',
      flexDirection: 'row'
    },
    textFecha: {
      flex: 0.2,
      padding: 2,
      borderRightWidth: 2,
      borderColor: '#8E8888',
      marginRight: 30,
      alignItems: 'center',
      flexDirection: 'row'
    },
    datosDP:{
      flex: 0.7,
      padding: 2,
      borderWidth: 1,
      borderColor: '#EAE4E4',
      backgroundColor: '#f6f6f6',
      borderRadius: 10,
      marginVertical: 5,
      flexDirection: 'row'
    },
    datoscard:{
      marginVertical: 6,
      marginHorizontal: 20
    },
    circleFecha:{
      backgroundColor: '#13b4ec',
      marginTop: 10,
      marginLeft: -5,
      borderRadius: 20,
    },
    aproved: {
      width: width/18,
      height: height/34,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 30,
      marginTop: 30
    },
    textAproved: {
      fontSize: 10,
      marginHorizontal: 15,
      color: '#3B9827',
      fontWeight: 'bold',
      marginBottom: 5,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

const Card =({item})=>{
    return(
        <>
        <View style={styles.container}>
            <View style={styles.textFecha}>
            <Text style={{marginTop: 10, marginLeft: 30}}>{item.fecha_reg[8]+item.fecha_reg[9]+item.fecha_reg[7]+item.fecha_reg[5]+item.fecha_reg[6]+item.fecha_reg[4]+item.fecha_reg[0]+item.fecha_reg[1]+item.fecha_reg[2]+item.fecha_reg[3]}</Text>
            <Text style={styles.circleFecha}>     </Text>
            </View>
            <TouchableOpacity style={styles.datosDP} onPress={(e)=>console.warn('datos')}>
            <View style={styles.datoscard}>
            <Text style={{marginVertical: 5}}>Ultra Filtracion: {item.ultrafil}</Text>
            <Text style={{marginVertical: 5}}>P.A. Sistolica: {item.pres_art}</Text>
            <Text style={{marginVertical: 5}}>P.A. Diastolica: {item.pres_art_diast}</Text>
            <Text style={{marginVertical: 5}}>Peso: {item.peso} kg</Text>
            </View>
            <View>
                  <Image
                    source={{
                      uri: 'https://img.icons8.com/fluent/48/000000/checkmark.png',
                    }}
                    style={styles.aproved}> 
                  </Image>
                  <Text style={styles.textAproved}>Revisado</Text>
            </View>
            </TouchableOpacity>
        </View>
        </>
    )
};

export default Card;