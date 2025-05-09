import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import {RootStackParamList} from '../routes';
import {useContext} from 'react';
import {WebViewContext} from '../components/WebViewProvider';

const styles = StyleSheet.create({
  safearea: {flex: 1, backgroundColor: 'black'},
});

type Props = NativeStackNavigationProp<RootStackParamList>;

const LOGIN_URL = 'https://nid.naver.com/nidlogin.login';

const LoginScreen = () => {
  const navigation = useNavigation<Props>();
  const context = useContext(WebViewContext);

  // useEffect(() => {
  //   console.log(context?.webViewRefs.current);
  // }, [context]);
  return (
    <SafeAreaView style={styles.safearea}>
      <WebView
        source={{uri: LOGIN_URL}}
        onNavigationStateChange={event => {
          if (event.url === 'https://m.naver.com/') {
            // 로그인 후에 그냥 goBack을 해주게 되면 로그인은 되었지만 이전 화면을 그대로 가져오기 때문에 state 갱신이 안된 스크린을 보게 됨.
            // webView context에 등록된 스크린들 모두 reload 후에 goback 적용.
            context?.webViewRefs.current.forEach(webView => {
              webView.reload();
            });
            navigation.goBack();
          }
        }}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
