import { StyleSheet, Text, View } from 'react-native'
import CustomText from './CustomText'
import { colors } from '../constants/colors'

const Subtitle = ({style,children,smallFont}) => {
  return (
  <CustomText style={[{fontSize:12,color:colors.gray1},smallFont && {fontSize:11},style]}>{children}</CustomText>
  )
}

export default Subtitle

const styles = StyleSheet.create({})