import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ShoppingScreen from './screens/ShoppingScreen';
import {RootStackParamList, RouteNames} from './routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BrowserScreen from './screens/BrowserScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeIcon = ({
  focused,
  color,
  size,
}: {
  focused: boolean;
  color: string;
  size: number;
}) => {
  const iconName = focused ? 'home' : 'home-outline';
  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
};
const ShoppingIcon = ({
  focused,
  color,
  size,
}: {
  focused: boolean;
  color: string;
  size: number;
}) => {
  const iconName = focused ? 'shopping' : 'shopping-outline';
  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
};

const HomeTab = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {backgroundColor: 'black'},
      // 선택된 아이콘의 색상을 뭘로 할건지
      tabBarActiveTintColor: '#FFFFFF',
      // 선택되지 않은 아이콘의 색상을 뭘로 할건지
      tabBarInactiveTintColor: '#808080',
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500',
      },
      headerShown: false,
    }}>
    <Tab.Screen
      name={RouteNames.HOME}
      component={HomeScreen}
      options={{
        tabBarLabel: '홈',
        tabBarIcon: HomeIcon,
      }}
    />
    <Tab.Screen
      name={RouteNames.SHOPPING}
      component={ShoppingScreen}
      options={{
        tabBarLabel: '쇼핑',
        tabBarIcon: ShoppingIcon,
      }}
    />
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
          options={{headerShown: false}}
        />
        <Stack.Screen name={RouteNames.BROWSER} component={BrowserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
