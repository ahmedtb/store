import { StyleSheet } from 'react-native';

import { Text, View } from 'react-native';
import AuthWrapper from '../components/AuthWrapper';


export default function MyOrdersScreen() {

  return (
    <AuthWrapper>
      {/* <View style={styles.container}> */}
        <Text style={styles.title}>Tab Two</Text>
        {/* <View style={styles.separator} /> */}
      {/* </View> */}
    </AuthWrapper>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
