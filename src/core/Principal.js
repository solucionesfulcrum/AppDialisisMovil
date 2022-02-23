import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native'
import Footer from '../components/footer/Footer'


const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 0.33,
      backgroundColor: '#13b4ec',
    },
    containerCenter: {  
      flex: 0.6,
      backgroundColor: '#f2f2f2',
      alignItems: 'center',
      justifyContent: 'center',
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
      width: width/5,
      height: height/10,
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
const Profile =({navigation, route})=>{
  console.log("paciente datos",route.params)
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
                  <Text style={styles.textoPerfil}>{route.params.datosPaciente.nombres + ' ' +route.params.datosPaciente.ape_pat + ' ' +route.params.datosPaciente.ape_mat}</Text>
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
                  {route.params.datosPaciente.tipoTrata==1?
                  <TouchableOpacity style={{marginBottom: 40}} onPress={()=>{navigation.navigate('AgregarTrat', route.params.paciente)}}>
                  <View style={{flexDirection: 'row', borderWidth: 0.1, borderRadius: 5}}>
                    <View style={{backgroundColor: '#13b4ec', borderRadius: 80, marginVertical: 10, marginLeft:20}}>
                    <Image
                    source={{
                      uri: 'https://img.icons8.com/ultraviolet/40/000000/plus.png',
                    }}
                    style={styles.iconos}> 
                    </Image>
                    </View>
                    <View style={{flexDirection: "column"}}>
                    <Text style={{marginTop: 20, marginHorizontal: 20}}>AGREGAR</Text>
                    <Text style={{marginTop: 5, marginHorizontal: 20}}>Tratamiento    </Text>
                    </View>
                    <View>
                      <Image
                      source={{
                        uri: 'https://img.icons8.com/ultraviolet/40/000000/circled-chevron-right.png',
                      }}
                      style={styles.iconosEnd}> 
                      </Image>
                    </View>
                  </View>
                  </TouchableOpacity>
                  :null}
                  {route.params.datosPaciente.tipoTrata==1?
                  <TouchableOpacity onPress={()=>{navigation.navigate('Profile', route.params.paciente.split("/")[4])}}>
                  <View style={{flexDirection: 'row', borderWidth: 0.1, borderRadius: 5}}>
                    <View style={{backgroundColor: '#13b4ec', borderRadius: 80, marginVertical: 10, marginLeft:20}}>
                    <Image
                    source={{
                      uri: 'https://img.icons8.com/dusk/64/000000/transaction-list.png',
                    }}
                    style={styles.iconos}> 
                    </Image>
                    </View>
                    <View style={{flexDirection: "column"}}>
                      <Text style={{marginTop: 20, marginHorizontal: 20}}>LISTAR         </Text>
                      <Text style={{marginTop: 5, marginHorizontal: 20}}>Resultados     </Text>
                    </View>
                    <View>
                      <Image
                      source={{
                        uri: 'https://img.icons8.com/ultraviolet/40/000000/circled-chevron-right.png',
                      }}
                      style={styles.iconosEnd}> 
                      </Image>
                    </View>
                  </View>
                  </TouchableOpacity>
                  :null}
                  {route.params.datosPaciente.tipoTrata==2?
                  <TouchableOpacity style={{marginBottom: 40}} onPress={()=>{navigation.navigate('VerResulLab', route.params)}}>
                  <View style={{flexDirection: 'row', borderWidth: 0.1, borderRadius: 5}}>
                    <View style={{backgroundColor: '#13b4ec', borderRadius: 80, marginVertical: 10, marginLeft:20}}>
                    <Image
                    source={{
                      uri: 'https://img.icons8.com/ultraviolet/40/000000/plus.png',
                    }}
                    style={styles.iconos}> 
                    </Image>
                    </View>
                    <View style={{flexDirection: "column"}}>
                    <Text style={{marginTop: 20, marginHorizontal: 20}}>Resultado</Text>
                    <Text style={{marginTop: 5, marginHorizontal: 20}}>Laboratorio    </Text>
                    </View>
                    <View>
                      <Image
                      source={{
                        uri: 'https://img.icons8.com/ultraviolet/40/000000/circled-chevron-right.png',
                      }}
                      style={styles.iconosEnd}> 
                      </Image>
                    </View>
                  </View>
                  </TouchableOpacity>
                  :null}
                </View>
        </View>
          <View style={styles.containerEnd}>
              <Footer onPress={()=>{navigation.navigate('Principal')}}></Footer>
          </View>
        </View>
        </>
    )
};
export default Profile;