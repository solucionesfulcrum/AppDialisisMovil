import React, { useState, createContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput, Modal } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import axios from 'axios'
import configiguracion from "../../config"
import ModalMensajes from '../components/modal/ModalMensajes';
import Button from '../components/button/Button'
import PDF from '../components/Pdf/index'

const { width, height } = Dimensions.get('window');



//export const paciente1 = createContext({color: 'rojo'});

const Welcome = ({ navigation }) => {
  const [valor, setValor] = useState({});
  const [valorPass, setValorPass] = useState({});
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState('')
  const [opacado, setOpacado] = useState(1)
  const [primSesionVal, setPrimSesionVal] = useState(false)
  const [isSelected, setSelection] = useState(false);
  const [idUsuario, setidUsuario] = useState();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FBFEFA',
    },
    imagen: {
      width: width / 1.7,
      height: height / 5.1,
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
      marginVertical: 10,
      width: width / 1.6,
    },

    imagenGoogle: {
      width: width / 15,
      height: height / 30,
      marginTop: 18,
    },

    textButton: {
      paddingHorizontal: 50,
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 15,
      backgroundColor: '#13b4ec',
      fontSize: 15,
      color: '#fff',
      textAlign: 'center',
      opacity: isSelected == false ? 0.5 : 1
    }
  });

  const enviar = () => {
    if (valor.length >= 8) {
      axios.post('http://147.182.226.155:8000/api/token/', {
        "username": 'cnsr',
        "password": '123456'
      })
        .then(
          (response) => {
            const auth = "Bearer " + response.data.access
            axios.get('http://147.182.226.155:8000/usuarios/?search=' + valor,
              {
                headers: { 'Authorization ': auth }
              }
            )
              .then(
                (res) => {
                  console.log("login", res.data[0].url.split("/")[4])
                  setidUsuario(res.data[0].url.split("/")[4])
                  if (res.data.length === 0) {
                    setVisible(true)
                    setLabel('Usuario no Registrado')
                    setOpacado(0.5)
                  } else if (res.data[0].pass_user === valorPass) {
                    res.data[0].primSesion == 0 ? setPrimSesionVal(true) :
                      navigation.navigate('Principal', res.data[0])
                  } else {
                    setVisible(true)
                    setLabel('Usuario o Clave Incorrecta')
                    setOpacado(0.5)
                  }
                }
              )
              .catch(
                (res) => {
                  console.warn('Error:', res)
                }
              )
          }
        )
        .catch(
          (response) => {
            console.warn('Error:', response)
          }
        )
    } else {
      setVisible(true)
      setLabel('Mínimo 8 Caracteres')
      setOpacado(0.5)
    }
  }


  const validAutorizacion = () => {
    axios.post('http://147.182.226.155:8000/api/token/', {
      "username": 'cnsr',
      "password": '123456'
    })
      .then(
        (res) => {
          const auth = "Bearer " + res.data.access
          axios.patch('http://147.182.226.155:8000/usuarios/' + idUsuario + '/', { primSesion: "1" },
            {
              headers: { 'Authorization': auth, }
            }
          )
            .then(
              (res) => {
                console.log("data", res)
                setPrimSesionVal(false)
              }
            )
            .catch(
              (res) => {
                console.warn('Error:', res)
              }
            )
        }
      )
      .catch(
        (response) => {
          response === 404 ? console.warn('lo sientimos no tenemos servicios') : console.warn('Error:', response)
        }
      )
  }

  return (
    <>
      <Modal visible={primSesionVal} transparent={true} animationType='slide' presentationStyle='overFullScreen'>
        <View style={{ alignItems: 'center',marginTop:5, alignSelf:'center', width:width/2, height:height/1.14 }}>
          <View style={{ margin: 1, padding: 1, alignItems: 'center', backgroundColor: 'white', shadowColor: '#000000', shadowOpacity: 1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 10, elevation: 5 }}>
            <PDF></PDF>
            <View style={{ flexDirection: "row", marginBottom: 5, }}>
              <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={{ alignSelf: "center" }}
              />
              <Text style={{ marginTop: 5 }}>Autorizo el tratamiento de datos</Text>
            </View>
            <TouchableOpacity disabled={!isSelected} onPress={validAutorizacion}>
              <Text style={styles.textButton}>
                Aceptar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View opacity={opacado} style={styles.container}>
        <ModalMensajes visible={visible} label={label} setVisible={setVisible} setOpacado={setOpacado}></ModalMensajes>
        <Image
          style={styles.imagen}
          source={require('../../assets/images/login_cnsr.png')}
        >
        </Image>
        <View style={{ flexDirection: 'column', marginVertical: 5 }}>
          <TextInput style={styles.textInput} onChangeText={(e) => { setValor(e) }} placeholder='Usuario' keyboardType='number-pad' maxLength={10} ></TextInput>
          <TextInput style={styles.textInput} onChangeText={(e) => { setValorPass(e) }} placeholder='Contraseña' secureTextEntry maxLength={10} ></TextInput>
          <Button label='Ingresar' onPress={enviar} disabled={false}></Button>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={styles.imagenGoogle}
                source={require('../resource/static/images/icons/logoGoogle.png')}
              >
              </Image>
              <TouchableOpacity>
                <Text style={{ marginVertical: 20, marginHorizontal: 5, color: '#0484cc', fontWeight: 'bold' }}>Ingresar con una cuenta Gmail</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  )
};
export default Welcome;