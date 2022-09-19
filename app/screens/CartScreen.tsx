import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { bindActionCreators } from 'redux';
import { setUserNotification } from '../redux/stateActions';

function CartScreen(props: RootTabScreenProps<'Cart'> & storeState) {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/CartScreen.tsx" />
    </View>
  );
}


const mapStateToProps = (states: { state: storeState }) => {
  return {
    user: states.state.user
  }
};
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setUserNotification
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);

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
