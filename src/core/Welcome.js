import React, {useState, createContext} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput} from 'react-native'
import axios from 'axios'
import configiguracion from "../../config"
import ModalMensajes from '../components/modal/ModalMensajes';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FBFEFA',
    },
    imagen: {
        width: width/1.5,
        height: height/2,
    },
    imagenEnviar: {
      width: 45,
      height: 45,
      marginTop: 2
  },
    textInput: {
        borderWidth: 1,
        borderColor: '#2da4f1',
        borderRadius: 10,
        marginRight: 5,
        color: '#315f85',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
  });
  

  //export const paciente1 = createContext({color: 'rojo'});

  const Welcome =({navigation})=>{
  const [valor , setValor] = useState({});
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState('')
  const [opacado, setOpacado] = useState(1)

  const enviar=()=>{
    if (valor.length>=8){
    axios.post('http://143.198.231.64:8000/api/token/',{
      "username": 'cnsr',
      "password": '123456'
      })
      .then(
      (response)=>{
        const auth="Bearer "+response.data.access
        axios.get('http://143.198.231.64:8000/usuarios/?search='+valor,
        {
          headers:{'Authorization ': auth}
        }
        )
        .then(
          (res)=>{
            if (res.data.length===0){
              setVisible(true)
              setLabel('Usuario no Registrado')
              setOpacado(0.5)
            }else{
              navigation.navigate('Principal', res.data[0])
            }
          }
        )
        .catch(
          (res)=>{
            console.warn('Error:' ,res)
          }
        )
      }
      )
      .catch(
        (response)=>{
          console.warn('Error:' ,response)
        }
      )}else{
        setVisible(true)
        setLabel('Mínimo 8 Caracteres')
        setOpacado(0.5)
      }
  }
  
  return(
        <>
        <View opacity= {opacado}  style={styles.container}>
        <ModalMensajes visible={visible} label={label} setVisible={setVisible} setOpacado={setOpacado}></ModalMensajes>
            <Image
                source={{
                uri: 'https://us.123rf.com/450wm/3dmask/3dmask1710/3dmask171000033/88271730-doctor-3d-que-se%C3%B1ala-a-la-pared-vac%C3%ADa-ilustraci%C3%B3n-con-el-fondo-blanco-aislado.jpg?ver=6',
                }}
                style={styles.imagen}> 
            </Image>
            <View style={{flexDirection: 'row'}}>   
            <TextInput style={styles.textInput} onChangeText={(e)=>{setValor(e)}} placeholder='Ingrese Documento de Identidad' keyboardType='number-pad' maxLength={10} ></TextInput>
            <TouchableOpacity onPress={enviar} >
            <Image
                style={styles.imagenEnviar}
                source={require('../resource/static/images/icons/arrow.png')}
            />
            </TouchableOpacity>
            </View> 
        </View>
        </>
    )
};
export default Welcome;