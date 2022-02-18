import React, {useEffect, useState} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput} from 'react-native'
import axios from 'axios'
import configiguracion from "../../config"
import Button from '../components/button/Button'
import ModaMensajeExitoso from '../components/modal/ModalMensajeExitoso'

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
      flex: 0.08,
      backgroundColor: '#13b4ec',
    },
    containerCenter: {  
      flex: 0.85,
      backgroundColor: '#f2f2f2',
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerEnd: {
      flex: 0.07,
      flexDirection: 'row',
      backgroundColor: '#f2f2f2',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0.15
    },
    home:{
      width: 30,
      height: 30,
      borderRadius: 2,
    },
    back:{
      width: width/14,
      height: height/28,
    },
    textInput:{
      borderWidth: 1,
      borderRadius: 15,
      width: width/1.5,
      textAlign: 'center',
      marginVertical: 10,
    },
    botonIngreso:{
      marginTop: 10,
    },
    textoTitulo:{
      fontSize: 20,
      marginBottom: 20
    },
    textvalidate:{
      color: '#CA4341',
      fontSize: 12,
    },
  });

const AgregarTrat =({navigation,route})=>{
  const [paciente, setPaciente] = useState('');
  const [peso, setPeso] = useState('');
  const [pres_art, setPres_art] = useState('');
  const [ultrafil, setUltrafil] = useState('');
  const [pres_art_diast, setPres_art_diast] = useState('');
  const [visible, setVisible] = useState(false)
  const [opacado, setOpacado] = useState(1)
  const [ultrafilVal, setUltrafilVal] = useState(false)
  const [pres_artVal, setPres_artVal] = useState(false)
  const [pres_art_diastVal, setPres_art_diastVal] = useState(false)
  const [pesoVal, setPesoVal] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [opacado2, setOpacado2] = useState(0.5)
 
  const [datos, setDatos] = useState({
      paciente: "",
      peso: "",
      pres_art: "",
      pres_art_diast: "",
      ultrafil: "",
      datosPaciente: {},
  })
  
  useEffect(()=>{
      setDatos({
          paciente: route.params,
          peso: peso,
          pres_art: pres_art,
          pres_art_diast: pres_art_diast,
          ultrafil: ultrafil,
          datosPaciente: {},
      })
      

  },[paciente, peso, pres_art, pres_art_diast, ultrafil])

  useEffect(()=>{
    if(ultrafil>3000 || ultrafil<0){
      setUltrafilVal(true)
    }else{
      setUltrafilVal(false)
    }
    if((pres_art>=80 && pres_art<=250) || pres_art==''){
      setPres_artVal(false)
    }else{
      setPres_artVal(true)
    }
    
    if((pres_art_diast>=30 && pres_art_diast<=200) || pres_art_diast==''){
      setPres_art_diastVal(false)
    }else{
      setPres_art_diastVal(true)
    }
    if((peso>=40 && peso<=200) || peso===''){
      setPesoVal(false)
    }else{
      setPesoVal(true)
    }
    if(ultrafilVal==false && pres_artVal==false &&  pres_art_diastVal==false && pesoVal==false){
      setDisabled(false)
      setOpacado2(1)
    }else{
      setDisabled(true)
      setOpacado2(0.5)
    }
    },[ultrafil,pres_art,pres_art_diast,peso,ultrafilVal,pres_artVal,pres_art_diastVal,pesoVal])
  const guardar = () =>{
      //navigation.navigate('ApiEnvio', datos)
      axios.post('http://143.198.231.64:8000/api/token/',{
        "username": 'cnsr',
        "password": '123456'
      })
      .then(
      (response)=>{
        const auth="Bearer "+response.data.access
        axios.post('http://143.198.231.64:8000/dialisisPeritoneal/',
        datos,
        {
          headers:{'Authorization ': auth}
        }
        )
        .then(
          (res)=>{
            setOpacado(0.2)
            setVisible(true)
            setTimeout(()=>{navigation.navigate('Principal')},
            3000)
            
          }
        )
        .catch(
          (res)=>{
            console.warn('Error1:' ,res)
          }
        )
      }
      )
      .catch(
        (response)=>{
          console.warn('Error2:' ,response)
        }
      )
  }

    return(
        <>
        <View opacity= {opacado} style={styles.container}>
            <ModaMensajeExitoso visible={visible} label='Guardado Exitoso' setVisible={setVisible} setOpacado={setOpacado} />
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={{flexDirection: 'row',fontWeight: 'bold', marginTop: 5}}> 
                  <Image
                    source={{
                      uri: 'https://img.icons8.com/ultraviolet/40/000000/back.png',
                    }}
                    style={styles.back}> 
                  </Image>
                  <Text style={{color: '#f2f2f2', marginTop: 3}}>Back</Text>
            </View>
            </TouchableOpacity>
        </View>
        <View opacity= {opacado} style={styles.containerCenter}> 
        <Text style={styles.textoTitulo}>Ingrese los Siguientes Datos</Text>
        <TextInput style={styles.textInput} keyboardType='number-pad' placeholder='Ingrese Ultrafiltración' onChangeText={(e) => {setUltrafil(e)}} maxLength={4}></TextInput>
        {ultrafilVal===true?<Text style={styles.textvalidate}>El rango es de [0 - 3000]</Text>:null}
        <TextInput style={styles.textInput} keyboardType='decimal-pad' placeholder='Ingrese su Presión Arterial Sistólica' onChangeText={(e) => {setPres_art(e)}}></TextInput>
        {pres_artVal===true?<Text style={styles.textvalidate}>El rango es de [80 - 250]</Text>:null}
        <TextInput style={styles.textInput} keyboardType='decimal-pad' placeholder='Ingrese su Presión Arterial Diastólica' onChangeText={(e) => {setPres_art_diast(e)}} ></TextInput>
        {pres_art_diastVal===true?<Text style={styles.textvalidate}>El rango es de [30 - 200]</Text>:null}
        <TextInput style={styles.textInput} keyboardType='number-pad' placeholder='Ingrese su Peso en Kilogramos' onChangeText={(e) => {setPeso(e)}} ></TextInput>
        {pesoVal===true?<Text style={styles.textvalidate}>El rango es de [40 - 200]</Text>:null}
        <View opacity={opacado2} style={styles.botonIngreso}>
        <Button label='Guardar' onPress={guardar} disabled={disabled}></Button>
        </View>
        </View>
        <View  opacity= {opacado} style={styles.containerEnd}>
            <TouchableOpacity onPress={()=>{navigation.navigate('Principal')}}>
            <View>
                  <Image
                    source={{
                      uri: 'https://img.icons8.com/ultraviolet/40/000000/home--v1.png',
                    }}
                    style={styles.home}> 
                  </Image>
            </View>
            </TouchableOpacity>
        </View>
        </>
    ) 
};

export default AgregarTrat;