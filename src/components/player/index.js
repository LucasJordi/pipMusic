import { Image, Modal, TouchableOpacity, View } from "react-native"
import { TextC } from "../textComponent"
import { styles } from "./style"



export const Player=(props)=>{
    ///playing, time,action
    const progress=()=>{
        return `${(props.time?.position/props.time?.duration)*100}%`
    }
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

    return(
        <Modal
            animationType="slide"
            visible={props.playerEnable}
        >
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={{height:"80%",width:"10%",flex:1}} onPress={()=>props.setEnablePlayer()} >
                        <Image style={{resizeMode:"contain",height:"100%",width:"100%"}} source={require("../../../assets/arrow-back-outline.png")}/>
                    </TouchableOpacity>
                    <TextC style={styles.fontPlaylist}>
                        Player

                    </TextC>
                    <Image style={{resizeMode:"contain",height:"80%",width:"10%",flex:1}} source={require("../../../assets/ellipsis-horizontal-outline.png")}/>


                </View>
                <View style={styles.bottom}>
                    <View style={{flex:10}}>
                        <TextC>{props.playing?.nome}</TextC>

                    </View>



                    <View style={styles.viewPlay}>
                        <View style={{width:"90%",height:4,backgroundColor:"#bdbbbb",borderRadius:10,position:"relative",justifyContent:"center",alignItems:"flex-start"}}>
                            <View
                                style={
                                    {
                                        width:progress(),
                                        height:"100%",
                                        backgroundColor:"#22bed0"
                                    }
                                }
                            >

                            </View>
                            <View style={{position:"absolute",width:15,height:15,borderRadius:10,backgroundColor:"#22bed0",left:progress()}}>

                            </View>

                        </View>


                    </View>

                    <View style={styles.viewPlay}>
                        <TouchableOpacity style={{flex:1}}>
                            
                        
                            
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchPlay} onPress={()=>props.backForward('back')}>
                            <Image 
                                style={styles.imageActions} 
                                
                                source={require("../../../assets/play-back-outline-black.png")} 
                            />
                        
                            
                        </TouchableOpacity>
                    
                        <TouchableOpacity  style={styles.touchPlay} onPress={()=>props.playPause()}>
                            {props.action?
                                <Image 
                                    style={styles.imageActions} 
                                    source={require("../../../assets/pause-circle-outline-black.png")} 
                                />:
                                <Image 
                                    style={styles.imageActions} 
                                    source={require("../../../assets/play-circle-outline-black.png")} 
                                />
                            }


                        </TouchableOpacity>

                       
                        <TouchableOpacity style={styles.touchPlay} onPress={()=>props.backForward('forward')}>
                            <Image 
                                style={styles.imageActions}
                                
                                source={require("../../../assets/play-forward-outline-black.png")} 
                            />
                        
                            
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1}}>
                           
                        
                            
                        </TouchableOpacity>
                        

                    </View>

                </View>

            </View>

        </Modal>
    )
}