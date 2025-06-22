import HomeIcon from '@/assets/icons/home.svg';
import Home from '@/screens/Home';
import { ITabScreen } from '@/types/navigation';
// Bottom Tabs
export const TabScreens: ITabScreen[] = [
  {
    name: 'Home',
    component: Home,
    icon: HomeIcon,
  },
  /*  {
    name: 'Tickets',
    component: Tickets,
    icon: TicketsIcon,
  },
  {
    name: 'Profile',
    component: Profile,
    icon: ProfileIcon,
  }, */
];
