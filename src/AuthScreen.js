import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Text,
  TextInput,
  Title,
  withTheme } from 'react-native-paper';
import type { Theme } from 'react-native-paper/types';

type Props = {
  theme: Theme,
};

class AuthScreen extends React.Component<Props> {
  static navigationOptions = {
    header: null
  }

  render() {
    const {
      theme: {
        colors: { background },
      },
    } = this.props;
    return (
      <View
        style={[styles.container, { backgroundColor: background }]}
      >
        <Title style={styles.title}>Login</Title>
        <Text style={styles.title}>
          Please enter your credentials
        </Text>

        <TextInput
          mode="outlined"
          style={styles.inputContainerStyle}
          label="Email"
          placeholder="example@gmail.com"
        />

        <TextInput
          mode="outlined"
          style={styles.inputContainerStyle}
          label="Password"
          placeholder="$tr0ngPassword"
        />

        <Button mode="outlined" onPress={()=>this.props.navigation.navigate('home')} style={styles.button}>
          Login
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    padding: 8,
  },
  textInput: {
    margin: 8,
  },
  button: {
    height: 55,
    marginTop: 15,
    justifyContent: 'center',
  },
  title: {
    margin: 8,
  },
});

export default withTheme(AuthScreen);
