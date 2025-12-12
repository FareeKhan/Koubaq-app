import React, { useState } from 'react';
import { ActivityIndicator, View, StyleSheet, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import { colors } from '../constants/colors';

const RemoteImage = ({ uri, style, resizeMode = 'cover',isBorder =true }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const fallback = require('../assets/cup.png')

    return (
        <View style={[styles.container, style]}>
            {loading && (
                <ActivityIndicator
                    size="small"
                    color={colors.primary}
                    style={styles.loader}
                />
            )}

            <FastImage
                style={[isBorder && styles.borderstyle, style]}
                source={
                    false || !uri
                        ? fallback
                        : { uri, priority: FastImage.priority.normal }
                }
                resizeMode={resizeMode}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                onError={() => {
                    setError(true);
                    setLoading(false);
                }}
            />
        </View>
    );
};

export default RemoteImage;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    loader: {
        position: 'absolute',
        zIndex: 2,
    },
    borderstyle: {
        borderWidth: 0.3, borderRadius: 8, borderColor: colors.gray9
    }
});
