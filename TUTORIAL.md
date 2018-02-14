# React Native


## Initializing project with Create React Native App
Install `create-react-native-app` globally using npm or yarn, although as of now it's not recommended to use npm version 5, you should rather downgrade it to 4 or use yarn instead.
I will be using npm since that's what most of people use.
```
npm i -g create-react-native-app
```

Create basic project using `create-react-native-app`, I will name mine `TestApp`.
```
create-react-native-app TestApp
```

Go to the created directory.
```
cd TestApp
```

You could just start working on this project already. However, `create-react-native-app` creates only basic project structure that limits your ability to scale it up.
If you want to have standard react-native structure you can do it by ejecting `create-react-native-app`.
To find out more about ejecting from CRNA visit this link: https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md
During ejection process you will be asked 3 questions, in the first one just accept `React Native: I'd like a regular React Native project.`.
In the second, type the name for your app and in the last one, name of your project.
If you want you can later change these names in `app.json`.
```
npm run eject
```

Make sure you have Xcode/Android Studio installed and connected device or emulator, then you can run your app.
```
npm run android
```

If you encounter following error: `SDK location not found.`, you'll have to create file in main android directory `./android/`, named `local.properties`
and specify absolute path to your SDK e.g., `sdk.dir = /Users/username/Library/Android/sdk`.
Once you successfully run your application you can debug it using Chrome Developer Tools here http://localhost:8081/debugger-ui/

## Creating your first component
`App.js` is the starting point of your Application that you're bootstrapping in `index.js`.
As you can see it's just a regular React component, the only difference is that you're using predefined components from `react-native`

We'll start by creating folder to hold our components.
Please note that this will be very simple app, in real-life scenario you'd divide the folder structure differently.
```
mkdir components
cd components
```

Inside we'll create new file `HomeView.js` and create basic React component with the same name, nothing fancy for now.
I will extend `PureComponent` instead of `Component` if you want to learn more about them and why we should use them visit this link:
https://reactjs.org/docs/react-api.html#reactpurecomponent
```
import React, { PureComponent } from 'react';

class HomeView extends PureComponent {
    render() {
        return ();
    }
}

export default HomeView
```

Now we have to display something here, import `Text` component from `react-native` and use it to display text in return statement.
```
import React, { PureComponent } from 'react';
import { Text } from 'react-native';

class HomeView extends PureComponent {
    render() {
        return (
            <Text>
                Sample Text
            </Text>
        );
    }
}

export default HomeView
```

After that go back to `App.js`, import your component an display it inside `View` component.
Our component will take up whole screen so we can remove last few styles.
You can now rerun your app and you should see specified text displayed on your device/emulator.
```
import React from 'react';
import { StyleSheet, View } from 'react-native';
import HomeView from './components/HomeView';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <HomeView />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
```


## Styling

Component is working. However, we'd probably like to style it somehow.
First of all, import `View` from `react-native` and wrap it around your `Text` component.
You probably know what `Text` is for but you may be confused about `View` component,
basically speaking it's just a container, it doesn't have one specific purpose so you can use it same as you would use `div` tag in html.

To style individual components we'll import `StyleSheet` from `react-native` and use it's function `create` to create object holding our styles.
attributes and their values are usually the same as they'd be in css but written in camel case.
```
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#06f'
    },
    text: {
        paddingBottom: 14,
        color: '#fff',
        fontSize: 24,
    }
});
```

After we specify our styles we can assign them to components by using `style` prop.
```
return (
    <View style={styles.container} >
        <Text style={styles.text}>
            Sample Text
        </Text>
    </View>
);
```

App looks better but it's still far from perfect, it could use some fancy background gradient.
Unfortunately we can't create gradients like we'd do in css, we have to use specific component like `react-native-linear-gradient`.
After you've installed package you'll have to link the project using `react-native link`, otherwise react-native won't detect any changes.
```
npm install --save react-native-linear-gradient
react-native link
```

We'll have to import it and use as wrapper for our code, In this example we can just substitute `View` for it.
To specify colors for gradient you can pass an array with them to `colors` prop.
You can remove `backgroundColor` from styles as well, we won't need it anymore.
```
import React, { PureComponent } from 'react';
import { Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class HomeView extends PureComponent {
    render() {
        return (
            <LinearGradient colors={['#650aff', '#f4a']} style={styles.container} >
                <Text style={styles.text}>
                    Sample Text
                </Text>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        paddingBottom: 14,
        color: '#fff',
        fontSize: 24,
    }
});

export default HomeView
```

## Navigation

To create navigation we'll use `StackNavigator` from `react-navigation` (remember to install it before), it's a function that returns component with implemented navigation.
As the first argument we have to pass object with our routes, and the second is for options where we can specify our initialRoute.
We can implement it in a separate file and use as regular component in our `App.js`.
```
import React from 'react';
import { StackNavigator } from 'react-navigation';
import HomeView from './HomeView';

const Routing = StackNavigator({
    HOME: { screen: HomeView },
},
{
    initialRouteName: 'HOME',
});

export default Routing
```
```
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Routing from './components/Routing';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Routing />
            </View>
        );
    }
}
```

