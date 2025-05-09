import {
  createContext,
  MutableRefObject,
  ReactNode,
  useCallback,
  useRef,
} from 'react';
import WebView from 'react-native-webview';

interface WebViewContextType {
  /** webview 참조 목록 */
  webViewRefs: MutableRefObject<WebView[]>;
  /** webview 추가 */
  addWebView: (webView: WebView) => void;
}

const WebViewContext = createContext<WebViewContextType | undefined>(undefined);

const WebViewProvider = ({children}: {children: ReactNode}) => {
  const webViewRefs = useRef<WebView[]>([]);
  const addWebView = useCallback((webView: WebView) => {
    webViewRefs.current.push(webView);
  }, []);

  return (
    // 이 프로바이더 아래 children들은 webViewRefs, addWebView를 사용할 수 있게 됨.
    <WebViewContext.Provider value={{webViewRefs, addWebView}}>
      {children}
    </WebViewContext.Provider>
  );
};

export {WebViewContext, WebViewProvider};
