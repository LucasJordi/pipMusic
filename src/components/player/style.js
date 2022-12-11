import { StyleSheet } from "react-native";

import { Dimensions } from 'react-native'
const width=Dimensions.get("window").width

export const styles = StyleSheet.create({
    container:{
        flex:1,
        height:"100%",
        padding:10
    },
    topBar:{
        flex:1,
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"center"
    },
    bottom:{
        flex:10,
        alignItems:"center",
    },
    fontPlaylist:{
        flex:5,
        textAlign:"center",
        fontSize:16

    },
    flex1:{
        flex:1
    },
    imageActions:{
        resizeMode:"contain",
        width:"80%",
        height:"90%",
    },
    viewPlay:{
        justifyContent:"center",
        alignItems:"center",
        flex:1,
        flexDirection:"row",
        
    },

    touchPlay:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    playerCenterBall:{
        width:width*0.8,
        height:width*0.8,
        backgroundColor:"gray",
        borderRadius:width/2
    }
})