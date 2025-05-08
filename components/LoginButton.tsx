import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackParamList, RouteNames} from '../routes';

// const styles = StyleSheet.create({
//   safearea: {flex: 1}
// })

type Props = NativeStackNavigationProp<RootStackParamList>;

const LoginButton = () => {
  const navigation = useNavigation<Props>();

  const isLoggedIn = false;
  const iconName = isLoggedIn ? 'logout' : 'login';

  const onPressLogin = useCallback(() => {
    navigation.navigate(RouteNames.LOGIN);
  }, [navigation]);

  const onPressLogout = useCallback(() => {}, []);
  return (
    <TouchableOpacity onPress={isLoggedIn ? onPressLogout : onPressLogin}>
      <MaterialCommunityIcons name={iconName} color="white" size={24} />
    </TouchableOpacity>
  );
};

export default LoginButton;
