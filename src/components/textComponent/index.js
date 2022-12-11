import { Text, View } from "react-native"
import {
    useFonts,
    Inter_900Black,
    Inter_400Regular,
    Inter_100Thin,
    Inter_500Medium
} from '@expo-google-fonts/inter';





export const TextC=(props)=>{
    let [fontsLoaded] = useFonts({
        Inter_900Black,
        Inter_400Regular,
        Inter_100Thin,
        Inter_500Medium
      });

    if (!fontsLoaded) {
    return <View />;
    } else {
    return(
        <Text style={[props.style,{fontFamily:props.fontFamily? props.fontFamily:'Inter_500Medium'}]} allowFontScaling={false}>
            {props.children}
        </Text>
    )
    }
}