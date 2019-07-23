import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text, TextInput,
  Title,
  withTheme } from 'react-native-paper';
import type { Theme } from 'react-native-paper/types';

type Props = {
  theme: Theme,
};

class AuthScreen extends React.Component<Props> {
  render() {
    return (
      <View>
        <Title style={styles.title}>Login</Title>
        <Text style={styles.title}>
          Please enter your credentials
        </Text>
        <TextInput style={styles.textInput} placeholder="Email" underlineColorAndroid={"black"} />
        <TextInput style={styles.textInput} placeholder="Password" underlineColorAndroid={"black"} />
        <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('home')}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    margin: 8,
  },
  button: {
  },
  title: {
    margin: 8,
  },
});

export default withTheme(AuthScreen);
