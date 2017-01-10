import React from 'react';
import { Components } from 'exponent';
import {
  View,
  Text,
} from 'react-native';

const { Svg } = Components;

export default class Game extends React.Component {
  render() {
    return (
      <Svg
        height={400}
        width={400}
      >
        <Svg.Image
          x={10}
          y={-10}
          width={50}
          height={50}
          href={require('./images/straight.png')}
        />
        <Svg.Image
          x={0}
          y={10}
          width={50}
          height={50}
          href={require('./images/curve.png')}
        />
      </Svg>
    );
  }
}
