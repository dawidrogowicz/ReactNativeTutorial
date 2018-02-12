import React from 'react';
import { StyleSheet, View } from 'react-native';
import Routing from './components/Routing';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Routing />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
