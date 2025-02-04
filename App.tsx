import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/page/Home';
import Calendar from './src/page/Calendar';
import Library from './src/page/Library';
import Mypage from './src/page/Mypage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomTab = createBottomTabNavigator();

// 아이콘
const renderTabIcon = (name: string, focused: boolean) => {
  return (
    <Ionicons
      name={focused ? name : `${name}-outline`}
      size={25}
      color="black"
    />
  );
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator screenOptions={{headerShown: false}}>
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => renderTabIcon('home', focused),
            tabBarLabelStyle: {color: 'black'},
          }}
        />
        <BottomTab.Screen
          name="Calendar"
          component={Calendar}
          options={{
            tabBarIcon: ({focused}) => renderTabIcon('calendar', focused),
            tabBarLabelStyle: {color: 'black'},
          }}
        />
        <BottomTab.Screen
          name="Library"
          component={Library}
          options={{
            tabBarIcon: ({focused}) => renderTabIcon('barbell', focused),
            tabBarLabelStyle: {color: 'black'},
          }}
        />
        <BottomTab.Screen
          name="MyPage"
          component={Mypage}
          options={{
            tabBarIcon: ({focused}) => renderTabIcon('person', focused),
            tabBarLabelStyle: {color: 'black'},
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default App;
