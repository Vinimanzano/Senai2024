import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IndexScreen from './IndexScreen';
import explore from './explore';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#1E1E1E' },
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: '#fff',
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Início" 
        component={IndexScreen} 
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color }) => (
            <Icon name="home" type="font-awesome" color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Informações" 
        component={explore} 
        options={{
          tabBarLabel: 'Informações',
          tabBarIcon: ({ color }) => (
            <Icon name="info" type="font-awesome" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
