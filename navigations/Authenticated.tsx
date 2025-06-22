import { StackScreens } from '@/static/StackScreens';
import { AuthenticatedNavigatorParamList } from '@/types/navigation';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<AuthenticatedNavigatorParamList>();

const Authenticated: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='Tabs'
    >
      {StackScreens.map((screen, index) => (
        <Stack.Screen
          key={index}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default Authenticated;
