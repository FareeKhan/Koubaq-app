import { StyleSheet } from 'react-native'
import { Toast } from 'react-native-toast-notifications'
import { fonts } from '../constants/fonts'

const CustomToast = (text,type,placement) => {
  Toast.show(text,{
    type:type|| "normal",
    placement: placement|| "bottom",
    duration: 4000,
    offset: 30,
    animationType:"slide-in",
    textStyle:{fontFamily:fonts.regular,zIndex:100},
    style:{zIndex:100}
  })
}

export default CustomToast

const styles = StyleSheet.create({})