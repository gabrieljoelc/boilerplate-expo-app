import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  Title,
  withTheme } from 'react-native-paper';
import type { Theme } from 'react-native-paper/types';
import Firebase from 'src/Firebase';

type Props = {
  theme: Theme,
};

type State = {
  email: string,
  password: string,
};

class AuthScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null
  }

  state = {
    email: '',
    password: '',
    isEmailCorrect: false,
    isPasswordCorrect: false,
    isLogin: false,
    loading: false,
  };

  constructor(props) {
    super(props);
    this.passTextInput = null;
  }

  onButtonPress() {
    this.setState({ error: '', loading: true })
    const email = this.state.email;
    const password = this.state.password;

    this.setState({
      isEmailCorrect: email === '',
      isPasswordCorrect: password === '',
    }, () => {
      if(email !== '' && password !== ''){
        this.loginToFireBase(email, password);
      } else {
        this.setState({ loading: false, error: 'Please enter your email and password' })
      }
    });
  };

  loginToFireBase(email, password) {
    this.setState({ isLogin: true });
    Firebase.userLogin(email, password)
      .then(user => {
        if(user)
        {
          this.props.success(user);
          console.info('logged in')
        }
        this.setState({ isLogin: false, loading: false });
      })
      .catch(error => {
        this.setState({ loading: false, error: 'Error occurred' })
      });
  };

  renderButton() {
    if (this.state.loading) {
      return (
        <View style={styles.spinnerStyle}>
          <ActivityIndicator size={"small"} />
        </View>
      )
    } else {
      return (
        <Button
          mode="outlined"
          onPress={this.onButtonPress.bind(this)}
          style={styles.button}
        >
          Log in
        </Button>
      )
    }
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
          autoCompleteType="email"
          keyboardType="email-address"
          label="Email"
          mode="outlined"
          placeholder="example@gmail.com"
          onChangeText={email => this.setState({ email })}
          onSubmitEditing={() => {this.passTextInput.focus()}}
          returnKeyType='next'
          style={styles.inputContainerStyle}
          value={this.state.email}
        />

        <TextInput
          autoCompleteType="password"
          label="Password"
          mode="outlined"
          placeholder="$tr0ngPassword"
          onChangeText={password => this.setState({ password })}
          secureTextEntry={true}
          ref={input => {this.passwordTextInput = input}}
          returnKeyType="next"
          style={styles.inputContainerStyle}
          value={this.state.password}
        />

        {this.renderButton()}

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>
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
  errorTextStyle: {
    alignSelf: 'center',
    color: 'red',
    fontSize: 16,
    marginTop: 8,
  },
  textInput: {
    margin: 8,
  },
  button: {
    height: 55,
    marginTop: 8,
    justifyContent: 'center',
  },
  title: {
    margin: 8,
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default withTheme(AuthScreen);
