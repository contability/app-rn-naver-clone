export const RouteNames = {
  HOME_TAB: 'home-tab' as const,
  HOME: 'Home' as const,
  SHOPPING: 'Shopping' as const,
  BROWSER: 'Browser' as const,
  LOGIN: 'Login' as const,
};

export type RootStackParamList = {
  [RouteNames.HOME_TAB]: undefined;
  [RouteNames.BROWSER]: {initialUrl: string};
  [RouteNames.LOGIN]: undefined;
};
