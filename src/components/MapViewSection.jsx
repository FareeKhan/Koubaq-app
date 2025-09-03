import React, { useState, forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { colors } from '../constants/colors';

const MapViewSection = forwardRef(({ pickupLocation, setPickupLocation }, mapRef) => {
    const [panLoader, setPanLoader] = useState(false);

    const onRegionChange = () => {
        setPanLoader(true);
    };

    const onRegionChangeComplete = (newRegion) => {
        setPickupLocation({
            latitude: newRegion.latitude,
            longitude: newRegion.longitude,
            latitudeDelta: newRegion.latitudeDelta,
            longitudeDelta: newRegion.longitudeDelta,
        });
        setPanLoader(false);
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef} 
                style={styles.map}
                region={pickupLocation}
                onRegionChange={onRegionChange}
                onRegionChangeComplete={onRegionChangeComplete}
            />
            <View style={styles.markerContainer}>
                <Fontisto name="map-marker-alt" size={30} color={colors.red} />
            </View>
        </View>
    );
});

export default MapViewSection;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 220,
        marginBottom: 20,
        borderRadius: 20,
        marginTop: 10,
        overflow: 'hidden',
    },
    map: {
        width: '100%',
        height: 220,
    },
    markerContainer: {
        position: 'absolute',
        zIndex: 1000,
        bottom: '45%',
        left: '42%',
        height: 45,
        width: 45,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
