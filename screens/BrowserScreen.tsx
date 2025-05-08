// 플랫폼 네이티브 공유 기능 구현

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity,
  Share,
} from 'react-native';
import {useState, useMemo, useRef} from 'react';
import WebView from 'react-native-webview';
import {RootStackParamList} from '../routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'Browser'>;

const styles = StyleSheet.create({
  safearea: {flex: 1, backgroundColor: 'black'},
  urlContainer: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  urlText: {
    color: 'white',
  },
  loadingBarBackground: {height: 3, backgroundColor: 'white'},
  loadingBar: {height: '100%', backgroundColor: 'green'},
  navigator: {
    backgroundColor: 'black',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 40,
    justifyContent: 'space-between',
  },
  button: {
    width: 30,
    height: 30,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  naverIconOutline: {
    borderWidth: 1,
    borderColor: 'white',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  naverIconText: {
    color: 'white',
  },
});

const NavButton = ({
  iconName,
  disabled,
  onPress,
}: {
  iconName: string;
  disabled?: boolean;
  onPress?: () => void;
}) => {
  const color = disabled ? 'gray' : 'white';
  return (
    <TouchableOpacity
      style={styles.button}
      disabled={disabled}
      onPress={onPress}>
      <MaterialCommunityIcons name={iconName} color={color} size={24} />
    </TouchableOpacity>
  );
};

// route도 App.tsx의 provider에서 넘겨주는 값이다.
const BrowserScreen = ({route, navigation}: Props) => {
  const {initialUrl} = route.params;
  const [url, setUrl] = useState(initialUrl);
  const urlTitle = useMemo(
    () => url.replace('https://', '').split('/')[0],
    [url],
  );

  const progressAnim = useRef(new Animated.Value(0)).current;
  // webview 레퍼런스
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  return (
    <SafeAreaView style={styles.safearea}>
      {/* 현재 URL 표시 */}
      <View style={styles.urlContainer}>
        <Text style={styles.urlText}>{urlTitle}</Text>
      </View>
      {/* progress loading 애니메이션 */}
      <View style={styles.loadingBarBackground}>
        <Animated.View
          style={[
            styles.loadingBar,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
      <WebView
        ref={webViewRef}
        source={{uri: initialUrl}}
        onNavigationStateChange={e => {
          setUrl(e.url);
          setCanGoBack(e.canGoBack);
          setCanGoForward(e.canGoForward);
        }}
        // 로딩 중일 때 애니메이션 노출
        onLoadProgress={event => {
          console.log(event.nativeEvent.progress);
          progressAnim.setValue(event.nativeEvent.progress);
        }}
        // 로딩이 끝났을 때
        onLoadEnd={() => {
          progressAnim.setValue(0);
        }}
      />
      {/* 푸터 네비게이션 */}
      <View style={styles.navigator}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // 뒤로 이동
            navigation.goBack();
          }}>
          <View style={styles.naverIconOutline}>
            <Text style={styles.naverIconText}>N</Text>
          </View>
        </TouchableOpacity>
        <NavButton
          iconName="arrow-left"
          onPress={() => {
            webViewRef.current?.goBack();
          }}
          disabled={!canGoBack}
        />
        <NavButton
          iconName="arrow-right"
          onPress={() => {
            webViewRef.current?.goForward();
          }}
          disabled={!canGoForward}
        />
        <NavButton
          iconName="refresh"
          onPress={() => {
            webViewRef.current?.reload();
          }}
        />
        {/* 네이티브 공유 기능 */}
        <NavButton
          iconName="share-outline"
          onPress={() => {
            Share.share({
              message: url,
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default BrowserScreen;
