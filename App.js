import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { useEffect, useRef, useState } from "react";
import { BackHandler } from "react-native";

export default function App() {
  const webview = useRef();
  const [navState, setNavState] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("https://seriesbox.netlify.app");

  const onAndroidBackPress = () => {
    if (webview.current) {
      if (!navState?.canGoBack) {
        exitTimer += 1;
        if (exitTimer === 1) {
          onBackToast();
        }
        if (exitTimer === 1) {
          setTimeout(() => (exitTimer = 0), 2000);
        } else if (exitTimer === 2) {
          BackHandler.exitApp();
          return false;
        }
      } else {
        if (navState) {
          webview.current.goBack();
        } else {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  };

  //react native android quit to press backbutton twice
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onAndroidBackPress);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onAndroidBackPress);
  }, [navState]);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          source={{ uri: currentUrl }}
          onNavigationStateChange={setNavState}
          ref={webview}
          onLoad={(props) => setNavState(props.nativeEvent)}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
