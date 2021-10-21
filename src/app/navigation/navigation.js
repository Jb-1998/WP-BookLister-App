import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import BookDetailScreen from '../screens/BookDetailScreen';
import BookSelectionScreen from '../screens/BookSelectionScreen';
import SearchBookScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BookSelection"
        screenOptions={({route, navigation}) => ({
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        })}>
        <Stack.Screen
          name="BookSelection"
          component={BookSelectionScreen}
          options={{
            gestureEnabled: true,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen name="BookDetails" component={BookDetailScreen} />
        <Stack.Screen name="SearchBook" component={SearchBookScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
