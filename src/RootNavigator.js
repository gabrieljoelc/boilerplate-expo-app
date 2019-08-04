/* @flow */

import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Appbar } from 'react-native-paper';
import ExampleList, { examples } from 'src/ExampleList';
import AuthScreen from 'src/AuthScreen';
import FirebaseLogin from "./FirebaseLogin";

const routes = Object.keys(examples)
  .map(id => ({ id, item: examples[id] }))
  .reduce((acc, { id, item }) => {
    const Comp = item;
    const Screen = props => <Comp {...props} />;

    Screen.navigationOptions = props => ({
      header: (
        <Appbar.Header>
          <Appbar.BackAction onPress={() => props.navigation.goBack()} />
          <Appbar.Content title={(Comp: any).title} />
        </Appbar.Header>
      ),
      /* $FlowFixMe */
      ...(typeof Comp.navigationOptions === 'function'
        ? Comp.navigationOptions(props)
        : Comp.navigationOptions),
    });

    return {
      ...acc,
      [id]: { screen: Screen },
    };
  }, {});


type Props = {
  theme: Theme,
};

class Login extends React.Component<Props> {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <FirebaseLogin login={user => console.warn(user)}/>
    );
  }
}

export default createStackNavigator(
  {
    login: Login,
    home: { screen: ExampleList },
    ...routes,
  },
  {
    initialRouteName: 'login',
  }
);
