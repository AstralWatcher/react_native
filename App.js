import * as React from "react";
import Main from './components/MainComponent';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;

//Old
//import {View, Text, StyleSheet } from 'react-native';

//<View style={styles.container}>
//   <Text>Universal React with Expo 23</Text>
// </View>

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   }
// });
