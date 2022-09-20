import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { RootTabScreenProps } from '../types/types';
import { bindActionCreators } from 'redux';
import { setUserNotification } from '../redux/stateActions';
import { Text, View } from 'react-native'

function CartScreen(props: RootTabScreenProps<'Cart'> & storeState) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator}  />
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
