import { Animated, FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./style"
import * as DriveService from "../../services/drive.service"
import { useEffect, useRef, useState } from "react"
import { Audio } from "expo-av"
import { TextC } from "../../components/textComponent"
import { Player } from "../../components/player"


export const Home=()=>{
    const [musics,setMusics]=useState([])
    const [enablePlayer,setEnablePlayer]=useState(false)
    const [replay,setReplay]=useState(false)
    const rotateAnim = useRef(new Animated.Value(45)).current
    const spin = rotateAnim.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg']
      })
    const [sound,setSound]= useState(new Audio.Sound())
    const [playing,setPlaying]=useState(null)
    const [action,setAction]=useState("play")
    const [time,setTime]=useState({position:0,duration:0})
    

    const startMusic=async(item)=>{
        if(item.content===playing?.content){
            return false
        }
        await Audio.setAudioModeAsync({staysActiveInBackground:true})
        try{
    
          await sound.unloadAsync()
          
        }catch(e){
          console.log("error",e)
    
        }
        
        // await sound.stopAsync()
        sound.setOnPlaybackStatusUpdate((event)=>{
          setTime({position:!event.positionMillis? 0:event.positionMillis,duration:!event.durationMillis?0:event.durationMillis})
          setAction(event.isPlaying)
          console.log(event)
          if(event.positionMillis===event.durationMillis&&event.positionMillis>0){
            console.log("terminou")
            setTimeout(()=>{
                backForward("forward")

            },1000)
            
            

          }
          
          
        });
        await sound.loadAsync({uri:item.content},0,true)
        
        
        
        await sound.playAsync();
        setPlaying(item)
        setAction(true)
    
    }
    const playPause= async()=>{
        if(action){
            await sound.pauseAsync();
            
        }else{
            if(time.duration===time.position){
                return startMusic(playing)
            }
            await sound.playAsync();
            
        }
    }
    const pressMenu=()=>{
        rotateAnim.setValue(45)
        Animated.timing(
            rotateAnim,
            {
              toValue: 225,
              duration: 500,
              useNativeDriver: true 
            }
        ).start();
        
    }

    useEffect(()=>{        
    
        DriveService.fetchMusics()
        .then(data=>data.json())
        .then(data=>{
          
          setMusics(data.files.filter(element=> element.format==='audio/mpeg'||element.format==='audio/x-wav'))
          
        })
        .catch(e=>console.log("error",e))
      },[])
    const formatTime=(time)=>{
        const tt=time/60000
        const tt2=(time%60000)/1000
        const minute=tt.toFixed(0)<10? "0"+tt.toFixed(0):tt.toFixed(0)
        const secs=tt2.toFixed(0)<10? "0"+tt2.toFixed(0):tt2.toFixed(0)
        if (minute===NaN|| secs===NaN) {
            return "00:00"
        }
        return `${minute}:${secs}`

    }
    const backForward=(type)=>{
        const findI=(element)=> element.content===playing?.content
        const index=musics.findIndex(findI);
        console.log(playing)
        
        if(type==='forward'){
            if(index>=(musics.length-1)){

            }else{
                startMusic(musics[index+1])

            }


        }else{
            if(index<=0){

            }else{
                startMusic(musics[index-1])

            }

        }
    }

    return(
        <View style={styles.container}>
            <Player 
                playerEnable={enablePlayer} 
                setEnablePlayer={()=>setEnablePlayer(!enablePlayer)}
                action={action}
                playing={playing}
                backForward={(type)=>{
                    backForward(type)
                    console.log(type)
                }}
                time={time}
                playPause={()=>playPause()}
            >

            </Player>
            {playing!=null&& <View style={styles.floatMusic}>
                <TouchableOpacity style={[styles.flexP]} onPress={()=>setEnablePlayer(true)}>
                    <TextC fontFamily={"Inter_500Medium"} style={styles.textPlay}>
                        {playing.nome}
                    </TextC>
                    <TextC style={styles.textPlay2} fontFamily={"Inter_400Regular"}>
                        {formatTime(time.position)}
                    </TextC>

                </TouchableOpacity>
                <View style={[styles.flex1,{flexDirection:"row"}]}>
                    <TouchableOpacity style={{flex:1}} onPress={()=>backForward('back')}>
                        <Image 
                            style={{resizeMode:"contain",width:"100%",height:"90%"}} 
                            source={require("../../../assets/play-back-outline.png")} 
                        />
                    
                        
                    </TouchableOpacity>
                
                    <TouchableOpacity onPress={()=>playPause()} style={{flex:1}}>
                        {action?
                            <Image 
                                style={{resizeMode:"contain",width:"100%",height:"90%"}} 
                                source={require("../../../assets/pause-circle-outline.png")} 
                            />:
                            <Image 
                                style={{resizeMode:"contain",width:"100%",height:"90%"}} 
                                source={require("../../../assets/play-circle-outline.png")} 
                            />
                        }


                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}} onPress={()=>backForward('forward')}>
                        <Image 
                            style={{resizeMode:"contain",width:"100%",height:"90%"}} 
                            source={require("../../../assets/play-forward-outline.png")} 
                        />
                    
                        
                    </TouchableOpacity>
                    

                </View>

            </View>}
            
            <FlatList
                ListHeaderComponent={
                    <>

                        <View style={styles.header}>
                            <TouchableOpacity style={{height:"80%",width:"10%"}} onPress={()=>pressMenu()}>
                                <Animated.Image style={{resizeMode:"contain",height:"100%",width:"100%",transform:[{ rotate: spin }]}} source={require("../../../assets/grid-outline.png")}/>
                            </TouchableOpacity>
                            <TextC style={styles.fontPlaylist}>
                                Minha playlist

                            </TextC>
                            <Image style={{resizeMode:"contain",height:"80%",width:"10%"}} source={require("../../../assets/search-outline.png")}/>

                            

                        </View>

                    </>
                }
                ListFooterComponent={
                    <>
                        <View style={styles.footer}>

                        </View>
                        
                    </>
                }
                style={{width:"100%",height:"100%"}}
                data={musics}
                renderItem={({item})=>(
                    <TouchableOpacity style={styles.divMusic} >  
                        <View style={styles.musicT}>
                            <TouchableOpacity style={styles.flex1} onPress={()=>startMusic(item)}>
                                <Image  style={{resizeMode:"contain",height:"60%",width:"70%"}} source={require("../../../assets/musical-notes-outline.png")}/>

                            </TouchableOpacity>
                            <TouchableOpacity style={styles.flexM} onPress={()=>startMusic(item)}>
                                <TextC fontFamily={"Inter_500Medium"}>
                                    {item.nome}
                                </TextC>
                                <TextC style={styles.fontDuration} fontFamily={"Inter_400Regular"}>
                                    {"05:00"}
                                </TextC>

                            </TouchableOpacity>
                            <TouchableOpacity style={styles.flex1}>
                                <Image  style={{resizeMode:"contain",height:"80%",width:"70%"}} source={require("../../../assets/ellipsis-horizontal-outline.png")}/>

                            

                            </TouchableOpacity>

                        </View>

                    </TouchableOpacity>
                )}

            />
        </View>
    )
}