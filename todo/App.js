import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { gStyle } from "./src/styles/style";
import * as Font from "expo-font";
import MainStack from "./navigate";

const loadFonts = async () => {
  await Font.loadAsync({
    'poppins-b': require('./assets/fonts/Poppins-Black.ttf'),
    'poppins-placeholder': require('./assets/fonts/Poppins-ExtraLight.ttf'),
    'poppins-l': require('./assets/fonts/Poppins-Light.ttf')
  });
}

export default function App () {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFontsAsync = async () => {
      try {
        // await SplashScreen.preventAutoHideAsync();
        await loadFonts();
        setFontsLoaded(true);
        // await SplashScreen.hideAsync();
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    };

    loadFontsAsync();
  }, []);

  // if (fontsLoaded) {
  return (
          <SafeAreaView style={gStyle.background}>
            {/*<AuthProvider>*/}

              <MainStack/>
            {/*</AuthProvider>*/}
          </SafeAreaView>
  );
  // } else {
  //   return (
  //       <View style={[styles.container1, styles.horizontal]}>
  //         <Text>Loading...</Text>
  //         <ActivityIndicator size="large" color="#white" />
  //       </View>

  // )
  // }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
