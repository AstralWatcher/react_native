import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Button } from 'react-native';
import { Card, Icon, Input, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false,
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userInfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({ username: userinfo.username });
                    this.setState({ password: userinfo.password });
                    this.setState({ remember: true });
                }
            })
    }

    handleLogin() {
        if (this.state.remember) {
            SecureStore.setItemAsync(
                'userInfo',
                JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                })
            )
                .catch((error) => console.log('Could not save user to store ' + error));
        } else {
            SecureStore.deleteItemAsync('userInfo')
                .catch((error) => console.log('Could not delete item from store ' + error));
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Input placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({ username: username })}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                >
                </Input>
                <Input placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({ password: password })}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                >
                </Input>
                <CheckBox
                    title="Remember me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({ remember: !this.state.remember })}
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title="Login"
                        color="#512DA8"
                    />
                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 10
    },
    formInput: {
        margin: 10
    },
    formCheckbox: {
        margin: 10,
        backgroundColor: null
    },
    formButton: {
        margin: 10
    }
});

export default Login;