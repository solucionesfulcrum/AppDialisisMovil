import {useEffect,useState} from 'react'
import axios from 'axios'


const DpData=()=>{

   const [data, setData]=useState();

   axios.post('http://192.168.1.37:8000/api/token/',{
        "username": "Bryan",
        "password": "123456"
      })
      .then(
      (response)=>{
        console.warn(response.data.access)
        const auth="Bearer "+response.data.access
        axios.get('http://192.168.1.37:8000/dialisis_peritoneal/',
        {
          headers:{'Authorization': auth}
        }
        )
        .then(
          (res)=>{
            //console.warn('exito')
            //setData(res)
          }
        )
        .catch(
          (res)=>{
            console.warn('Error:', res)
          }
        )
      }
      )
      .catch(
        (response)=>{
         response===404 ? console.warn('lo sientimos no tenemos servicios') :console.warn('Error:' ,response)
        }
      )   
}


export default DpData;