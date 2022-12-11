import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      position:"relative"
    },
    header:{
        width:"100%",
        height:150,
        justifyContent:"space-around",
        alignItems:"center",
        flexDirection:"row"
    },
    divMusic:{
        width:"100%",
        height:100,
        padding:10,
        justifyContent:"center",
        alignItems:"center"
    },
    musicT:{
        width:"100%",
        height:"100%",
        padding:15,
        flexDirection:"row",
        borderRadius:20,
        backgroundColor:"#fcfcfc"
    },
    flex1:{
        flex:1
    },
    flexM:{
        flex:5,
        flexDirection:"column"
    },
    flexP:{
        flex:1.5,
        flexDirection:"column"
    },
    
    fontDuration:{
        fontSize:10,
        fontFamily:"Inter_400Regular"
    },
    fontPlaylist:{
        fontSize:16
    },
    floatMusic:{
        position:"absolute",
        backgroundColor:"#22bed0",
        width:"90%",
        height:120,
        bottom:10,
        borderRadius:25,
        zIndex:999999,
        flexDirection:"row",
        padding:20


    },
    textPlay:{
        color:"white",
        fontSize:18

    },
    textPlay2:{
        color:"white",
        fontSize:10

    },
    footer:{
        width:"90%",
        height:120,
    }
  });