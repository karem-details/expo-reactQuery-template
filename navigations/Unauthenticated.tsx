import Welcome from '@/screens/Welcome';
import { UnauthenticatedNavigatorParamList } from '@/types/navigation';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<UnauthenticatedNavigatorParamList>();

const Unauthenticated: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'Welcome'}
    >
      <Stack.Screen name='Welcome' component={Welcome} />
    </Stack.Navigator>
  );
};

export default Unauthenticated;
