// navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EntriesScreen from '../EntriesScreen';
import CreateEntryScreen from '../CreateEntryScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Create Entry" 
        component={CreateEntryScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Entries" 
        component={EntriesScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;































































































// CRIADO POR VINÍCIUS MANZANO, COPIA NAO!