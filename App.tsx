import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ShoppingScreen from './screens/ShoppingScreen';
import {RootStackParamList, RouteNames} from './routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BrowserScreen from './screens/BrowserScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeTab = () => (
  <Tab.Navigator>
    <Tab.Screen name={RouteNames.HOME} component={HomeScreen} />
    <Tab.Screen name={RouteNames.SHOPPING} component={ShoppingScreen} />
  </Tab.Navigator>
);

const App = () => {
  return (
    // NavigationContainer로 Providing 해주게 되면 모든 Screen에 navigation prop이 전달됨.
    <NavigationContainer>
      <Stack.Navigator>
        {/* 
            NavigationContainer 내부에 Tab.Navigator와 Stack.Navigator를 2개 공존 시킬 수 없음.
            따라서 Tab을 하나의 Stack으로 취급하는 방법을 사용.
          */}
        <Stack.Screen
          name={RouteNames.HOME_TAB}
          component={HomeTab}
          // 탭 네비게이터 상단 타이틀 숨김
          options={{headerShown: false}}
        />
        <Stack.Screen name={RouteNames.BROWSER} component={BrowserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
