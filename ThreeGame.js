// @flow

import React from 'react';
import { PanResponder } from 'react-native';

import THREEView from './THREEView';
import World from './World';
import Rendering from './Rendering';

import hmr from './hmr';

// $FlowFixMe
module.hot.accept(() => {
  hmr.restart();
});

import {
  View,
  Text,
} from 'react-native';
import type {
  GameState,
} from './GameTypes';

type State = {
  ready: boolean,
};

let consoleWarn = null;
const noOpConsoleWarn = () => {};

export default class ThreeGame extends React.Component {
  state: State;
  gameState: GameState;
  panResponder: Function;

  static meta = {
    description: 'THREE Texture Scene',
  };

  constructor(props: Object, context: Object) {
    super(props, context);
    this.state = {
      ready: false,
    };
  }

  componentDidMount() {
    this.init();

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: this.handleTouch,
      onPanResponderRelease: this.handleRelease,
      onPanResponderTerminate: this.handleRelease,
      onShouldBlockNativeResponder: () => false,
    });

  }

  componentWillUpdate(nextProps: Object, nextState: State) {
    if (!this.state.ready && nextState.ready) {
      // suppress THREE warnings
      consoleWarn = console.warn;
      console.warn = noOpConsoleWarn;
      setTimeout(() => {
        console.warn = (consoleWarn: any);
      }, 100);
    }
  }

  handleTouch = (_: Object, gestureState: Object) => {
    if (this.state.ready) {
      const {input} = this.gameState;
      input.touching = true;
      input.touchX = gestureState.x0;
      input.touchY = gestureState.y0;
    }
  };

  handleRelease = () => {
    if (this.state.ready) {
      const {input} = this.gameState;
      input.touching = false;
    }
  };

  async init() {
    const input = {
      touching: false,
      touchX: 0,
      touchY: 0,
    };
    const world = await World.init();
    const rendering = await Rendering.init(world);

    this.gameState = {
      input,
      world,
      rendering,
    };

    this.setState({ ready: true });
  }

  tick = (dt: number) => {
    World.tick(this.gameState, dt);
    Rendering.tick(this.gameState, dt);
  };

  renderGame() {
    const {rendering} = this.gameState;

    return (
      <THREEView
        style={{
          flex: 1,
          alignSelf: 'stretch',
        }}
        {...this.panResponder.panHandlers}
        scene={rendering.scene}
        camera={rendering.camera}
        tick={this.tick}
      />
    );
  }

  render() {
    return this.state.ready ? (
      this.renderGame()
    ) : (
      <View>
        <Text>loading</Text>
      </View>
    );
  }
}
