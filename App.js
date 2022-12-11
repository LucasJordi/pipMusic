import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio,AudioMode } from 'expo-av';
import { Home } from './src/screens/home';




export default function App() {
  const [musics,setMusics]=useState([])
  const url="https://script.google.com/macros/s/AKfycby9Qmgu36hTR_BHkQF8k6S8_3NUJ-hKqM9sBi6jyffvlMvCwUcBZgKdcmz-bkW4UFxNjA/exec"
  const fetchMusics=async()=>{
    return fetch(url,{
      method:"POST",
      body:JSON.stringify({driveId:"1z8o5LSH_ZX5rm7Rl5PT2Wdg1DGxIGNWB",type:"getAll"}),
      headers:{"Content-Type":"application/json"}
    })

  }
  useEffect(()=>{
    
    fetchMusics()
    .then(data=>data.json())
    .then(data=>{
      
      setMusics(data.files)
      
    })
    .catch(e=>console.log("error",e))
  },[])
  const sound= new Audio.Sound();
  
  
  
  const startMusic=async(item)=>{
    await Audio.setAudioModeAsync({staysActiveInBackground:true})
    try{

      await sound.unloadAsync()
      
    }catch(e){
      console.log("error",e)

    }
    
    // await sound.stopAsync()
    sound.setOnPlaybackStatusUpdate((event)=>{
      // console.log(event)
      
      
    });
    await sound.loadAsync({uri:item.content},100000,false)
    
    
    await sound.playAsync();

  }
  
  return (
    <>
      <StatusBar />
      
      <Home />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
