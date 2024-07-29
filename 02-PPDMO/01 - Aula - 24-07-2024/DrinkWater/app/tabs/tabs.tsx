import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IndexScreen from './IndexScreen';
import ExploreScreen from './explore';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const getIconName = (routeName: string) => {
  switch (routeName) {
    case 'Início':
      return 'home';
    case 'Informações':
      return 'search';
    default:
      return '';
  }
};

const Tabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <Icon name={getIconName(route.name)} color={color} size={size} />
        ),
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: '#ffffff',
      })}
    >
      <Tab.Screen name="Início" component={IndexScreen} />
      <Tab.Screen name="Informações" component={ExploreScreen} />
    </Tab.Navigator>
  );
};

export default Tabs;