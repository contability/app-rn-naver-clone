import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackParamList, RouteNames} from '../routes';
import CookieManager from '@react-native-cookies/cookies';
import {WebViewContext} from './WebViewProvider';

// const styles = StyleSheet.create({
//   safearea: {flex: 1}
// })

type Props = NativeStackNavigationProp<RootStackParamList>;

const LoginButton = () => {
  const context = useContext(WebViewContext);
  const navigation = useNavigation<Props>();
  const isFocused = useIsFocused();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const iconName = isLoggedIn ? 'logout' : 'login';
  console.log('🚀 ~ LoginButton ~ isLoggedIn:', isLoggedIn);

  const onPressLogin = useCallback(() => {
    navigation.navigate(RouteNames.LOGIN);
  }, [navigation]);

  const onPressLogout = useCallback(async () => {
    await CookieManager.clearAll(true);
    setIsLoggedIn(false);
    if (context?.webViewRefs.current != null) {
      context?.webViewRefs.current.forEach(webView => {
        webView.reload();
      });
    }
  }, [context?.webViewRefs]);

  useEffect(() => {
    if (isFocused) {
      // CookieManager.get 메서드의 파라미터:
      // param1. 쿠키를 가져올 URL 도메인 (문자열)
      // param2. 모든 사용 가능한 쿠키 속성을 가져올지 여부 (boolean, true면 모든 속성 포함)
      CookieManager.get('https://.naver.com/', true).then(cookie => {
        if (cookie.NID_SES) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
    }
  }, [isFocused]);
  return (
    <TouchableOpacity onPress={isLoggedIn ? onPressLogout : onPressLogin}>
      <MaterialCommunityIcons name={iconName} color="white" size={24} />
    </TouchableOpacity>
  );
};

export default LoginButton;
