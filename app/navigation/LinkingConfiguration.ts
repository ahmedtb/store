/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types/types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'one',
            },
          },
          MyOrders: {
            screens: {
              MyOrdersScreen: 'two',
            },
          },
          Cart: {
            screens: {
              CartScreen: 'three',
            },
          },
        },
      },
      GPSLocation: 'GPSLocation',

      NotFound: '*',
    },
  },
};

export default linking;
