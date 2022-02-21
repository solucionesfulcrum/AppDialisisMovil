import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native'
import Footer from '../components/footer/Footer'


const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 0.13,
      backgroundColor: '#13b4ec',
    },
    containerCenter: {  
      flex: 0.8,
      backgroundColor: '#f2f2f2',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: 10,
    },
    containerCenter__title:{
      fontSize: width/25,
    },
    containerEnd: {
      flex: 0.07,
      flexDirection: 'row',
      backgroundColor: '#f2f2f2',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0.15
    },
    imagen: {
      width: width/8,
      height: height/16,
      borderRadius: 100,
      borderWidth: 4,
      borderColor: '#B6CAF4',
    },
    textoPerfil: {
      color: '#F1F4FA',
      fontWeight: 'bold',
      marginLeft: 15,
      fontSize: width/25,
    },
    textoPerfilSEcundario: {
      color: '#F1F4FA',
      marginLeft: 15,
      fontSize: width/30,
    },
    datosPersonales: {
      alignItems: 'center',
      flexDirection: 'row',
      width: width/1.5,
      height: height/6,
    },
    iconos:{
      width: 30,
      height: 30,
      marginVertical: 20,
      marginHorizontal: 20
    },
    iconosEnd: {
      width: 30,
      height: 30,
      marginVertical: 30,
      marginLeft: 30,
      marginRight: 10
    },
    home:{
      width: 30,
      height: 30,
      borderRadius: 2,
    }
  });
const VerResulLab =({navigation, route})=>{
  console.log("paciente datos lab",route.params)
  return(
        <>
        <View style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.datosPersonales}>
          <TouchableOpacity onPress={e=>(console.warn('foto'))}>
              <Image
                style={styles.imagen}
                source={require('../resource/static/images/icons/logo.png')}
            />
              </TouchableOpacity>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.textoPerfil}>{route.params.datosPaciente.nombres + ' ' + route.params.datosPaciente.ape_pat + ' ' + route.params.datosPaciente.ape_mat}</Text>
                  {route.params.datosPaciente.tipoTrata==1?
                  <Text style={styles.textoPerfilSEcundario}>Paciente Diálisis Peritoneal</Text>:null}
                  {route.params.datosPaciente.tipoTrata==2?
                  <Text style={styles.textoPerfilSEcundario}>Paciente Hemodiálisis</Text>
                  :null}
                </View>  
          </View>
        </View>
        <View style={styles.containerCenter}> 
                <View>
                  <Text style={styles.containerCenter__title}>Resultado de Laboratorio</Text>
                </View>
        </View>
          <View style={styles.containerEnd}>
              <Footer onPress={()=>{navigation.navigate('Principal')}}></Footer>
          </View>
        </View>
        </>
    )
};
export default VerResulLab;