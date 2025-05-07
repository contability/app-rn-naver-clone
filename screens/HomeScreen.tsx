import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {RootStackParamList, RouteNames} from '../routes';

type Props = NativeStackScreenProps<RootStackParamList>;

const styles = StyleSheet.create({
  safearea: {flex: 1},
});

const HomeScreen = ({navigation}: Props) => {
  return (
    <SafeAreaView style={styles.safearea}>
      <WebView
        source={{uri: 'https://m.naver.com/'}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        // 웹뷰에 리퀘스트가 들어올 때 처리할지 처리안할건지 결정할 수 있다.
        // https://m.naver.com 문자열로 시작하지 않는 url은 Browser screen으로 보여줄거임
        onShouldStartLoadWithRequest={request => {
          console.log(request);

          if (
            request.url.startsWith('https://m.naver.com') ||
            // mainDocumentURL은 iOS only. 그냥 둘 다 처리 해버리자.
            request.mainDocumentURL?.startsWith('https://m.naver.com')
          )
            return true;

          if (request.url !== null && request.url.startsWith('https://')) {
            navigation.navigate(RouteNames.BROWSER);
            return false;
          }
          return true;
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
