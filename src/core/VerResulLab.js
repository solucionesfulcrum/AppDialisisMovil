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
    flex: 0.13,
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
    width: width / 8,
    height: height / 16,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#B6CAF4',
  },
  textoPerfil: {
    color: '#F1F4FA',
    fontWeight: 'bold',
    marginLeft: 15,
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
  containerTable: { flex: 0.75, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#13b4ec' },
  text: { margin: 6, color: '#fff' },
  textRow: { margin: 5, color: '#0D0D0E' },
  row: { flexDirection: 'row', backgroundColor: '#D6EBEC' },
  btn: { width: 58, height: 22, backgroundColor: '#13b4ec', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});



const VerResulLab = ({ navigation, route }) => {
  console.log("paciente datos lab", route.params.datosPaciente.num_doc)
  const [data, setData] = useState([]);

  const CONTENT = {
    tableHead: ['Fecha', 'Descripción', 'Resultado', 'Ver'],
    tableData: data
  };

  useEffect(() => {
    axios.post('http://147.182.226.155:8000/api/token/', {
      "username": 'cnsr',
      "password": '123456'
    })
      .then(
        (response) => {
          const auth = "Bearer " + response.data.access
          axios.get('http://147.182.226.155:8000/examenLabo/?search=' + route.params.datosPaciente.num_doc,
            {
              headers: { 'Authorization ': auth }
            }
          )
            .then(
              (res) => {
                let array = []
                for (let i = 0; i < res.data.length; i++) {
                  array.push([res.data[i].fecha_resultado, res.data[i].descexamen, res.data[i].resultado, res.data[i].url])
                }
                setData(array)
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
  }, [])

  const element = (data, index) => (
    <TouchableOpacity onPress={() => { enviar(data) }}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>Ver</Text>
      </View>
    </TouchableOpacity>
  );

  const enviar = (data) => {
    console.log('dataEnviar', data)
    axios.post('http://147.182.226.155:8000/api/token/', {
      "username": 'cnsr',
      "password": '123456'
    })
      .then(
        (response) => {
          const auth = "Bearer " + response.data.access
          axios.get('http://147.182.226.155:8000/examenLabo/' + data.split('/')[4],
            {
              headers: { 'Authorization ': auth }
            }
          )
            .then(
              (res) => {
                //console.log('respuestaDetalle',res.data)
                navigation.navigate('DetalleResulLab', res.data)
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
  };
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
              <Text style={styles.textoPerfil}>{route.params.datosPaciente.nombres + ' ' + route.params.datosPaciente.ape_pat + ' ' + route.params.datosPaciente.ape_mat}</Text>
              {route.params.datosPaciente.tipoTrata == 1 ?
                <Text style={styles.textoPerfilSEcundario}>Paciente Diálisis Peritoneal</Text> : null}
              {route.params.datosPaciente.tipoTrata == 2 ?
                <Text style={styles.textoPerfilSEcundario}>Paciente Hemodiálisis</Text>
                : null}
            </View>
          </View>
        </View>
        <View style={styles.containerCenter}>
          <View>
            <Text style={styles.containerCenter__title}>Resultado de Laboratorio</Text>
          </View>
        </View>
        <View style={styles.containerTable}>
          <ScrollView>
            {data.length != 0 ?
              <Table borderStyle={{ borderColor: 'transparent' }}>
                <Row data={CONTENT.tableHead} style={styles.head} textStyle={styles.textRow} />
                {
                  CONTENT.tableData.map((rowData, index) => (
                    <TableWrapper key={index} style={styles.row}>
                      {
                        rowData.map((cellData, cellIndex) => (
                          <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.textRow} />
                        ))
                      }
                    </TableWrapper>
                  ))
                }
              </Table> :
              <Text>no hay datos para mostrar</Text>
            }
          </ScrollView>
        </View>
        <View style={styles.containerEnd}>
          <Footer onPress={() => { navigation.navigate('Principal') }}></Footer>
        </View>
      </View>
    </>
  )
};
export default VerResulLab;