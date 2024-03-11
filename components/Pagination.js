import { StyleSheet, View, Animated, Dimensions } from 'react-native'
import React from 'react'

const { width } = Dimensions.get('window');

const Pagination = ({data, scrollX, color}) => {
  return (
    <View style={styles.container}>
      {
        data.map((item, index) =>{
            const inputRange = [(index-1)*width, index*width, 
                (index+1)*width]

            const indicatorWidth = scrollX.interpolate({
                inputRange,
                outputRange : [12, 30, 12],
                extrapolate: 'clamp'
            })
            return <Animated.View key={index.toString()} 
            style={[{...styles.indicator, backgroundColor: color}, {width: indicatorWidth}]}
            />
        })
      }
    </View>
  )
};

export default Pagination

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 12
    },

    indicator: {
        width: 10,
        height: 10,
        borderRadius: 6,
        marginHorizontal: 3
    }
})