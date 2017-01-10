import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Game from './ThreeGame';

import hmr from './hmr';

class App extends React.Component {
  componentDidMount() {
    this.version = 0;
    hmr.init(() => {
      console.warn('hot update');
      this.version++;
      this.forceUpdate();
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Game 
          key={this.version}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Exponent.registerRootComponent(App);
