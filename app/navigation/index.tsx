/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, View, Text } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import GPSLocationScreen from '../screens/GPSLocationScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types/types';
import LinkingConfiguration from './LinkingConfiguration';
import LogoutButton from '../components/LogoutButton';
import LoggedIn from '../components/LoggedIn';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="GPSLocation" component={GPSLocationScreen} options={{ title: 'توصيل الى' }} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('GPSLocation')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <View>
                <Text style={{ fontSize: 20 }}>
                  توصيل إلى
                </Text>
                <Text>
                  موقعك الحالي
                </Text>
              </View>
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="MyOrders"
        component={MyOrdersScreen}
        options={({ navigation }: RootTabScreenProps<'MyOrders'>) => ({
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="reorder" color={color} />,
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <Pressable
                onPress={() => navigation.navigate('GPSLocation')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}>
                <View>
                  <Text style={{ fontSize: 20 }}>
                    توصيل إلى
                  </Text>
                  <Text>
                    موقعك الحالي
                  </Text>
                </View>
              </Pressable>
              <LoggedIn>
                <LogoutButton />
              </LoggedIn>
            </View>
          ),
        })}
      />
      <BottomTab.Screen
        name="Cart"
        component={CartScreen}
        options={({ navigation }: RootTabScreenProps<'Cart'>) => ({
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="opencart" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('GPSLocation')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <View>
                <Text style={{ fontSize: 20 }}>
                  توصيل إلى
                </Text>
                <Text>
                  موقعك الحالي
                </Text>
              </View>
            </Pressable>
          ),
        })}
      />

    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
