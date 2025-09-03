import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DividerLine from './DividerLine';
import CustomText from './CustomText';
import IncrementDecrement from './IncrementDecrement';
import { currency } from '../constants/data';

  const CartProducts = () => {
    return (
      <View style={styles.cartContainer}>
        <FlatList
          data={[1, 2, 3, 4]}
          contentContainerStyle={styles.cartContent}
          keyExtractor={item => item?.toString()}
          scrollEnabled={false}
          ItemSeparatorComponent={
            <DividerLine style={styles.itemSeparator} h={true} />
          }
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <View style={styles.itemInfo}>
                <CustomText>Espresso single shot ethiopian beans</CustomText>
                <View style={styles.priceRow}>
                  <CustomText>{currency} 30.33</CustomText>
                  <IncrementDecrement style={styles.incrementer} />
                </View>
              </View>
              <Image
                source={require('../assets/cup.png')}
                style={styles.productImage}
                borderRadius={10}
              />
            </View>
          )}
        />
      </View>
    );
  };


export default CartProducts

const styles = StyleSheet.create({
     cartContainer: {},
      cartContent: {
        paddingHorizontal: 20,
        marginTop: 40,
      },
      itemSeparator: {
        marginVertical: 15,
      },
      cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      itemInfo: {
        gap: 12,
      },
      priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
      },
      incrementer: {
        borderWidth: 0,
        gap: 25,
      },
      productImage: {
        width: 62,
        height: 60,
        borderRadius: 10,
      },
})