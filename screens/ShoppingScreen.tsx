// 웹뷰에 웹 사이트 로드
// 웹 사이드 리퀘스트를 처리하여 링크를 새로운 웹뷰로 띄우기
// Pull To Refresh

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {RootStackParamList, RouteNames} from '../routes';
import {useCallback, useRef, useState} from 'react';
import React from 'react';

type Props = NativeStackScreenProps<RootStackParamList>;

const styles = StyleSheet.create({
  safearea: {flex: 1},
  contentContainerStyle: {flex: 1},
});

const SHOPPING_HOME_URL = 'https://shopping.naver.com/ns/home';

const ShoppingScreen = ({navigation}: Props) => {
  const webViewRef = useRef<WebView>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    webViewRef.current?.reload();
  }, []);

  return (
    <SafeAreaView style={styles.safearea}>
      {/* 스크롤 뷰에 바로 스타일 줘봤자 소용 없고 contentContainerStyle을 줘야 한다. */}
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        refreshControl={
          // refreshing 속성은 스피너가 돌아가는 중인지 여부 표시.
          // onRefresh 속성은 스피너가 돌아갈 때 실행되는 함수.
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }>
        <WebView
          ref={webViewRef}
          source={{uri: SHOPPING_HOME_URL}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onShouldStartLoadWithRequest={request => {
            console.log('🚀 ~ ShoppingScreen ~ request:', request);

            if (
              request.url.startsWith(SHOPPING_HOME_URL) ||
              // mainDocumentURL은 iOS only. 그냥 둘 다 처리 해버리자.
              request.mainDocumentURL?.startsWith(SHOPPING_HOME_URL)
            ) {
              // 현재 웹뷰에서 처리
              return true;
            }

            if (request.url !== null && request.url.startsWith('https://')) {
              // Browser screen으로 이동하는데 파라미터로 initialURL을 넘겨준다.
              navigation.navigate(RouteNames.BROWSER, {
                initialUrl: request.url,
              });
              // 이동 후 동작 종료
              return false;
            }
            // 그 외에는 현재 웹뷰에서 처리
            return true;
          }}
          // 웹뷰 로드 완료 후 실행되는 함수
          onLoad={() => {
            setIsRefreshing(false);
          }}
          // 로딩 스피너 돌 때 아래 웹뷰 영역이 하얗게 되는 현상이 있는데 이 renderLoading에 컴포넌트가 씌워지는거.
          // 아무것도 안주면 하얗게 되는 현상 사라짐.
          renderLoading={() => <></>}
          startInLoadingState={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShoppingScreen;
