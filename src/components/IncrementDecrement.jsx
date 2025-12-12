// import { I18nManager, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React, { useState } from 'react';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { colors } from '../constants/colors';
// import CustomText from './CustomText';

// const IncrementDecrement = ({ style,onpressPlus ,onpressMinu,pCounter}) => {

//   const [counter,setCounter] = useState(1)


//   const incrementCounter = () => setCounter(counter + 1);
//   const decrementCounter = () => {
//     if (counter > 1) setCounter(counter - 1);
//   };


//   return (
//     <View style={[styles.counterContainer, style]}>
//       <TouchableOpacity onPress={ onpressMinu? onpressMinu : decrementCounter}>
//         <AntDesign name={'minus'} size={20} color={colors.black} />
//       </TouchableOpacity>
//       <CustomText>{pCounter?pCounter : counter}</CustomText>
//       <TouchableOpacity onPress={onpressPlus ? onpressPlus :incrementCounter}>
//         <AntDesign name={'plus'} size={20} color={colors.black} />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default IncrementDecrement;

// const styles = StyleSheet.create({
//   counterContainer: {
//     flexDirection: I18nManager.isRTL ? 'row-reverse': 'row',
//     alignItems: 'center',
//     gap: 5,
//     borderWidth: 1,
//     paddingHorizontal: 10,
//     borderRadius: 10,
//     borderColor: colors.gray,
//   },
// });



import {
  I18nManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../constants/colors';
import CustomText from './CustomText';
import { decrementCounter, incrementCounter } from '../redux/ProductAddToCart';
import { useDispatch } from 'react-redux';

const IncrementDecrement = ({
  style,
  onpressPlus,
  onpressMinu,
  pCounter,
  firstBox,
  item
}) => {
  const dispatch = useDispatch()
  const [counter, setCounter] = useState(1);

  const incrementCounters = () => setCounter(counter + 1);
  const decrementCounters = () => {
    if (counter > 1) setCounter(counter - 1);
  };


  const handleDecrement = (id) => {
    dispatch(decrementCounter(id))
  }

  if (firstBox) {
    return (
      <View
        style={[
          styles.counterContainer,
          {
            backgroundColor: colors.white,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.2,
            shadowRadius: 4.65,
            borderWidth: 0,
            elevation: 7,
          },
          style,
        ]}
      >
        <TouchableOpacity
          onPress={onpressMinu ? onpressMinu : decrementCounters}
        >
          <AntDesign name={'minus'} size={20} color={colors.black} />
        </TouchableOpacity>
        <CustomText>{pCounter ? pCounter : counter}</CustomText>
        <TouchableOpacity
          onPress={onpressPlus ? onpressPlus : incrementCounters}
        >
          <AntDesign name={'plus'} size={20} color={colors.black} />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={[styles.counterContainer, style]}>
        <TouchableOpacity
          // onPress={() => dispatch(decrementCounter(item?.id))}
          onPress={() => handleDecrement(item?.id)}

        >
          <AntDesign name={'minus'} size={20} color={colors.black} />
        </TouchableOpacity>
        <CustomText>{item?.counter}</CustomText>
        <TouchableOpacity
          onPress={() => dispatch(incrementCounter(item?.id))}
        >
          <AntDesign name={'plus'} size={20} color={colors.black} />
        </TouchableOpacity>
      </View>
    );
  }
};

export default IncrementDecrement;

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: colors.gray,
  },
});
