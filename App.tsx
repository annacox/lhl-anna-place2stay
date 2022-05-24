/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Home from 'screen/Home';
import Stay from 'screen/Stay';
import Search from 'screen/Search';
import Icon from 'component/base/Icon';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const homeOptions = {
  tabBarIcon: ({color}: any) => {
    return <Icon name="home" size="large" color={color} />;
  },
};

const stayOptions = {
  tabBarIcon: ({color}: any) => {
    return <Icon name="calendar" size="large" color={color} />;
  },
};

const TabScreen: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#858585',
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={Home} options={homeOptions} />
      <Tab.Screen name="Stay" component={Stay} options={stayOptions} />
    </Tab.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tab" component={TabScreen} />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{presentation: 'modal'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
