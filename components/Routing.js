import React from 'react';
import { StackNavigator } from 'react-navigation';
import HomeView from './HomeView';
import SecondView from './SecondView';

const Routing = StackNavigator({
        HOME: { screen: HomeView },
        SECOND: { screen: SecondView }
    },
    {
        initialRouteName: 'HOME',
        headerMode: 'none'
    });

export default Routing