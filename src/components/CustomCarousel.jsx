import {
  Dimensions,
  I18nManager,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { colors } from '../constants/colors';
const { width } = Dimensions.get('screen');

const CustomCarousel = ({
  data,
  autoPlay = true,
}) => {
  const scrollOffsetValue = useSharedValue(isRtl ? -0 : 0);
  const isRtl = I18nManager.isRTL;
const [currentIndex,setCurrentIndex] = useState(0)
  const renderSlides = ({ item, index }) => {
    return (
      <View style={styles.slideContainer}>
        <ImageBackground
          style={styles.imgBg}
          source={require('../assets/image1.png')}
          borderRadius={10}
          resizeMode="cover"
        ></ImageBackground>
      </View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        testID={'xxx'}
        loop={true}
        width={width}
        height={200}
        snapEnabled={true}
        pagingEnabled={true}
        autoPlayInterval={2000}
        data={[1, 2, 3]}
        style={{ width: width }}
        defaultScrollOffsetValue={scrollOffsetValue}
        autoPlay={autoPlay}
        containerStyle={{ marginTop: 25, marginBottom: 10 }}
        onScrollStart={() => {
          // console.log("Scroll start");
        }}
        onScrollEnd={() => {
          // console.log("Scroll end");
        }}
        renderItem={renderSlides}
        onSnapToItem={index => setCurrentIndex(index)}
      />
      <View style={styles.dotsBox}>
        {[1, 2, 3]?.map((item, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  currentIndex == index ? colors.primary : colors.gray,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default CustomCarousel;

const styles = StyleSheet.create({
  carouselContainer: {
    marginHorizontal: -20,
  },
  imgBg: {
    height: 190,
  },
  slideContainer: {
    marginHorizontal: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 50,
  },
  dotsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    alignSelf: 'center',
    marginBottom: 15,
  },
});