You can now see navigation bar on your application. It's no use now so we'll create second component and add it as a second route.
```
import React, { PureComponent } from 'react';
import { Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class SecondView extends PureComponent {
    render() {
        return (
            <LinearGradient colors={['#4ff', '#f4a']} style={styles.container} >
                <Text style={styles.text}>
                    Second view
                </Text>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        paddingBottom: 14,
        color: '#fff',
        fontSize: 24,
    }
});

export default SecondView
```
```
const Routing = StackNavigator({
        HOME: { screen: HomeView },
        SECOND: { screen: SecondView }
    },
    {
        initialRouteName: 'HOME',
    });
```

Now when we have routing we have to move between our screens somehow.
Each of our components added to navigation has function `navigate` under `props.navigation.navigate` which we can use to switch between our two views.
We'll create button in both components that will call mentioned function in onPress callback and navigate us to another route.
```
import React, { PureComponent } from 'react';
import { Text, StyleSheet, Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class HomeView extends PureComponent {
    switchPage = () => this.props.navigation.navigate('SECOND');

    render() {
        return (
            <LinearGradient colors={['#650aff', '#f4a']} style={styles.container} >
                <Text style={styles.text}>
                    Sample Text
                </Text>
                <Button onPress={this.switchPage} title={'Next screen'} />
            </LinearGradient>
        );
    }
}
```

As you can see we can not only move between views with our button but also wa can go back with arrow in the navigation bar or your phone's back button.
Each route change that we call with `navigate` function will add new view to the `stack` of all visited routes, that's why it's called `StackNavigator`.
If you want you can remove navigation bar by setting `headerMode` setting to `none`.
```
const Routing = StackNavigator({
        HOME: { screen: HomeView },
        SECOND: { screen: SecondView }
    },
    {
        initialRouteName: 'HOME',
        headerMode: 'none'
    });
```
There are more types of navigators like for example `NavigatorIOS`, you have to see for yourself and choose one that the best suits your application.
If you want to learn more about `react-navigation` visit https://reactnavigation.org/docs/getting-started.html

## Data binding
We can switch between routes but usually you'd want to exchange some information between them as well.
Fortunately `navigate` provides us the ability to specify object with props to be passed into our route,
but first we have to define that information. We'll ask the user to type his name into the input in `SecondView` and save it in our state, then we can pass that name to the initial component and display it to the user.

Let's start by defining our state with name variable and function to update it.
```
class SecondView extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
        }
    }

    switchPage = () => this.props.navigation.navigate('HOME');

    onChangeTextHandler = val => this.setState({name: val});

    render() {
        ...
```

Then substitute Text component with TextInput and add our handler to `onChangeText` callback.
We can also specify minimum width for the input.
```
class SecondView extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
        }
    }

    switchPage = () => this.props.navigation.navigate('HOME', { name: this.state.name });

    onChangeTextHandler = val => this.setState({name: val});

    render() {
        const { name } = this.state;

        return (
            <LinearGradient colors={['#4ff', '#f4a']} style={styles.container} >
                <TextInput
                    style={styles.input}
                    value={name}
                    placeholder={'Type your name'}
                    onChangeText={this.onChangeTextHandler}
                />
                <Button onPress={this.switchPage} title={'Next screen'} />
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        minWidth: 200,
        paddingBottom: 14,
        color: '#fff',
        fontSize: 24,
    }
});
```

It's a good moment to check if Input displays and works as expected.
If yes, we can pass object with our name as the second argument of `navigate` function.
```
render() {
    const { name } = this.state;

    return (
        <LinearGradient colors={['#4ff', '#f4a']} style={styles.container} >
            <TextInput
                style={styles.input}
                value={name}
                placeholder={'Type your name'}
                onChangeText={this.onChangeTextHandler}
            />
            <Button onPress={this.switchPage} title={'Next screen'} />
        </LinearGradient>
    );
}
```

Now we have to display name in `HomeView`, if no value is specified or it's length is 0 we'll provide default value.
```
render() {
    const { state } = this.props.navigation;
    const { params } = state;
    const name = (params && params.name.length > 0) ? params.name : 'Stranger';
    const message = `Hello ${name}!`;

    return (
        <LinearGradient colors={['#650aff', '#f4a']} style={styles.container} >
            <Text style={styles.text}>
                { message }
            </Text>
            <Button onPress={this.switchPage} title={'Next screen'} />
        </LinearGradient>
    );
}
```

## Summary
Those were the very basics of what is needed to start building your own React Native application, here are some links that will help you learn new features and will show you some good practices as well.
* https://facebook.github.io/react-native/
* https://reactjs.org/
* https://reactnavigation.org/docs/getting-
* http://www.reactnative.com/
