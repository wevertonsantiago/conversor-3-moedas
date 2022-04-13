import { View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Pressable, Keyboard, SafeAreaView } from 'react-native'
import React, {useEffect, useState} from 'react'
import LinearGradient from 'react-native-linear-gradient';

import api from './Api';

export default function Yuan() {
  const [realResponse, setRealResponse] = useState()
  const [yuanResponse, setYuanResponse] = useState()
  const [loading, setLoading] = useState(true)

  const [inputReal, setInputReal] = useState()
  const [inputDolar, setInputYuan] = useState()
  const [resultadoFinal,setResultadoFinal] = useState()
  const [resultadoFinalDolar,setResultadoFinalYuan] = useState()

  function valorReal(valor){
         const valorPonto = valor.replace(",",".")
          setInputReal(valorPonto)
  }

  function valorYuan(valor){
      const valorPonto = valor.replace(",",".")
      setInputYuan(valorPonto)

}

  function moedaReal(valor){
      return valor.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})
  }

  function moedaYuan(valor){
    // return valor.toLocaleString('pt-BR', {style:'currency', currency:'CNY'})
      return valor.toLocaleString('pt-BR', {minimumFractionDigits: 2,maximumFractionDigits: 2})
  }
  
  function resultado(){
      if(inputReal == null){
          alert('Por favor, digite um valor numérico.')
        }else{
            let multiplicacao = moedaReal(Number(inputReal*realResponse.ask)) 
            let valorInput = moedaYuan(Number(inputReal))
            setResultadoFinal(
                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                <Text style={{ textAlign:'center', fontSize:25,color:'#fff',fontWeight:'600'}}>
                ¥ {valorInput} é igual a 
                </Text>
                <Text style={{ textAlign:'center', fontSize:25, color:'#000', fontWeight:'bold'  }}>
                    {` ${multiplicacao}`}
                </Text>
            </View>
        )
        setInputReal(null)
       setInputYuan(null)
    }
}

function resultadoYuan(){
    if(inputDolar == null){
        alert('Por favor, digite um valor numérico.')
       }else{
    let multiplicacao = moedaYuan(Number(inputDolar*yuanResponse.ask)) 
    let valorInput = moedaReal(Number(inputDolar))
    setResultadoFinalYuan(
        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
            <Text style={{ textAlign:'center', fontSize:25,color:'#fff',fontWeight:'600'}}>
                {valorInput} é igual a 
            </Text>
            <Text style={{ textAlign:'center', fontSize:25, color:'#000', fontWeight:'bold'  }}>
                {` ¥ ${multiplicacao}`}
            </Text>
        </View>
        )
        setInputReal(null)
        setInputYuan(null)
    }
}

useEffect(()=>{
  async function realApi() {
      try{
          const response = await api.get('CNY-BRL');
          setRealResponse(response.data.CNY);
          const responseDolar = await api.get('BRL-CNY');
          setYuanResponse(responseDolar.data.BRL)
          setLoading(false)
      } catch {}
  }
  realApi()
},[inputReal,inputDolar])

useEffect(() => {
   
}, [])

  console.log('realResponse', realResponse)
if(loading){
  return(
    <LinearGradient colors={[ '#0093E9','#80D0C7']} style={{flex:1}}>
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <ActivityIndicator color='blue' size={100}/>
      </View>
    </LinearGradient>
  )
} else{
  return (
    <LinearGradient colors={[ '#0093E9','#80D0C7']} style={{flex:1}}>
    <SafeAreaView> 
     <Pressable onPress={Keyboard.dismiss} style={{height:700}}>
        <View style={styles.Container}>
          <View style={{flexDirection:'row'}} >
              <Text style={{ textAlign:'center', fontSize:22, marginTop:10, marginLeft:35,color:'#fff',fontWeight:'600'}}>
              ¥ 1,00 Yuan é igual a
                  </Text>
                  <Text style={{ textAlign:'center', fontSize:22, marginTop:10, color:'#000', fontWeight:'bold' }}>
                  {` ${moedaReal(Number(realResponse.ask))}`}
                  </Text>
          </View>
          <Text style={{marginLeft:36, marginTop:5, fontSize:12, color:'#000'}}>{realResponse.create_date}</Text>
          <View style={styles.ContainerBRL}>
              <Text style={{marginLeft:30, marginRight:10, fontSize:22,color:'#fff',fontWeight:'600'}}>¥</Text>
                  <TextInput style={styles.Input}
                  clearButtonMode="always"
                  keyboardType='numeric'
                  placeholder="2,00"
                  value={inputReal}
                  onChangeText={(valor) => valorReal(valor)  } />
          </View>
          <View style={styles.button}>
                    <TouchableOpacity onPress={resultado} >
                        <Text style={{textAlign:'center', fontSize:22, color:'#fff', fontWeight:'500'}}>Converter</Text>
                    </TouchableOpacity>
          </View>
          <View style={{marginLeft:20, marginTop:10}}>
                  {resultadoFinal}
          </View>
        </View>
        <View style={{borderWidth:1, marginHorizontal:40, marginVertical:10, borderColor:'#fff'}}></View>
        
        {/* SEGUNDO BLOCO */}
        <View style={styles.Container}>
        <View style={{flexDirection:'row'}} >
              <Text style={{ textAlign:'center', fontSize:22, marginTop:10, marginLeft:25,color:'#fff',fontWeight:'600'}}>
                  R$ 1,00 Real é igual a
                  </Text>
                  <Text style={{ textAlign:'center', fontSize:22, marginTop:10, color:'#000', fontWeight:'bold' }}>
                  {` ¥ ${moedaYuan(Number(yuanResponse.ask))}`}
                  </Text>
          </View>
          <Text style={{marginLeft:25, marginTop:5, fontSize:12, color:'#000'}}>{realResponse.create_date}</Text>
          <View style={styles.ContainerBRL}>
              <Text style={{marginLeft:20, marginRight:10, fontSize:22,color:'#fff',fontWeight:'600'}}>R$</Text>
                  <TextInput style={styles.Input}
                  clearButtonMode="always"
                  keyboardType='numeric'
                  placeholder="2,00"
                  value={inputDolar}
                  onChangeText={(valor) => valorYuan(valor) } />
          </View>
          <View style={styles.button}>
                    <TouchableOpacity onPress={resultadoYuan} >
                        <Text style={{textAlign:'center', fontSize:22, color:'#fff', fontWeight:'500'}}>Converter</Text>
                    </TouchableOpacity>
          </View>
          <View style={{marginLeft:20, marginTop:10}}>
                  {resultadoFinalDolar}
          </View>
        </View>
     </Pressable>
    </SafeAreaView> 
  </LinearGradient>
   )
 }
}

const styles = StyleSheet.create({
  ContainerBRL: {
    alignItems:'center',
    flexDirection:'row'
  },

  Container:{
    padding:10, 
    borderRadius:20, 
    marginHorizontal:10,
},
  Input: {
    color:'#fff',
    height:40,
    borderWidth:1,
    borderRadius:10,
    paddingLeft:15,
    width:'70%',
    fontSize:22,
    marginVertical:10,
  },
  button:{
  backgroundColor:'#3b5998', 
  borderRadius:10 , 
  height:40, 
  justifyContent:'center', 
  marginHorizontal:40,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    
    elevation: 12,
},
});