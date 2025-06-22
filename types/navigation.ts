import { SvgProps } from 'react-native-svg';

// Bottom Tabs Params
export type TabNavigationParamList = {
  Home: undefined;
  Tickets: undefined;
  Profile: undefined;
};

// Authenticated Stack Params
export type AuthenticatedNavigatorParamList = {
  Tabs:
    | {
        screen?: keyof TabNavigationParamList;
      }
    | undefined;
  Notifications: undefined;
  Settings: undefined;
  ProfileView: undefined;
  Ticket: { id: number };
  Inventory: { id: number };
  ChangePassword: undefined;
  SpareParts: undefined;
};

// List of screens in Bottom Tabs
export interface ITabScreen {
  name: keyof TabNavigationParamList;
  component: React.ComponentType<any>;
  icon: React.ComponentType<SvgProps>;
}

// List of screens in Stack
export interface IStackSreen {
  name: keyof AuthenticatedNavigatorParamList;
  component: React.ComponentType<any>;
}

// Unauthenticated Stack Params
export type UnauthenticatedNavigatorParamList = {
  Login: undefined;
  Onboarding: undefined;
  ForgetPassword: undefined;
  ResetPassword: { token: string };
  OTP: { value: string };
  ChooseLanguage: undefined;
  Welcome: undefined;
};

// Root Stack Params
export type RootStackParamList = {
  Authenticated: undefined;
  Unauthenticated: undefined;
};
