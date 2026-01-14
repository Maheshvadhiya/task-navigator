import 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Screens from "./src/screen";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'react-native';
import { theme } from './src/constant/theme';
const App = () => {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar
            barStyle="dark-content"
            backgroundColor={theme.WHITE_COLOR}
          />
        <SafeAreaView style={{ flex: 1 }}>
          <Screens />
          <Toast />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export default App