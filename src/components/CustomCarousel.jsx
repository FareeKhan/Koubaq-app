import {
  Dimensions,
  I18nManager,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { colors } from '../constants/colors';
import { fetchBanners } from '../userServices/UserService';
const { width } = Dimensions.get('screen');
import FastImage from 'react-native-fast-image';
import { imageUrl } from '../constants/data';


const CustomCarousel = ({
  data,
  autoPlay = true,
}) => {
  const scrollOffsetValue = useSharedValue(isRtl ? -0 : 0);
  const isRtl = I18nManager.isRTL;

  const [currentIndex, setCurrentIndex] = useState(0)
  const [bannerArray, setBannerArray] = useState([]);
  const [error, setError] = useState(false);


  const bannersData = async () => {
    try {
      const result = await fetchBanners();
      console.log('isLoaderisLoaderisLoaderisLoader',result)
      if (result?.success) {
        setBannerArray(result?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    bannersData();
  }, []);


  const renderSlides = ({ item, index }) => {
    const remotePath = `${imageUrl}${item?.image}`;
    const fallbackImage = require('../assets/image1.png');
    return (
      <View style={styles.slideContainer}>
        <FastImage
          style={styles.imgBg}
          borderRadius={10}
          source={error ? fallbackImage : { uri: remotePath, priority: FastImage.priority.normal }}
          resizeMode={FastImage.resizeMode.cover}
          onError={() => setError(true)}
        />
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
        data={bannerArray}
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
        {bannerArray?.map((item, index) => (
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
