/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {  
  View,
  Text
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './Home';
import Detail from './Detail';


export const NavApp = StackNavigator({
  Home: { screen: Home },
  Detail:{ screen: Detail}
});




export default class App extends React.Component {
  render() {
    return <NavApp />;
  }
}