import { View, Text, StyleSheet } from 'react-native'
import React  from 'react'
import LinearGradient from 'react-native-linear-gradient'

// Site da biblioteca https://github.com/react-native-linear-gradient/react-native-linear-gradient
// Site da biblioteca https://www.npmjs.com/package/react-native-linear-gradient
// npm install react-native-linear-gradient --save

const ContainerGradiente = ({children}) => {
    return ( 
    <LinearGradient 
    colors={['#6d94ca', '#a8c1ef']}
    style={styles.gradient}>
        <View style={styles.container}>
            {children}
        </View>
    </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradient: {
        flex:1,
    },
    container:{
        flex:1,
        marginHorizontal: 15,
    },
});

export default ContainerGradiente;