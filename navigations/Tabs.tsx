import PrimaryText from '@/components/Text/PrimaryText';
import { Colors } from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { TabScreens } from '@/static/TabsScreens';
import { TabNavigationParamList } from '@/types/navigation';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Platform, Pressable } from 'react-native';

const Tab = createBottomTabNavigator<TabNavigationParamList>();
type ScreenOptionType =
  | ((props: {
      route: RouteProp<TabNavigationParamList, keyof TabNavigationParamList>;
    }) => BottomTabNavigationOptions)
  | undefined;

// Tab Screen Options
const screenOptions: ScreenOptionType = ({
  route,
}): BottomTabNavigationOptions => {
  const { t } = useTranslation();

  return {
    tabBarIcon: ({ color, size, focused }) => {
      const { icon: Icon, name } = TabScreens.find(
        (screen) => screen.name === route.name
      )!;
      return <Icon color={focused ? Colors.primary : '#bbb'} />;
    },
    tabBarActiveTintColor: Colors.primary,
    tabBarInactiveTintColor: '#bbb',
    headerShown: false,
    tabBarLabelStyle: { fontSize: 9, fontFamily: Fonts.Bold },
    tabBarButton: (props) => (
      <Pressable
        {...props}
        style={[
          props.style,
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
        android_ripple={{ color: 'transparent' }}
      />
    ),
    tabBarLabel: ({ focused, color }) => {
      return (
        <PrimaryText
          text={t(`screens.${route.name}.title`)}
          fontSize={9}
          color={focused ? Colors.primary : undefined}
        />
      );
    },
    tabBarStyle: {
      backgroundColor: '#F6F6F6',
      borderTopWidth: 1,
      elevation: 0,
      borderColor: 'rgba(0, 0, 0, 0.08)',
      height: Platform.OS === 'ios' ? 90 : 72,
      paddingTop: Platform.OS === 'ios' ? 8 : 0,
    },
  };
};

const Tabs: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName='Home'>
      {TabScreens.map((screen, index) => (
        <Tab.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={{ title: screen.name }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default Tabs;
