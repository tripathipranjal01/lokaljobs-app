import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import JobsScreen from '../screens/JobsScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import JobDetailScreen from '../screens/JobDetailScreen';
import { RootStackParamList } from '../../types';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function JobsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="JobsList"
        component={JobsScreen}
        options={{ title: 'Jobs' }}
      />
      <Stack.Screen
        name="JobDetail"
        component={JobDetailScreen}
        options={{ title: 'Job Detail' }}
      />
    </Stack.Navigator>
  );
}

function BookmarksStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{ title: 'Bookmarks' }}
      />
    </Stack.Navigator>
  );
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          if (route.name === 'Jobs') {
            iconName = 'briefcase-outline';
          } else if (route.name === 'Bookmarks') {
            iconName = 'bookmark-outline';
          } else {
            iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Jobs" component={JobsStack} />
      <Tab.Screen name="Bookmarks" component={BookmarksStack} />
    </Tab.Navigator>
  );
}
