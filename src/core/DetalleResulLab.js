import React, { useState, useEffect, Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, Alert, ScrollView } from 'react-native'
import Footer from '../components/footer/Footer'
import { Table, TableWrapper, Row, Rows, Cell, Col } from 'react-native-table-component';
import axios from 'axios'

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.20,
    backgroundColor: '#13b4ec',
  },
  containerCenter: {
    flex: 0.05,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerCenter__title: {
    fontSize: width / 25,
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
    width: width / 6,
    height: height / 12,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#B6CAF4',
  },
  textoPerfil: {
    color: '#F1F4FA',
    fontWeight: 'bold',
    marginLeft: 15,
    marginRight: 15,
    fontSize: width / 25,
  },
  textoPerfilSEcundario: {
    color: '#F1F4FA',
    marginLeft: 15,
    fontSize: width / 30,
  },
  datosPersonales: {
    alignItems: 'center',
    flexDirection: 'row',
    width: width / 1.5,
    height: height / 6,
  },
  iconos: {
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
  home: {
    width: 30,
    height: 30,
    borderRadius: 2,
  },
  containerTable: { flex: 0.68, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#13b4ec' },
  text: { margin: 6, color: '#fff' },
  textRow: { margin: 6, color: '#0D0D0E' },
  row: { flexDirection: 'row', backgroundColor: '#D6EBEC' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' },
  respuestaDet: {
    textAlign: 'center',
    marginVertical: 3,
    paddingVertical: 2,
    backgroundColor: '#13b4ec',
    color: '#fff'
  }
});



const DetalleResulLab = ({ navigation, route }) => {
  console.log("Detalle Lab Result", route.params)





  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.datosPersonales}>
            <TouchableOpacity onPress={e => (console.warn('foto'))}>
              <Image
                style={styles.imagen}
                source={require('../resource/static/images/icons/logo.png')}
              />
            </TouchableOpacity>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.textoPerfil}>{route.params.paciente}</Text>
              <Text style={styles.textoPerfilSEcundario}>Paciente {route.params.annos} Años</Text>
            </View>
          </View>
        </View>
        <View style={styles.containerCenter}>
          <View>
            <Text style={styles.containerCenter__title}>Detalle de Resultado</Text>
          </View>
        </View>
        <View style={styles.containerTable}>
          <ScrollView>
            <Text style={styles.containerCenter__title}>SERVICIO:</Text>
            <Text style={styles.respuestaDet}>{route.params.servicio}</Text>
            <Text style={styles.containerCenter__title}>FECHA DE SOLICITUD:</Text>
            <Text style={styles.respuestaDet}>{route.params.fecha_solicitud}</Text>
            <Text style={styles.containerCenter__title}>FECHA DE RESULTADOS:</Text>
            <Text style={styles.respuestaDet}>{route.params.fecha_resultado}</Text>
            <Text style={styles.containerCenter__title}>HORA DE REGISTRO:</Text>
            <Text style={styles.respuestaDet}>{route.params.hora_registro}</Text>
            <Text style={styles.containerCenter__title}>SOLICITANTE:</Text>
            <Text style={styles.respuestaDet}>{route.params.prof_solicita}</Text>
            <Text style={styles.containerCenter__title}>CODIGO DE EXAMEN:</Text>
            <Text style={styles.respuestaDet}>{route.params.examen}</Text>
            <Text style={styles.containerCenter__title}>DESCRIPCIÓN:</Text>
            <Text style={styles.respuestaDet}>{route.params.descexamen}</Text>
            <Text style={styles.containerCenter__title}>RESULTADO:</Text>
            <Text style={styles.respuestaDet}>{route.params.resultado}</Text>
            <Text style={styles.containerCenter__title}>INFORME:</Text>
            <Text style={styles.respuestaDet}>{route.params.informe_resultado}</Text>
          </ScrollView>
        </View>
        <View style={styles.containerEnd}>
          <Footer onPress={() => { navigation.navigate('Principal') }}></Footer>
        </View>
      </View>
    </>
  )
};
export default DetalleResulLab;