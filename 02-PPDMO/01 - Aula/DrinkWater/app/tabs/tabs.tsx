import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IndexScreen from './IndexScreen';
import ExploreScreen from './explore';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const Tabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          if (route.name === 'Início') {
            iconName = 'home';
          } else if (route.name === 'Informações') {
            iconName = 'search';
          }

          return <Icon name={iconName} color={color} size={size} />;
        },
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
