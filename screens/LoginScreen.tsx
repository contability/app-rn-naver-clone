import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import {RootStackParamList} from '../routes';

const styles = StyleSheet.create({
  safearea: {flex: 1, backgroundColor: 'black'},
});

type Props = NativeStackNavigationProp<RootStackParamList>;

const LOGIN_URL = 'https://nid.naver.com/nidlogin.login';

const LoginScreen = () => {
  const navigation = useNavigation<Props>();
  return (
    <SafeAreaView style={styles.safearea}>
      <WebView
        source={{uri: LOGIN_URL}}
        onNavigationStateChange={event => {
          if (event.url === 'https://m.naver.com') navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
