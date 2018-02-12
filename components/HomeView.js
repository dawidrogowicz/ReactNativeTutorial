import React, { PureComponent } from 'react';
import { Text, StyleSheet, Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class HomeView extends PureComponent {
    switchPage = () => this.props.navigation.navigate('SECOND');

    render() {
        const { state } = this.props.navigation;
        const { params } = state;
        const name = (params && params.name.length > 0) ? params.name : 'Stranger';
        const message = `Hello ${name}!`;

        return (
            <LinearGradient colors={['#650aff', '#f4a']} style={styles.container} >
                <Text style={styles.text}>
                    { message }
                </Text>
                <Button onPress={this.switchPage} title={'Next screen'} />
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        paddingBottom: 14,
        color: '#fff',
        fontSize: 24,
    }
});

export default HomeView