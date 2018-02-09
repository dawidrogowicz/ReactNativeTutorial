import React from 'react';
import { StyleSheet, View } from 'react-native';
import HomeView from './components/HomeView';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <HomeView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
