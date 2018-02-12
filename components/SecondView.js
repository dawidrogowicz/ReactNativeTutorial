import React, { PureComponent } from 'react';
import { TextInput, StyleSheet, Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class SecondView extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
        }
    }

    switchPage = () => this.props.navigation.navigate('HOME', { name: this.state.name });

    onChangeTextHandler = val => this.setState({name: val});

    render() {
        const { name } = this.state;

        return (
            <LinearGradient colors={['#4ff', '#f4a']} style={styles.container} >
                <TextInput
                    style={styles.input}
                    value={name}
                    placeholder={'Type your name'}
                    onChangeText={this.onChangeTextHandler}
                />
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
    input: {
        minWidth: 200,
        paddingBottom: 14,
        color: '#fff',
        fontSize: 24,
    }
});

export default SecondView